import { describe, it, expect, vi } from 'vitest';
import { deleteSupabaseUser, type SupabaseClient } from '../src/services/supabase.js';
import { LIMITS_CONFIG } from '../src/shared/config/limits.config.js';

function mockClient(deleteUser: (userId: string) => Promise<{ error: unknown }>): SupabaseClient {
  return {
    auth: {
      admin: { deleteUser },
    },
  } as unknown as SupabaseClient;
}

describe('deleteSupabaseUser', () => {
  it('returns true on success and clears the timeout timer', async () => {
    vi.useFakeTimers();
    try {
      const client = mockClient(vi.fn().mockResolvedValue({ error: null }));
      await expect(deleteSupabaseUser(client, 'user-1')).resolves.toBe(true);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('treats already-deleted users as success and clears the timeout timer', async () => {
    vi.useFakeTimers();
    try {
      const client = mockClient(
        vi.fn().mockResolvedValue({ error: { message: 'User not found' } }),
      );
      await expect(deleteSupabaseUser(client, 'user-1')).resolves.toBe(true);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('retries transient failures up to the retry budget, then returns false', async () => {
    vi.useFakeTimers();
    try {
      const deleteUser = vi
        .fn()
        .mockResolvedValue({ error: { message: 'upstream down', status: 503 } });
      const client = mockClient(deleteUser);
      const pending = deleteSupabaseUser(client, 'user-1');
      await vi.advanceTimersByTimeAsync(2_000);
      await expect(pending).resolves.toBe(false);
      expect(deleteUser).toHaveBeenCalledTimes(3);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('times out an unresponsive delete and leaves no dangling timer', async () => {
    vi.useFakeTimers();
    try {
      const client = mockClient(() => new Promise<{ error: unknown }>(() => {}));
      const pending = deleteSupabaseUser(client, 'user-1');
      await vi.advanceTimersByTimeAsync(LIMITS_CONFIG.externalApiTimeoutMs + 1);
      await expect(pending).resolves.toBe(false);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('reports failures through the injected logger', async () => {
    const log = vi.fn();
    const client = mockClient(vi.fn().mockResolvedValue({ error: { message: 'boom' } }));
    await expect(deleteSupabaseUser(client, 'user-1', log)).resolves.toBe(false);
    expect(log).toHaveBeenCalledWith(
      '[SupabaseAuth] deleteUser failed after retries',
      expect.any(Object),
    );
  });
});