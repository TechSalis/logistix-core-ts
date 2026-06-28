/**
 * Global system configuration.
 *
 * All values are hardcoded defaults. Consumers can pass partial overrides
 * to buildSystemConfig() for environment-specific values (e.g. support email).
 */

export interface SystemConfig {
  readonly brandName: string;
  readonly domain: string;
  readonly supportEmail: string;
  readonly phoneNumber: string;
  readonly logoUrl: string;
  readonly faviconUrl: string;
  readonly enableTrackingCodes: boolean;
  readonly workingHours: Record<string, { start: string; close: string }>;
  readonly businessHandle: string;
}

export const DEFAULT_WORKING_HOURS: Record<string, { start: string; close: string }> = {
  Monday: { start: '07:00', close: '19:00' },
  Tuesday: { start: '07:00', close: '19:00' },
  Wednesday: { start: '07:00', close: '19:00' },
  Thursday: { start: '07:00', close: '19:00' },
  Friday: { start: '07:00', close: '19:00' },
  Saturday: { start: '07:00', close: '19:00' },
};

export const DEFAULT_SYSTEM_CONFIG: SystemConfig = {
  domain: 'logistix.team',
  brandName: 'Logistix',
  supportEmail: 'contact@logistix.team',
  phoneNumber: '09069184604',
  logoUrl: '/pwa-512x512.png',
  faviconUrl: '/favicon.png',
  enableTrackingCodes: true,
  workingHours: DEFAULT_WORKING_HOURS,
  businessHandle: 'logistix',
};

export function buildSystemConfig(overrides?: Partial<SystemConfig>): SystemConfig {
  const defined = Object.fromEntries(
    Object.entries(overrides ?? {}).filter(([, v]) => v !== undefined),
  ) as Partial<SystemConfig>;
  return { ...DEFAULT_SYSTEM_CONFIG, ...defined };
}

export const SYSTEM_CONFIG: SystemConfig = DEFAULT_SYSTEM_CONFIG;
