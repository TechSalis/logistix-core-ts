import { z } from 'zod';
import { SubscriptionTier } from '../enums/enums.js';
import { DATA_RETENTION } from './billing.config.js';

export interface TierLimits {
  readonly maxAIDeliveriesPerAction: number;
  readonly maxBulkDeliveries: number;
  readonly maxTrackingHistory: number;
  readonly maxDrafts: number;
  readonly retentionMonths: number;

  // Account & usage limits
  readonly maxDispatchers: number;
  readonly maxRiders: number;
  readonly maxDeliveriesPerMonth: number;
  readonly maxActiveDeliveries: number;
  readonly maxExportsPerDay: number;
  readonly maxExportsPerMonth: number;
}

export interface LimitsConfig {
  readonly maxBatchSize: number;
  readonly dbBatchSize: number;
  readonly userActionConcurrency: number;
  readonly externalApiConcurrency: number;
  readonly maxQueryLimit: number; // Fallback for non-tier-aware services
  readonly locationDeduplicationRadiusMeters: number;
  readonly externalApiTimeoutMs: number;
  readonly maxRiderActiveDeliveries: number;
  readonly maxSearchQueryLength: number;
}

/**
 * Default max length for a single chat message body (characters).
 * SSOT for AI message limits AND client chat-composer maxlength mirrors.
 */
export const DEFAULT_MESSAGE_LIMIT = 4096;

const limitsConfigSchema = z.object({
  maxBatchSize: z.number(),
  dbBatchSize: z.number(),
  userActionConcurrency: z.number(),
  externalApiConcurrency: z.number(),
  maxQueryLimit: z.number(),
  locationDeduplicationRadiusMeters: z.number(),
  externalApiTimeoutMs: z.number(),
  maxRiderActiveDeliveries: z.number(),
  maxSearchQueryLength: z.number(),
});

const rawLimitsConfig = {
  maxBatchSize: 50, // Max actions executed per agent turn (system protection)
  dbBatchSize: 100, // Max rows per DB bulk operation for background/flush jobs (executeInBatches)
  userActionConcurrency: 10, // Chunk size for user-flow operations (chunkedPromiseAll) to avoid spiking DB connections
  externalApiConcurrency: 5, // Capped concurrency for external APIs like Google Maps to avoid rate limits
  maxQueryLimit: 100, // Fallback query limit for non-tier-aware services
  locationDeduplicationRadiusMeters: 200, // Drop duplicate location results within this range
  externalApiTimeoutMs: 10000, // Default timeout for external requests (e.g. Maps API)
  maxRiderActiveDeliveries: 5,
  maxSearchQueryLength: 100,
} as const;

// Runtime validation guard — keeps config in sync with schema
export const LIMITS_CONFIG: LimitsConfig = limitsConfigSchema.parse(rawLimitsConfig);

/**
 * Tier-based limits - ALL operational limits are tier-aware
 * These limits control the entire flow from drafting to synthesis
 */
export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  [SubscriptionTier.STARTER]: {
    maxAIDeliveriesPerAction: 20,
    maxBulkDeliveries: 20,
    maxTrackingHistory: 50,
    maxDrafts: 30,
    retentionMonths: DATA_RETENTION[SubscriptionTier.STARTER],
    maxDispatchers: 2,
    maxRiders: 20,
    maxDeliveriesPerMonth: 500,
    maxActiveDeliveries: 20,
    maxExportsPerDay: 2,
    maxExportsPerMonth: 5,
  },
  [SubscriptionTier.PROFESSIONAL]: {
    maxAIDeliveriesPerAction: 50,
    maxBulkDeliveries: 100,
    maxTrackingHistory: 100,
    maxDrafts: 50,
    retentionMonths: DATA_RETENTION[SubscriptionTier.PROFESSIONAL],
    maxDispatchers: 10,
    maxRiders: 100,
    maxDeliveriesPerMonth: 5000,
    maxActiveDeliveries: 50,
    maxExportsPerDay: 5,
    maxExportsPerMonth: 15,
  },
};

export function getTierLimits(tier: SubscriptionTier): TierLimits {
  const limits = TIER_LIMITS[tier];
  if (limits === undefined) {
    console.error(`[Limits] Unknown subscription tier: ${tier} — falling back to STARTER`);
    return TIER_LIMITS[SubscriptionTier.STARTER];
  }
  return limits;
}
