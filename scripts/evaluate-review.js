const { execSync } = require('child_process');

/**
 * Validates and retrieves required environment variables.
 * @returns {{ prNumber: string, repo: string }}
 */
function getEnvConfig() {
  const prNumber = process.env.PR_NUMBER;
  const repo = process.env.GITHUB_REPOSITORY;

  if (!prNumber || !repo) {
    throw new Error("Missing PR_NUMBER or GITHUB_REPOSITORY environment variables.");
  }

  return { prNumber, repo };
}

/**
 * Executes a GitHub CLI API command and parses the JSON response.
 * @param {string} endpoint 
 * @returns {any}
 */
function fetchGithubApi(endpoint) {
  try {
    const output = execSync(`gh api ${endpoint}`).toString();
    return JSON.parse(output);
  } catch (error) {
    throw new Error(`Failed to fetch GitHub API endpoint '${endpoint}': ${error.message}`);
  }
}

/**
 * Retrieves and combines all comments & reviews left by the OpenCode / GitHub Actions bot.
 * Sorted newest first.
 * @param {string} repo 
 * @param {string} prNumber 
 * @returns {Array<{ body: string, created_at: string, user: string }>}
 */
function fetchBotFeedback(repo, prNumber) {
  console.log(`Fetching comments and reviews for PR #${prNumber} in ${repo}...`);

  const issueComments = fetchGithubApi(`repos/${repo}/issues/${prNumber}/comments`);
  const reviewComments = fetchGithubApi(`repos/${repo}/pulls/${prNumber}/comments`);
  const reviews = fetchGithubApi(`repos/${repo}/pulls/${prNumber}/reviews`);

  const allItems = [
    ...issueComments.map(c => ({ body: c.body, created_at: c.created_at, user: c.user.login })),
    ...reviewComments.map(c => ({ body: c.body, created_at: c.created_at, user: c.user.login })),
    ...reviews.map(r => ({ body: r.body, created_at: r.submitted_at, user: r.user.login }))
  ];

  return allItems
    .filter(item => {
      const login = item.user.toLowerCase();
      return login === 'github-actions[bot]' || login.includes('opencode');
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

/**
 * Attempts to parse the latest verdict metadata block from bot feedback.
 * @param {Array<object>} botItems 
 * @returns {{ verdict: string, criticalBugs: number, securityIssues: number } | null}
 */
function parseMetadataBlock(botItems) {
  const metadataRegex = /\[OPENCODE_VERDICT_METADATA\][\s\S]*?Verdict:\s*(\w+)[\s\S]*?CriticalBugs:\s*(\d+)[\s\S]*?SecurityIssues:\s*(\d+)/;

  for (const item of botItems) {
    if (!item.body) continue;
    const match = item.body.match(metadataRegex);
    if (match) {
      return {
        verdict: match[1].toUpperCase(),
        criticalBugs: parseInt(match[2], 10),
        securityIssues: parseInt(match[3], 10)
      };
    }
  }

  return null;
}

/**
 * Counts occurrences of bug and security tags in bot items as a fallback.
 * @param {Array<object>} botItems 
 * @returns {{ verdict: string, criticalBugs: number, securityIssues: number }}
 */
function evaluateFeedbackFallback(botItems) {
  console.log("No explicit metadata block found. Falling back to tag counting...");

  let criticalBugs = 0;
  let securityIssues = 0;

  for (const item of botItems) {
    if (!item.body) continue;
    const bugMatches = item.body.match(/\[Critical Bug\]/gi);
    if (bugMatches) criticalBugs += bugMatches.length;

    const secMatches = item.body.match(/\[Security\]/gi);
    if (secMatches) securityIssues += secMatches.length;
  }

  const verdict = (criticalBugs > 0 || securityIssues > 0) ? 'NEGATIVE' : 'POSITIVE';
  return { verdict, criticalBugs, securityIssues };
}

/**
 * Evaluates the parsed/counted issues to decide the final review state.
 * @param {string} verdict 
 * @param {number} criticalBugs 
 * @param {number} securityIssues 
 * @returns {{ targetState: 'REQUEST_CHANGES' | 'APPROVE' | 'COMMENT', message: string }}
 */
function determineReviewState(verdict, criticalBugs, securityIssues) {
  // Gate criteria:
  // - NEGATIVE review OR any security issues OR > 2 critical bugs -> REQUEST_CHANGES
  // - Clean review (POSITIVE/APPROVED, 0 bugs, 0 security issues) -> APPROVE
  // - Otherwise -> COMMENT
  if (verdict === 'NEGATIVE' || securityIssues > 0 || criticalBugs > 2) {
    return {
      targetState: 'REQUEST_CHANGES',
      message: `❌ OpenCode Review: Changes Requested. Found ${securityIssues} security issue(s) and ${criticalBugs} critical bug(s). Please review and address these issues.`
    };
  }

  if ((verdict === 'POSITIVE' || verdict === 'APPROVED') && criticalBugs === 0 && securityIssues === 0) {
    return {
      targetState: 'APPROVE',
      message: `✅ OpenCode Review: Approved! No critical bugs or security issues found. Everything looks good!`
    };
  }

  return {
    targetState: 'COMMENT',
    message: `💬 OpenCode Review: Comments left. Minor feedback or optimization suggestions provided (Critical Bugs: ${criticalBugs}).`
  };
}

/**
 * Submits the PR review with the specified state and message using the GitHub CLI.
 * @param {string} prNumber 
 * @param {string} state 
 * @param {string} message 
 */
function submitPRReview(prNumber, state, message) {
  const flags = {
    'REQUEST_CHANGES': '--request-changes',
    'APPROVE': '--approve',
    'COMMENT': '--comment'
  };

  const stateFlag = flags[state] || '--comment';
  // Escape message for double quotes
  const escapedMessage = message.replace(/"/g, '\\"');
  
  const ghCommand = `gh pr review ${prNumber} ${stateFlag} -b "${escapedMessage}"`;
  
  console.log(`Submitting review state (${state}): ${ghCommand}`);
  execSync(ghCommand);
}

/**
 * Main orchestration entrypoint.
 */
function main() {
  try {
    const { prNumber, repo } = getEnvConfig();
    const botItems = fetchBotFeedback(repo, prNumber);

    console.log(`Found ${botItems.length} comments/reviews from the bot.`);
    if (botItems.length === 0) {
      console.log("No feedback from bot found. Exiting review evaluation.");
      return;
    }

    // Try parsing metadata, fall back to keyword counting
    const results = parseMetadataBlock(botItems) || evaluateFeedbackFallback(botItems);
    console.log(`Evaluation metrics: Verdict=${results.verdict}, CriticalBugs=${results.criticalBugs}, SecurityIssues=${results.securityIssues}`);

    const { targetState, message } = determineReviewState(results.verdict, results.criticalBugs, results.securityIssues);
    console.log(`Determined review action: targetState=${targetState}`);

    submitPRReview(prNumber, targetState, message);
    console.log("Successfully submitted PR review status!");

  } catch (error) {
    console.error("Execution failed:", error.message);
    if (error.stdout) console.error("stdout:", error.stdout.toString());
    if (error.stderr) console.error("stderr:", error.stderr.toString());
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  getEnvConfig,
  fetchGithubApi,
  fetchBotFeedback,
  parseMetadataBlock,
  evaluateFeedbackFallback,
  determineReviewState,
  submitPRReview,
  main
};
