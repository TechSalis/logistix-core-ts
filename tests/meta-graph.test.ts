import { describe, it, expect } from 'vitest';
import { computeExpiresAt, parseGraphError } from '../src/utils/meta-graph.js';

describe('computeExpiresAt', () => {
  it('adds the expiry delta to the current time', () => {
    const now = Date.now();
    const result = computeExpiresAt(3600);
    expect(result).toBeGreaterThanOrEqual(now + 3600 * 1000);
    expect(result).toBeLessThan(now + 3700 * 1000);
  });
});

describe('parseGraphError', () => {
  it('formats a standard Meta error object', () => {
    expect(
      parseGraphError({ error: { type: 'OAuthException', code: 36008, message: 'bad' } }),
    ).toBe('OAuthException: 36008: bad');
  });

  it('returns a generic message when the body is not a Meta error shape', () => {
    expect(parseGraphError({})).toBe('Meta Graph API error');
    expect(parseGraphError('nope')).toBe('Meta Graph API error');
    expect(parseGraphError(null)).toBe('Meta Graph API error');
  });

  it('omits missing error parts', () => {
    expect(parseGraphError({ error: { message: 'only message' } })).toBe('only message');
    expect(parseGraphError({ error: {} })).toBe('Meta Graph API error');
  });
});
