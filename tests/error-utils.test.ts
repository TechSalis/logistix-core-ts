import { describe, it, expect } from 'vitest';
import { extractErrorMessage, extractErrorContext } from '../src/shared/utils/error-utils.js';

describe('extractErrorMessage', () => {
  it('extracts message from Error', () => {
    expect(extractErrorMessage(new Error('something failed'))).toBe('something failed');
  });

  it('includes cause chain', () => {
    const inner = new Error('db timeout');
    const middle = new Error('query failed', { cause: inner });
    const outer = new Error('request failed', { cause: middle });
    expect(extractErrorMessage(outer)).toBe(
      'request failed | cause: query failed | cause: db timeout',
    );
  });

  it('stops cause chain at depth 3', () => {
    const e1 = new Error('level 1');
    const e2 = new Error('level 2', { cause: e1 });
    const e3 = new Error('level 3', { cause: e2 });
    const e4 = new Error('level 4', { cause: e3 });
    expect(extractErrorMessage(e4)).toBe(
      'level 4 | cause: level 3 | cause: level 2 | cause: level 1',
    );
  });

  it('handles string errors', () => {
    expect(extractErrorMessage('just a string')).toBe('just a string');
  });

  it('handles number errors', () => {
    const result = extractErrorMessage(42);
    expect(result).toBe('42');
  });

  it('handles object errors', () => {
    const result = extractErrorMessage({ foo: 'bar' });
    expect(result).toBe('[object Object]');
  });

  it('handles null', () => {
    expect(extractErrorMessage(null)).toBe('null');
  });

  it('handles undefined', () => {
    expect(extractErrorMessage(undefined)).toBe('undefined');
  });

  it('handles Error with non-Error cause', () => {
    const err = new Error('failed');
    (err as { cause?: unknown }).cause = 'string cause';
    expect(extractErrorMessage(err)).toBe('failed');
  });
});

describe('extractErrorContext', () => {
  it('returns error message and stack for Error', () => {
    const err = new Error('test error');
    const ctx = extractErrorContext(err);
    expect(ctx.error).toBe('test error');
    expect(ctx.stack).toBeDefined();
    expect(typeof ctx.stack).toBe('string');
  });

  it('returns error message and no stack for string', () => {
    const ctx = extractErrorContext('string error');
    expect(ctx.error).toBe('string error');
    expect(ctx.stack).toBeUndefined();
  });

  it('returns error message and no stack for unknown', () => {
    const ctx = extractErrorContext(123);
    expect(ctx.error).toBe('123');
    expect(ctx.stack).toBeUndefined();
  });
});
