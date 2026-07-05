import { SubscriptionTier } from './enums.js';

/** Default retention period for local data (in days). */
export const OFFLINE_RETENTION_DAYS = 60;

/** Local database name used by both Flutter (Drift) and Web (IndexedDB). */
export const OFFLINE_DB_NAME = 'logistix_offline';

/** Key used in localStorage / SecureStorage for the offline profile. */
export const OFFLINE_PROFILE_KEY = 'logistix_offline_profile';

/** Tabs available in offline dispatcher mode. */
export enum OfflineTab {
  DELIVERIES = 'DELIVERIES',
  MORE = 'MORE',
}

/** Maximum deliveries stored locally in offline mode.
 * Offline mode is client-side only; limits are not tier-based. */
export const OFFLINE_MAX_DELIVERIES = 100;

/** Supported export formats in offline mode. */
export type OfflineExportFormat = 'csv';

export interface OfflineProfile {
  /** Unique local device ID (generated on first launch). */
  readonly deviceId: string;
  /** Display name the user chose for offline mode. */
  readonly displayName: string;
  /** ISO timestamp of when offline mode was first activated. */
  readonly createdAt: string;
  /** ISO timestamp of last app use. */
  readonly lastActiveAt: string;
  /** Backend subscription tier after upgrade (undefined until they subscribe). */
  readonly tier?: SubscriptionTier;
  /** Total deliveries created locally. */
  readonly totalDeliveries: number;
  /** Whether this device has been linked to a server account. */
  readonly wasSynced: boolean;
  /** If wasSynced, the server company ID it was linked to. */
  readonly linkedCompanyId?: string;
}

export function createOfflineProfile(displayName: string): OfflineProfile {
  const now = new Date().toISOString();
  return {
    deviceId: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    displayName,
    createdAt: now,
    lastActiveAt: now,
    totalDeliveries: 0,
    wasSynced: false,
  };
}
