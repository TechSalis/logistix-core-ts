import { SubscriptionTier, VehicleType } from './enums.js';

/**
 * Default pricing scheme entry used when seeding a new system.
 */
export interface DefaultPricingScheme {
  readonly vehicleType: VehicleType;
  readonly baseFare: number;
  readonly perKmRate: number;
  readonly minFare: number;
}

/**
 * Default pricing schemes for the Central Hub company.
 * These are upserted during system seeding and serve as fallback pricing.
 */
export const DEFAULT_PRICING_SCHEMES: readonly DefaultPricingScheme[] = [
  { vehicleType: VehicleType.BIKE, baseFare: 1000, perKmRate: 150, minFare: 1000 },
] as const;

/**
 * Default system company handle.
 */
export const SYSTEM_COMPANY_HANDLE = 'logistix' as const;

/**
 * Default system subscription tier applied to the Central Hub company.
 */
export const SYSTEM_SUBSCRIPTION_TIER = SubscriptionTier.PROFESSIONAL;
