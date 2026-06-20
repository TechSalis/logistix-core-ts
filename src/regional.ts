import { z } from 'zod';

export interface RegionalConfig {
  readonly defaultCountryCode: string;
  readonly timeZone: string;
  readonly states: readonly string[];
}

const regionalConfigSchema = z.object({
  defaultCountryCode: z.string(),
  timeZone: z.string(),
  states: z.array(z.string()),
});

const rawRegionalConfig = {
  defaultCountryCode: '234',
  timeZone: 'Africa/Lagos',
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
    'Abuja',
    'Federal Capital Territory',
  ],
} as const;

export const REGIONAL_CONFIG: RegionalConfig = regionalConfigSchema.parse(rawRegionalConfig);
