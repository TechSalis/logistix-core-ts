import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { withRetry } from '../shared/utils/retry.js';
import { extractErrorContext } from '../shared/utils/error-utils.js';
import { LIMITS_CONFIG } from '../shared/config/limits.config.js';

/**
 * Single `SupabaseClient` type identity for cross-repo consumers (see
 * `services/drizzle/orm.ts` for the same rationale for drizzle-orm). Because two
 * independently-installed `@supabase/supabase-js` copies of the SAME version are
 * structurally incompatible (private members), consumers that pass a supabase
 * client across the core-ts boundary MUST import this type from here rather than
 * from their own bare `@supabase/supabase-js`.
 */
export type { SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_AUTH_RETRIES = 3;

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
              LIMITS_CONFIG.externalApiTimeoutMs,
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
