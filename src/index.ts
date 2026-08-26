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

// ─── Services (re-export from subpath) ────────────────────────────────────────
export * from './services/index.js';
