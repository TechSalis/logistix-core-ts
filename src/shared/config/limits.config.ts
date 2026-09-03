import { SubscriptionTier } from '../enums/enums.js';
import { DATA_RETENTION } from './billing.config.js';

export interface TierLimits {
  readonly maxAIDeliveriesPerAction: number;
  readonly maxBulkDeliveries: number;
  readonly maxTrackingHistory: number;
  readonly retentionMonths: number;

  // Account & usage limits
  readonly maxDispatchers: number;
  readonly maxRiders: number;
  readonly maxDeliveriesPerMonth: number;
  readonly maxExportsPerDay: number;
  readonly maxExportsPerMonth: number;
}

export interface LimitsConfig {
  readonly maxBatchSize: number;
  readonly dbBatchSize: number;
  readonly userActionConcurrency: number;
  readonly externalApiConcurrency: number;
  readonly maxQueryLimit: number; // Fallback for non-tier-aware services
  readonly syncPageSize: number; // Client sync page size served via remoteConfig
  readonly locationDeduplicationRadiusMeters: number;
  readonly externalApiTimeoutMs: number;
  readonly maxRiderActiveDeliveries: number;
  readonly maxSearchQueryLength: number;
  readonly chunkSize: number;
}

/**
 * Default max length for a single chat message body (characters).
 * SSOT for AI message limits AND client chat-composer maxlength mirrors.
 */
export const DEFAULT_MESSAGE_LIMIT = 4096;

const rawLimitsConfig = {
  maxBatchSize: 50, // Max actions executed per agent turn (system protection)
  dbBatchSize: 100, // Max rows per DB bulk operation for background/flush jobs (executeInBatches)
  userActionConcurrency: 10, // Chunk size for user-flow operations (chunkedPromiseAll) to avoid spiking DB connections
  externalApiConcurrency: 10, // Capped concurrency for external APIs like Google Maps to avoid rate limits
  maxQueryLimit: 100, // Fallback query limit for non-tier-aware services
  syncPageSize: 100, // Client sync page size served via remoteConfig
  locationDeduplicationRadiusMeters: 100, // Drop duplicate location results within this range
  externalApiTimeoutMs: 10000, // Default timeout for external requests (e.g. Maps API)
  maxRiderActiveDeliveries: 5,
  maxSearchQueryLength: 100,
  chunkSize: 100,
} as const;

export const LIMITS_CONFIG: LimitsConfig = rawLimitsConfig;

/**
 * Pagination defaults. Centralised here alongside LIMITS_CONFIG — both are
 * query-size constants consumed by every service that pages results.
 */
export const PAGINATION_CONFIG = {
  /** Default page size for regular API / GraphQL queries. */
  DEFAULT_LIMIT: 20,
  /** Admin-specific page size (admins typically need larger result sets). */
  ADMIN_DEFAULT_LIMIT: 50,
} as const;

/**
 * Tier-based limits - ALL operational limits are tier-aware
 * These limits control the entire flow from drafting to synthesis
 */
export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  [SubscriptionTier.STARTER]: {
    maxAIDeliveriesPerAction: 20,
    maxBulkDeliveries: 20,
    maxTrackingHistory: 50,
    retentionMonths: DATA_RETENTION[SubscriptionTier.STARTER],
    maxDispatchers: 2,
    maxRiders: 20,
    maxDeliveriesPerMonth: 500,
    maxExportsPerDay: 2,
    maxExportsPerMonth: 10,
  },
  [SubscriptionTier.PROFESSIONAL]: {
    maxAIDeliveriesPerAction: 50,
    maxBulkDeliveries: 100,
    maxTrackingHistory: 100,
    retentionMonths: DATA_RETENTION[SubscriptionTier.PROFESSIONAL],
    maxDispatchers: 10,
    maxRiders: 100,
    maxDeliveriesPerMonth: 5000,
    maxExportsPerDay: 5,
    maxExportsPerMonth: 30,
  },
};

export function getTierLimits(tier: SubscriptionTier): TierLimits {
  const limits = TIER_LIMITS[tier];
  if (limits === undefined) throw new Error(`[Limits] Unknown subscription tier: ${tier}`);
  return limits;
}
