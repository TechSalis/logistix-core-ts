import { SubscriptionTier, VehicleType } from './enums.js';
import { SYSTEM_CONFIG } from './config.js';
import { DEFAULT_WORKING_HOURS } from './config.js';

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
 * These serve as fallback pricing across all vehicle types.
 */
export const DEFAULT_PRICING_SCHEMES: readonly DefaultPricingScheme[] = [
  { vehicleType: VehicleType.BIKE, baseFare: 1000, perKmRate: 150, minFare: 1000 },
  { vehicleType: VehicleType.CAR, baseFare: 2000, perKmRate: 300, minFare: 2000 },
  { vehicleType: VehicleType.VAN, baseFare: 3000, perKmRate: 400, minFare: 3000 },
  { vehicleType: VehicleType.TRUCK, baseFare: 5000, perKmRate: 500, minFare: 5000 },
] as const;

/**
 * Default system company handle.
 */
export const SYSTEM_COMPANY_HANDLE = SYSTEM_CONFIG.businessHandle;

/**
 * Default system subscription tier applied to the Central Hub company.
 */
export const SYSTEM_SUBSCRIPTION_TIER = SubscriptionTier.PROFESSIONAL;

/**
 * Default company settings used as fallback when no DB company exists.
 */
export interface DefaultCompanySettings {
  readonly workingHours: Record<string, { start: string; close: string }>;
  readonly autoReplyEnabled: boolean;
  readonly tier: SubscriptionTier;
}

export const DEFAULT_COMPANY_SETTINGS: DefaultCompanySettings = {
  workingHours: DEFAULT_WORKING_HOURS,
  autoReplyEnabled: true,
  tier: SYSTEM_SUBSCRIPTION_TIER,
} as const;

/**
 * Static replacement for the old getDefaultCompany() DB query.
 * All values come from compile-time constants — zero DB round-trips.
 */
export interface DefaultSystemCompany {
  readonly id: null;
  readonly name: string;
  readonly businessHandle: string;
  readonly pricingSchemes: readonly DefaultPricingScheme[];
  readonly companySettings: DefaultCompanySettings;
}

export const DEFAULT_SYSTEM_COMPANY: DefaultSystemCompany = {
  id: null,
  name: SYSTEM_CONFIG.brandName,
  businessHandle: SYSTEM_CONFIG.businessHandle,
  pricingSchemes: DEFAULT_PRICING_SCHEMES,
  companySettings: DEFAULT_COMPANY_SETTINGS,
} as const;
