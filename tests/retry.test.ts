import { describe, it, expect, vi } from 'vitest';
import {
  withRetry,
  isTransientHttpError,
  RETRYABLE_NETWORK_ERROR_CODES,
  sleep,
} from '../src/utils/retry.js';

describe('sleep', () => {
  it('resolves after the specified milliseconds', async () => {
    vi.useFakeTimers();
    try {
      const promise = sleep(1000);
      vi.advanceTimersByTime(1000);
      await expect(promise).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });

  it('handles 0ms', async () => {
    vi.useFakeTimers();
    try {
      const promise = sleep(0);
      vi.advanceTimersByTime(0);
      await expect(promise).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
  });
});

describe('withRetry', () => {
  it('returns the result on first success', async () => {
    const fn = vi.fn().mockResolvedValue('ok');
    await expect(withRetry(fn)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes the attempt number to fn', async () => {
    const fn = vi.fn(async (attempt: number) => attempt);
    const result = await withRetry(fn, { maxRetries: 1 });
    expect(result).toBe(1);
  });

  it('retries on transient 5xx errors and succeeds', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(Object.assign(new Error('Server exploded'), { status: 503 }))
      .mockResolvedValueOnce('recovered');
    await expect(withRetry(fn, { maxRetries: 2 })).resolves.toBe('recovered');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('does not retry 4xx client errors', async () => {
    const fn = vi.fn().mockRejectedValue(Object.assign(new Error('Bad request'), { status: 400 }));
    await expect(withRetry(fn)).rejects.toThrow('Bad request');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries on network/timeout error codes', async () => {
    const fn = vi
      .fn()
      .mockRejectedValueOnce(
        Object.assign(new Error('connect ECONNREFUSED'), { code: 'ECONNREFUSED' }),
      )
      .mockResolvedValueOnce('ok');
    await expect(withRetry(fn, { maxRetries: 2 })).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('retries everything when isRetryable returns true', async () => {
    const fn = vi.fn().mockRejectedValueOnce(new Error('any error')).mockResolvedValueOnce('ok');
    await expect(withRetry(fn, { maxRetries: 2, isRetryable: () => true })).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('throws the last error after exhausting retries', async () => {
    const fn = vi.fn().mockRejectedValue(Object.assign(new Error('Still down'), { status: 500 }));
    await expect(withRetry(fn, { maxRetries: 3 })).rejects.toThrow('Still down');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it('invokes onRetry with attempt info before each retry', async () => {
    const onRetry = vi.fn();
    const fn = vi
      .fn()
      .mockRejectedValueOnce(Object.assign(new Error('flaky'), { status: 500 }))
      .mockResolvedValueOnce('ok');
    await withRetry(fn, { maxRetries: 2, onRetry });
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry.mock.calls[0][0].attempt).toBe(1);
    expect(onRetry.mock.calls[0][0].maxRetries).toBe(2);
    expect(onRetry.mock.calls[0][0].delayMs).toBeGreaterThanOrEqual(200);
  });

  it('defaults to 2 max attempts', async () => {
    const fn = vi.fn().mockRejectedValue(Object.assign(new Error('down'), { status: 500 }));
    await expect(withRetry(fn)).rejects.toThrow('down');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('isTransientHttpError', () => {
  it('classifies 5xx and 429 as transient', () => {
    expect(isTransientHttpError(Object.assign(new Error('e'), { status: 500 }))).toBe(true);
    expect(isTransientHttpError(Object.assign(new Error('e'), { status: 429 }))).toBe(true);
    expect(isTransientHttpError(Object.assign(new Error('e'), { response: { status: 503 } }))).toBe(
      true,
    );
  });

  it('classifies 4xx as non-transient', () => {
    expect(isTransientHttpError(Object.assign(new Error('e'), { status: 400 }))).toBe(false);
    expect(isTransientHttpError(Object.assign(new Error('e'), { status: 404 }))).toBe(false);
  });

  it('classifies network error messages as transient', () => {
    expect(isTransientHttpError(new Error('socket hang up: ETIMEDOUT'))).toBe(true);
    expect(isTransientHttpError(Object.assign(new Error('x'), { code: 'ECONNRESET' }))).toBe(true);
    expect(isTransientHttpError(new Error('getaddrinfo EAI_AGAIN host'))).toBe(true);
  });

  it('classifies every RETRYABLE_NETWORK_ERROR_CODE as transient', () => {
    for (const code of RETRYABLE_NETWORK_ERROR_CODES) {
      expect(isTransientHttpError(Object.assign(new Error(code), { code }))).toBe(true);
    }
  });

  it('classifies axios and fetch timeouts as transient', () => {
    expect(isTransientHttpError(Object.assign(new Error('x'), { code: 'ECONNABORTED' }))).toBe(
      true,
    );
    expect(isTransientHttpError(new Error('timeout of 10000ms exceeded'))).toBe(true);
    expect(isTransientHttpError(new Error('connect ECONNABORTED 1.2.3.4:443'))).toBe(true);
    expect(
      isTransientHttpError(Object.assign(new Error('x'), { code: 'UND_ERR_CONNECT_TIMEOUT' })),
    ).toBe(true);
  });

  it('returns false for plain errors', () => {
    expect(isTransientHttpError(new Error('plain'))).toBe(false);
    expect(isTransientHttpError('not an error')).toBe(false);
  });

  it('classifies a fetch failure via cause code', () => {
    const err = Object.assign(new TypeError('fetch failed'), {
      cause: Object.assign(new Error('connect ECONNRESET 1.2.3.4:443'), { code: 'ECONNRESET' }),
    });
    expect(isTransientHttpError(err)).toBe(true);
  });

  it('classifies a fetch failure via cause message', () => {
    const err = Object.assign(new TypeError('fetch failed'), {
      cause: new Error('getaddrinfo EAI_AGAIN host'),
    });
    expect(isTransientHttpError(err)).toBe(true);
  });

  it('classifies a fetch failure via cause status', () => {
    const err = Object.assign(new TypeError('fetch failed'), {
      cause: Object.assign(new Error('upstream exploded'), { status: 503 }),
    });
    expect(isTransientHttpError(err)).toBe(true);
  });

  it('classifies a fetch failure via cause response.status (429)', () => {
    const err = Object.assign(new TypeError('fetch failed'), {
      cause: Object.assign(new Error('rate limited'), { response: { status: 429 } }),
    });
    expect(isTransientHttpError(err)).toBe(true);
  });

  it('recurses through deep cause chains', () => {
    const err = Object.assign(new TypeError('fetch failed'), {
      cause: Object.assign(new Error('wrapped'), {
        cause: Object.assign(new Error('connect ETIMEDOUT'), { code: 'ETIMEDOUT' }),
      }),
    });
    expect(isTransientHttpError(err)).toBe(true);
  });

  it('does not classify a non-transient cause as transient', () => {
    const err = Object.assign(new TypeError('fetch failed'), {
      cause: Object.assign(new Error('bad thing'), { code: 'ERR_FOO' }),
    });
    expect(isTransientHttpError(err)).toBe(false);
  });

  it('does not classify a cause-only transient when the top-level message is transient-free', () => {
    const err = Object.assign(new Error('a plain message'), {
      cause: Object.assign(new Error('still fine'), { code: 'ERR_FOO' }),
    });
    expect(isTransientHttpError(err)).toBe(false);
  });

  it('terminates on cyclic cause chains', () => {
    const a = new Error('a');
    const b = new Error('b');
    Object.assign(a, { cause: b });
    Object.assign(b, { cause: a });
    expect(isTransientHttpError(a)).toBe(false);
  });
});
