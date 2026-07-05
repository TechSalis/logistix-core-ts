import { z } from 'zod';
import { SubscriptionTier } from './enums.js';

export interface TierLimits {
  readonly maxAIDeliveriesPerAction: number;
  readonly maxBulkDeliveries: number;
  readonly maxQueryLimit: number;
  readonly maxTrackingHistory: number;
  readonly maxMemoryArraySize: number;
  readonly maxSynthesisResults: number;
  readonly maxDrafts: number;
  readonly retentionDays: number;
}

export interface LimitsConfig {
  readonly maxBatchSize: number;
  readonly dbBatchSize: number;
  readonly userActionConcurrency: number;
  readonly externalApiConcurrency: number;
  readonly maxDisambiguationOptions: number;
  readonly maxQueryLimit: number; // Fallback for non-tier-aware services
  readonly locationDeduplicationRadiusMeters: number;
  readonly disambiguationGapThreshold: number;
  readonly externalApiTimeoutMs: number;
  readonly trackingFrequencyConfig: {
    readonly baseIntervalMs: number; // Interval when close to destination (e.g. 10s)
    readonly farDistanceMeters: number; // Distance threshold to consider 'far' (e.g. 2000m)
    readonly farIntervalMs: number; // Interval when far from destination (e.g. 60s)
  };
}

const limitsConfigSchema = z.object({
  maxBatchSize: z.number(),
  dbBatchSize: z.number(),
  userActionConcurrency: z.number(),
  externalApiConcurrency: z.number(),
  maxDisambiguationOptions: z.number(),
  maxQueryLimit: z.number(),
  locationDeduplicationRadiusMeters: z.number(),
  disambiguationGapThreshold: z.number(),
  externalApiTimeoutMs: z.number(),
  trackingFrequencyConfig: z.object({
    baseIntervalMs: z.number(),
    farDistanceMeters: z.number(),
    farIntervalMs: z.number(),
  }),
});

const rawLimitsConfig = {
  maxBatchSize: 50, // Max actions executed per agent turn (system protection)
  dbBatchSize: 100, // Max rows per DB bulk operation for background/flush jobs (executeInBatches)
  userActionConcurrency: 10, // Chunk size for user-flow operations (chunkedPromiseAll) to avoid spiking DB connections
  externalApiConcurrency: 5, // Capped concurrency for external APIs like Google Maps to avoid rate limits
  maxDisambiguationOptions: 3, // Max location options shown to user (UX/cognitive load)
  maxQueryLimit: 100, // Fallback query limit for non-tier-aware services
  locationDeduplicationRadiusMeters: 1000, // Drop duplicate location results within this range
  disambiguationGapThreshold: 0.2, // Gap between 1st and 2nd best search match to trigger automatic selection
  externalApiTimeoutMs: 10000, // Default timeout for external requests (e.g. Maps API)
  trackingFrequencyConfig: {
    baseIntervalMs: 10000, // 10 seconds
    farDistanceMeters: 3000, // 3km
    farIntervalMs: 60000, // 60 seconds
  },
} as const;

export const LIMITS_CONFIG: LimitsConfig = limitsConfigSchema.parse(rawLimitsConfig);

/**
 * Tier-based limits - ALL operational limits are tier-aware
 * These limits control the entire flow from drafting to synthesis
 */
export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  [SubscriptionTier.STARTER]: {
    maxAIDeliveriesPerAction: 30, // AI draft/book limit per request
    maxBulkDeliveries: 50, // Manual bulk creation limit
    maxQueryLimit: 50, // Database query limit
    maxTrackingHistory: 50, // Tracking IDs in session memory
    maxMemoryArraySize: 50, // Array size during memory merging
    maxSynthesisResults: 50, // Results sent to LLM for synthesis
    maxDrafts: 30, // Draft deliveries per session
    retentionDays: 60, // Hot storage retention
  },
  [SubscriptionTier.PROFESSIONAL]: {
    maxAIDeliveriesPerAction: 50, // AI draft/book limit per request
    maxBulkDeliveries: 100, // Manual bulk creation limit
    maxQueryLimit: 100, // Database query limit
    maxTrackingHistory: 100, // Tracking IDs in session memory
    maxMemoryArraySize: 100, // Array size during memory merging
    maxSynthesisResults: 100, // Results sent to LLM for synthesis
    maxDrafts: 50, // Draft deliveries per session
    retentionDays: 90, // Hot storage retention
  },
};

/**
 * Get tier-specific limits for a subscription tier
 */
export const getTierLimits = (tier: SubscriptionTier): TierLimits => {
  return TIER_LIMITS[tier] ?? TIER_LIMITS[SubscriptionTier.STARTER];
};
