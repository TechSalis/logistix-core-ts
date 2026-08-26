import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('fetchWithTimeout', () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves with response when fetch succeeds within timeout', async () => {
    const { fetchWithTimeout } = await import('../src/shared/utils/fetch-with-timeout.js');
    const mockResponse = { ok: true, status: 200 } as Response;
    mockFetch.mockResolvedValue(mockResponse);

    const result = await fetchWithTimeout('https://example.com', {
      fetch: mockFetch,
      timeoutMs: 5000,
    });
    expect(result).toBe(mockResponse);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://example.com',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it('throws on timeout', async () => {
    const { fetchWithTimeout } = await import('../src/shared/utils/fetch-with-timeout.js');
    mockFetch.mockImplementation((_url: string, options: RequestInit) => {
      return new Promise((_resolve, reject) => {
        (options.signal as AbortSignal).addEventListener('abort', () => {
          reject(new DOMException('The operation was aborted', 'AbortError'));
        });
      });
    });

    const promise = fetchWithTimeout('https://example.com', { fetch: mockFetch, timeoutMs: 50 });
    await expect(promise).rejects.toThrow('The operation was aborted');
  }, 10000);

  it('has DEFAULT_TIMEOUT_MS of 20000', async () => {
    const { DEFAULT_TIMEOUT_MS } = await import('../src/shared/utils/fetch-with-timeout.js');
    expect(DEFAULT_TIMEOUT_MS).toBe(20_000);
  });

  it('re-throws fetch errors', async () => {
    const { fetchWithTimeout } = await import('../src/shared/utils/fetch-with-timeout.js');
    mockFetch.mockRejectedValue(new Error('Network error'));

    await expect(fetchWithTimeout('https://example.com', { fetch: mockFetch })).rejects.toThrow(
      'Network error',
    );
  });
});
