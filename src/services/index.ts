/**
 * Server-only services — requires Node.js runtime and server dependencies.
 *
 * Usage:
 *   import { FcmService, EmailService } from 'logistix-core-ts/services';
 *
 * NOTE: Supabase is intentionally NOT re-exported here. It statically imports
 * `@supabase/supabase-js`, which would drag that dependency into every barrel
 * consumer's bundle (including web). Import it from the dedicated subpath:
 *   import { deleteSupabaseUser } from 'logistix-core-ts/services/supabase';
 */

export * from './drizzle/index.js';
export * from './alerts.js';
export * from './email.js';
export * from './encryption.js';
export * from './fcm.js';
export * from './payments.js';
export * from './queue.js';
export * from './squad.js';
