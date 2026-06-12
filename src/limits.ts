import { z } from 'zod';
import { SubscriptionTier } from './enums.js';

/**
 * Per-tier operational limits for AI and manual delivery operations.
 */
export interface TierLimits {
  readonly maxAIDeliveriesPerAction: number;
  readonly maxBulkDeliveries: number;
  readonly maxQueryLimit: number;
  readonly maxTrackingHistory: number;
  readonly maxMemoryArraySize: number;
  readonly maxSynthesisResults: number;
  readonly maxDrafts: number;
}

/**
 * System-wide operational limits (non-tier-specific).
 */
export interface LimitsConfig {
  readonly maxBatchSize: number;
  readonly dbBatchSize: number;
  readonly userActionConcurrency: number;
  readonly externalApiConcurrency: number;
  readonly maxDisambiguationOptions: number;
  readonly maxQueryLimit: number;
}

const limitsConfigSchema = z.object({
  maxBatchSize: z.number(),
  dbBatchSize: z.number(),
  userActionConcurrency: z.number(),
  externalApiConcurrency: z.number(),
  maxDisambiguationOptions: z.number(),
  maxQueryLimit: z.number(),
});

const rawLimitsConfig = {
  maxBatchSize: 50,
  dbBatchSize: 100,
  userActionConcurrency: 10,
  externalApiConcurrency: 5,
  maxDisambiguationOptions: 3,
  maxQueryLimit: 100,
} as const;

export const LIMITS_CONFIG: LimitsConfig = limitsConfigSchema.parse(rawLimitsConfig);

/**
 * Tier-based limits — every operational limit is tier-aware.
 */
export const TIER_LIMITS: Record<SubscriptionTier, TierLimits> = {
  [SubscriptionTier.FREE]: {
    maxAIDeliveriesPerAction: 10,
    maxBulkDeliveries: 20,
    maxQueryLimit: 20,
    maxTrackingHistory: 20,
    maxMemoryArraySize: 20,
    maxSynthesisResults: 20,
    maxDrafts: 10,
  },
  [SubscriptionTier.STARTER]: {
    maxAIDeliveriesPerAction: 30,
    maxBulkDeliveries: 50,
    maxQueryLimit: 50,
    maxTrackingHistory: 50,
    maxMemoryArraySize: 50,
    maxSynthesisResults: 50,
    maxDrafts: 30,
  },
  [SubscriptionTier.PROFESSIONAL]: {
    maxAIDeliveriesPerAction: 50,
    maxBulkDeliveries: 100,
    maxQueryLimit: 100,
    maxTrackingHistory: 100,
    maxMemoryArraySize: 100,
    maxSynthesisResults: 100,
    maxDrafts: 50,
  },
};

export const getTierLimits = (tier: SubscriptionTier): TierLimits => {
  return TIER_LIMITS[tier];
};
