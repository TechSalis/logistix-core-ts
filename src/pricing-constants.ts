import { VehicleType } from './enums.js';

export interface PricingSchemeDefaults {
  vehicleType: VehicleType;
  baseFare: number;
  perKmRate: number;
  minFare: number;
}

export const DEFAULT_PRICING_SCHEMES: PricingSchemeDefaults[] = [
  { vehicleType: VehicleType.BIKE, baseFare: 1000, perKmRate: 150, minFare: 1000 },
  { vehicleType: VehicleType.CAR, baseFare: 2000, perKmRate: 300, minFare: 2000 },
  { vehicleType: VehicleType.VAN, baseFare: 3000, perKmRate: 400, minFare: 3000 },
  { vehicleType: VehicleType.TRUCK, baseFare: 5000, perKmRate: 500, minFare: 5000 },
] as const;
