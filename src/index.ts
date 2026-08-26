/**
 * logistix-core-ts
 *
 * Single source of truth for enums, config, and utilities shared
 * across logistix-backend, logistix-workers, and logistix-web.
 *
 * Usage:
 *   import { UserRole, REGIONAL_CONFIG } from 'logistix-core-ts';
 *
 * For tree-shaking (web), import from subpaths:
 *   import { UserRole } from 'logistix-core-ts/shared';
 *   import { FcmService } from 'logistix-core-ts/services';
 */

// ─── Shared (re-export from subpath) ──────────────────────────────────────────
export * from './shared/index.js';

// ─── Shared payment allocation ───────────────────────────────────────────────
export {
  getTotalPaidForDeliveries,
  applyPaymentStatusUpdate,
  processPaymentAllocation,
} from './services/payments.js';
export type { PaymentAllocationTransaction, PaymentAllocationResult } from './services/payments.js';

// ─── Squad client ────────────────────────────────────────────────────────────
export { SquadClient, SquadRequestError } from './services/squad-client.js';

// ─── Services ────────────────────────────────────────────────────────────────
export { EmailService } from './services/email.service.js';
export { sendAlert, type AlertLevel } from './services/alert-service.js';
export {
  queueService,
  PermanentJobError,
  type QueueHandler,
  type DrizzleDB,
} from './services/queue.service.js';

// ─── Security ─────────────────────────────────────────────────────────────────
export { SECURITY_CONFIG } from './shared/config/security.config.js';

// ─── Sessions ─────────────────────────────────────────────────────────────────
export { SESSION_CONFIG } from './shared/config/session.config.js';

// ─── Encryption ───────────────────────────────────────────────────────────────
export { createEncryptor, type Encryptor } from './services/encryption.js';

// ─── FCM Push Notifications ───────────────────────────────────────────────────
export { FcmService, type FcmCredentials } from './services/fcm-sender.js';

// ─── Supabase ─────────────────────────────────────────────────────────────────
export { createSupabaseAdminClient, deleteSupabaseUser } from './services/supabase.js';

// ─── Drizzle ORM Schema ───────────────────────────────────────────────────────
export * from './drizzle/index.js';
