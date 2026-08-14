import { VehicleType } from '../enums/enums.js';

export interface PricingScheme {
  readonly vehicleType: VehicleType;
  /** Base fare in kobo. */
  readonly baseFare: number;
  /** Per-km rate in kobo. */
  readonly perKmRate: number;
  /** Minimum fare in kobo. */
  readonly minFare: number;
}

// All money values are kobo ("kobo everywhere"). ₦1,000 = 100_000 kobo, ₦150 = 15_000 kobo.
export const DEFAULT_PRICING_SCHEMES: readonly PricingScheme[] = [
  { vehicleType: VehicleType.BIKE, baseFare: 100_000, perKmRate: 15_000, minFare: 100_000 },
] as const;
