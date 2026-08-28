import { SupabaseClient } from '@supabase/supabase-js';
export { SupabaseClient } from '@supabase/supabase-js';

declare function createSupabaseAdminClient(url: string, serviceKey: string): SupabaseClient;
/**
 * Deletes a Supabase auth user with retry + timeout.
 * Returns true on success or if the user was already deleted.
 * Returns false after all retries are exhausted.
 */
declare function deleteSupabaseUser(supabase: SupabaseClient, userId: string, log?: (msg: string, ctx?: Record<string, unknown>) => void): Promise<boolean>;

export { createSupabaseAdminClient, deleteSupabaseUser };
