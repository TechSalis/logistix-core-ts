import { z } from 'zod';

export interface RegionalConfig {
  readonly defaultCountryCode: string;
  readonly defaultIsoCountryCode: string;
  readonly timeZone: string;
  readonly currencySymbol: string;
  readonly states: readonly string[];
}

const regionalConfigSchema = z.object({
  defaultCountryCode: z.string(),
  defaultIsoCountryCode: z.string(),
  timeZone: z.string(),
  currencySymbol: z.string(),
  states: z.array(z.string()),
});

const rawRegionalConfig = {
  // Phone dialing code (ITU-T E.164), NOT ISO 3166-1 alpha-2 country code
  defaultCountryCode: '234',
  // ISO 3166-1 alpha-2 country code
  defaultIsoCountryCode: 'ng',
  timeZone: 'Africa/Lagos',
  currencySymbol: '₦',
  states: [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Federal Capital Territory',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Katsina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nasarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ],
} as const;

// Runtime validation guard — keeps config in sync with schema
export const REGIONAL_CONFIG: RegionalConfig = regionalConfigSchema.parse(rawRegionalConfig);

/** Locale string for toLocaleDateString / toLocaleTimeString / toLocaleString calls. */
export const REGIONAL_LOCALE = 'en-NG';

/** Headquarter location for footer text in emails. */
export const HQ_LOCATION = 'Lagos, Nigeria';
