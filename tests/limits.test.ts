import { describe, it, expect } from 'vitest';
import { LIMITS_CONFIG, TIER_LIMITS, getTierLimits } from '../src/config/limits.config.js';
import { SubscriptionTier } from '../src/enums/enums.js';

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

  it('PROFESSIONAL has realistic limits', () => {
    const limits = TIER_LIMITS[SubscriptionTier.PROFESSIONAL];
    expect(limits.maxDispatchers).toBe(10);
    expect(limits.maxRiders).toBe(100);
    expect(limits.maxDeliveriesPerMonth).toBe(5000);
    expect(limits.maxAIDeliveriesPerAction).toBe(50);
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

  it('falls back to STARTER for unknown tier', () => {
    const limits = getTierLimits('UNKNOWN' as SubscriptionTier);
    expect(limits.maxDispatchers).toBe(2);
  });
});
