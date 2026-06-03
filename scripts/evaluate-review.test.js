import { describe, it, expect, vi, beforeEach } from 'vitest';
import { determineReviewState, parseMetadataBlock, evaluateFeedbackFallback, submitPRReview, sys } from './evaluate-review.js';

describe('parseMetadataBlock', () => {
  it('should parse metadata block correctly', () => {
    const botItems = [
      {
        body: `Some comments here...
[OPENCODE_VERDICT_METADATA]
Verdict: NEGATIVE
CriticalBugs: 3
SecurityIssues: 1`,
        user: 'github-actions[bot]'
      }
    ];
    const result = parseMetadataBlock(botItems);
    expect(result).toEqual({
      verdict: 'NEGATIVE',
      criticalBugs: 3,
      securityIssues: 1
    });
  });

  it('should return null if no metadata block exists', () => {
    const botItems = [
      { body: 'Just a simple comment', user: 'github-actions[bot]' }
    ];
    expect(parseMetadataBlock(botItems)).toBeNull();
  });
});

describe('evaluateFeedbackFallback', () => {
  it('should count tags correctly', () => {
    const botItems = [
      { body: 'Fix this [Critical Bug]', user: 'github-actions[bot]' },
      { body: 'Security leak here [Security] and here [Security]', user: 'github-actions[bot]' }
    ];
    const result = evaluateFeedbackFallback(botItems);
    expect(result).toEqual({
      verdict: 'NEGATIVE',
      criticalBugs: 1,
      securityIssues: 2
    });
  });
});

describe('determineReviewState', () => {
  it('should request changes for negative verdict, security issues, or >2 critical bugs', () => {
    expect(determineReviewState('NEGATIVE', 0, 0).targetState).toBe('REQUEST_CHANGES');
    expect(determineReviewState('POSITIVE', 0, 1).targetState).toBe('REQUEST_CHANGES');
    expect(determineReviewState('POSITIVE', 3, 0).targetState).toBe('REQUEST_CHANGES');
  });

  it('should approve for any verdict (even NEUTRAL) with 0 bugs and 0 security issues', () => {
    expect(determineReviewState('POSITIVE', 0, 0).targetState).toBe('APPROVE');
    expect(determineReviewState('NEUTRAL', 0, 0).targetState).toBe('APPROVE');
  });

  it('should comment when there are 1-2 critical bugs and 0 security issues (non-blocking)', () => {
    expect(determineReviewState('POSITIVE', 2, 0).targetState).toBe('COMMENT');
    expect(determineReviewState('NEUTRAL', 1, 0).targetState).toBe('COMMENT');
  });
});

describe('submitPRReview', () => {
  let execSyncSpy;

  beforeEach(() => {
    vi.restoreAllMocks();
    execSyncSpy = vi.spyOn(sys, 'execSync').mockImplementation(() => Buffer.from(''));
  });

  it('should successfully call execSync with approve flag', () => {
    submitPRReview('5', 'APPROVE', 'Looks good');
    expect(execSyncSpy).toHaveBeenCalledWith('gh pr review 5 --approve -b "Looks good"');
  });

  it('should fallback to comment if approve fails with a permission error', () => {
    // Mock execSync to fail on the first call (approve) and succeed on the second call (comment)
    execSyncSpy.mockImplementationOnce(() => {
      const err = new Error('Command failed: gh pr review 5 --approve');
      err.stderr = Buffer.from('GraphQL: GitHub Actions is not permitted to approve pull requests. (addPullRequestReview)');
      throw err;
    });

    submitPRReview('5', 'APPROVE', 'Looks good');

    expect(execSyncSpy).toHaveBeenCalledTimes(2);
    expect(execSyncSpy).toHaveBeenNthCalledWith(1, 'gh pr review 5 --approve -b "Looks good"');
    expect(execSyncSpy).toHaveBeenNthCalledWith(2, 'gh pr review 5 --comment -b "⚠️ [Bot fallback from APPROVE] Looks good"');
  });

  it('should rethrow error if approve fails with non-permission error', () => {
    execSyncSpy.mockImplementationOnce(() => {
      throw new Error('Some other random error');
    });

    expect(() => submitPRReview('5', 'APPROVE', 'Looks good')).toThrow('Some other random error');
    expect(execSyncSpy).toHaveBeenCalledTimes(1);
  });
});
