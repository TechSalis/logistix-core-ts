import { z } from 'zod';
import { SubscriptionTier } from './enums.js';
import { DATA_RETENTION } from './billing.js';

export interface TierLimits {
  readonly maxAIDeliveriesPerAction: number;
  readonly maxBulkDeliveries: number;
  readonly maxQueryLimit: number;
  readonly maxTrackingHistory: number;
  readonly maxMemoryArraySize: number;
  readonly maxSynthesisResults: number;
  readonly maxDrafts: number;
  readonly retentionDays: number;

  // Account & usage limits
  readonly maxDispatchers: number;
  readonly maxRiders: number;
  readonly maxDeliveriesPerMonth: number;
  readonly maxActiveDeliveries: number;
}

export interface LimitsConfig {
  readonly maxBatchSize: number;
  readonly dbBatchSize: number;
  readonly userActionConcurrency: number;
  readonly externalApiConcurrency: number;
  readonly maxQueryLimit: number; // Fallback for non-tier-aware services
  readonly locationDeduplicationRadiusMeters: number;
  readonly externalApiTimeoutMs: number;
  readonly trackingFrequencyConfig: {
    readonly baseIntervalMs: number; // Interval when close to destination (e.g. 10s)
    readonly farDistanceMeters: number; // Distance threshold to consider 'far' (e.g. 2000m)
    readonly farIntervalMs: number; // Interval when far from destination (e.g. 60s)
  };
  readonly maxRiderActiveDeliveries: number;
}

const limitsConfigSchema = z.object({
  maxBatchSize: z.number(),
  dbBatchSize: z.number(),
  userActionConcurrency: z.number(),
  externalApiConcurrency: z.number(),
  maxQueryLimit: z.number(),
  locationDeduplicationRadiusMeters: z.number(),
  externalApiTimeoutMs: z.number(),
  trackingFrequencyConfig: z.object({
    baseIntervalMs: z.number(),
    farDistanceMeters: z.number(),
    farIntervalMs: z.number(),
  }),
  maxRiderActiveDeliveries: z.number(),
});

const rawLimitsConfig = {
  maxBatchSize: 50, // Max actions executed per agent turn (system protection)
  dbBatchSize: 100, // Max rows per DB bulk operation for background/flush jobs (executeInBatches)
  userActionConcurrency: 10, // Chunk size for user-flow operations (chunkedPromiseAll) to avoid spiking DB connections
  externalApiConcurrency: 5, // Capped concurrency for external APIs like Google Maps to avoid rate limits
  maxQueryLimit: 100, // Fallback query limit for non-tier-aware services
  locationDeduplicationRadiusMeters: 1000, // Drop duplicate location results within this range
  externalApiTimeoutMs: 10000, // Default timeout for external requests (e.g. Maps API)
  trackingFrequencyConfig: {
    baseIntervalMs: 3000, // 3 seconds — minimum interval when very close to destination
    farDistanceMeters: 3000, // 3km — distance threshold to switch from close to far interval
    farIntervalMs: 60000, // 60 seconds — maximum interval when far from destination
  },
  maxRiderActiveDeliveries: 5,
} as const;

export const LIMITS_CONFIG: LimitsConfig = limitsConfigSchema.parse(rawLimitsConfig);

/**
 * Tier-based limits - ALL operational limits are tier-aware
 * These limits control the entire flow from drafting to synthesis
 */
export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  [SubscriptionTier.STARTER]: {
    maxAIDeliveriesPerAction: 30,
    maxBulkDeliveries: 50,
    maxQueryLimit: 50,
    maxTrackingHistory: 50,
    maxMemoryArraySize: 50,
    maxSynthesisResults: 50,
    maxDrafts: 30,
    retentionDays: DATA_RETENTION[SubscriptionTier.STARTER],
    maxDispatchers: 2,
    maxRiders: 20,
    maxDeliveriesPerMonth: 500,
    maxActiveDeliveries: 20,
  },
  [SubscriptionTier.PROFESSIONAL]: {
    maxAIDeliveriesPerAction: 50,
    maxBulkDeliveries: 100,
    maxQueryLimit: 100,
    maxTrackingHistory: 100,
    maxMemoryArraySize: 100,
    maxSynthesisResults: 100,
    maxDrafts: 50,
    retentionDays: DATA_RETENTION[SubscriptionTier.PROFESSIONAL],
    maxDispatchers: 10,
    maxRiders: 100,
    maxDeliveriesPerMonth: 5000,
    maxActiveDeliveries: 50,
  },
};

export const getTierLimits = (tier: SubscriptionTier): TierLimits => {
  return TIER_LIMITS[tier] ?? TIER_LIMITS[SubscriptionTier.STARTER];
};
