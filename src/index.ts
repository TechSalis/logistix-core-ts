/**
 * logistix-core-ts
 *
 * Single source of truth for enums, config, and utilities shared across
 * logistix-backend, logistix-workers, and logistix-web.
 *
 * Usage:
 *   import { UserRole, SYSTEM_CONFIG, localParse } from 'logistix-core-ts';
 */

// ─── Enums ────────────────────────────────────────────────────────────────────
export * from './enums.js';

// ─── Config ───────────────────────────────────────────────────────────────────
export { buildSystemConfig, SYSTEM_CONFIG } from './config.js';
export type { SystemConfig } from './config.js';

// ─── Delivery Parsing ────────────────────────────────────────────────────────
export { localParse } from './deliveryParser.js';
export type { ParsedDelivery } from './deliveryParser.js';

// ─── Utilities ────────────────────────────────────────────────────────────────
export { fetchWithTimeout } from './fetchWithTimeout.js';
export type { FetchWithTimeoutOptions } from './fetchWithTimeout.js';
