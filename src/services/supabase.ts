import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { withRetry } from '../utils/retry.js';
import { extractErrorContext } from '../utils/error-utils.js';

const SUPABASE_AUTH_RETRIES = 3;
const SUPABASE_AUTH_TIMEOUT_MS = 10_000;

export function createSupabaseAdminClient(url: string, serviceKey: string): SupabaseClient {
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/**
 * Deletes a Supabase auth user with retry + timeout.
 * Returns true on success or if the user was already deleted.
 * Returns false after all retries are exhausted.
 */
export async function deleteSupabaseUser(
  supabase: SupabaseClient,
  userId: string,
  log?: (msg: string, ctx?: Record<string, unknown>) => void,
): Promise<boolean> {
  try {
    await withRetry(
      async () => {
        const result = await Promise.race([
          supabase.auth.admin.deleteUser(userId),
          new Promise<never>((_, reject) =>
            setTimeout(
              () => reject(new Error('Supabase auth deleteUser timeout')),
              SUPABASE_AUTH_TIMEOUT_MS,
            ),
          ),
        ]);
        if (!result.error) return;
        const msg = result.error.message?.toLowerCase() ?? '';
        if (msg.includes('not found') || msg.includes("doesn't exist")) return;
        throw new Error(`Supabase auth error: ${result.error.message}`);
      },
      { maxRetries: SUPABASE_AUTH_RETRIES },
    );
    return true;
  } catch (error) {
    log?.('[SupabaseAuth] deleteUser failed after retries', {
      userId,
      ...extractErrorContext(error),
    });
    return false;
  }
}
