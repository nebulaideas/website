import { describe, it, expect } from 'vitest';
import { determineReviewState, parseMetadataBlock, evaluateFeedbackFallback } from './evaluate-review.js';

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

  it('should approve for positive verdict with 0 bugs and 0 security issues', () => {
    const result = determineReviewState('POSITIVE', 0, 0);
    expect(result.targetState).toBe('APPROVE');
  });

  it('should comment for positive/neutral verdict with 1-2 critical bugs and 0 security issues', () => {
    const result = determineReviewState('POSITIVE', 2, 0);
    expect(result.targetState).toBe('COMMENT');
  });
});
