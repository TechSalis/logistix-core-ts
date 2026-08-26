import { describe, it, expect } from 'vitest';
import {
  LIMITS_CONFIG,
  TIER_LIMITS,
  getTierLimits,
  DEFAULT_MESSAGE_LIMIT,
} from '../src/shared/config/limits.config.js';
import { SubscriptionTier } from '../src/shared/enums/enums.js';

describe('DEFAULT_MESSAGE_LIMIT', () => {
  it('caps a single chat message at 4096 characters', () => {
    expect(DEFAULT_MESSAGE_LIMIT).toBe(4096);
  });
});

describe('LIMITS_CONFIG', () => {
  it('has max batch size', () => {
    expect(LIMITS_CONFIG.maxBatchSize).toBe(50);
  });

  it('has DB batch size', () => {
    expect(LIMITS_CONFIG.dbBatchSize).toBe(100);
  });

  it('has max rider active deliveries', () => {
    expect(LIMITS_CONFIG.maxRiderActiveDeliveries).toBe(5);
  });

  it('serves a 100-row client sync page size', () => {
    expect(LIMITS_CONFIG.syncPageSize).toBe(100);
  });
});

describe('TIER_LIMITS', () => {
  it('STARTER has lower limits than PROFESSIONAL', () => {
    const starter = TIER_LIMITS[SubscriptionTier.STARTER];
    const pro = TIER_LIMITS[SubscriptionTier.PROFESSIONAL];
    expect(starter.maxDispatchers).toBeLessThan(pro.maxDispatchers);
    expect(starter.maxRiders).toBeLessThan(pro.maxRiders);
    expect(starter.maxDeliveriesPerMonth).toBeLessThan(pro.maxDeliveriesPerMonth);
  });

  it('STARTER has realistic limits', () => {
    const limits = TIER_LIMITS[SubscriptionTier.STARTER];
    expect(limits.maxDispatchers).toBe(2);
    expect(limits.maxRiders).toBe(20);
    expect(limits.maxDeliveriesPerMonth).toBe(500);
    expect(limits.maxAIDeliveriesPerAction).toBe(20);
  });

  it('STARTER allows 2 exports/day and 10/month', () => {
    const limits = TIER_LIMITS[SubscriptionTier.STARTER];
    expect(limits.maxExportsPerDay).toBe(2);
    expect(limits.maxExportsPerMonth).toBe(10);
  });

  it('PROFESSIONAL has realistic limits', () => {
    const limits = TIER_LIMITS[SubscriptionTier.PROFESSIONAL];
    expect(limits.maxDispatchers).toBe(10);
    expect(limits.maxRiders).toBe(100);
    expect(limits.maxDeliveriesPerMonth).toBe(5000);
    expect(limits.maxAIDeliveriesPerAction).toBe(50);
  });

  it('PROFESSIONAL allows 5 exports/day and 30/month', () => {
    const limits = TIER_LIMITS[SubscriptionTier.PROFESSIONAL];
    expect(limits.maxExportsPerDay).toBe(5);
    expect(limits.maxExportsPerMonth).toBe(30);
  });
});

describe('getTierLimits', () => {
  it('returns STARTER limits for STARTER tier', () => {
    const limits = getTierLimits(SubscriptionTier.STARTER);
    expect(limits.maxDispatchers).toBe(2);
    expect(limits.maxRiders).toBe(20);
  });

  it('returns PROFESSIONAL limits for PROFESSIONAL tier', () => {
    const limits = getTierLimits(SubscriptionTier.PROFESSIONAL);
    expect(limits.maxDispatchers).toBe(10);
    expect(limits.maxRiders).toBe(100);
  });

  it('throws for an unknown tier', () => {
    expect(() => getTierLimits('UNKNOWN' as SubscriptionTier)).toThrow();
  });
});
