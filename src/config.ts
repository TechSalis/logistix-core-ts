export interface BankDetails {
  readonly bankName: string;
  readonly bankCode: string;
  readonly accountNumber: string;
  readonly accountName: string;
}

export interface SystemConfig {
  readonly brandName: string;
  readonly domain: string;
  readonly supportEmail: string;
  readonly phoneNumber: string;
  readonly logoUrl: string;
  readonly faviconUrl: string;
  readonly workingHours: Record<string, { start: string; close: string }>;
}

export interface SystemConfigOverrides {
  domain?: string;
  supportEmail?: string;
  phoneNumber?: string;
}

export const DEFAULT_WORKING_HOURS: Record<string, { start: string; close: string }> = {
  Monday: { start: '07:00', close: '19:00' },
  Tuesday: { start: '07:00', close: '19:00' },
  Wednesday: { start: '07:00', close: '19:00' },
  Thursday: { start: '07:00', close: '19:00' },
  Friday: { start: '07:00', close: '19:00' },
  Saturday: { start: '07:00', close: '19:00' },
  Sunday: { start: '07:00', close: '19:00' },
};

const BASE_CONFIG: SystemConfig = {
  domain: 'logistix.team',
  brandName: 'Logistix',
  supportEmail: 'contact@logistix.team',
  phoneNumber: '',
  logoUrl: '/pwa-512x512.png',
  faviconUrl: '/favicon.png',
  workingHours: DEFAULT_WORKING_HOURS,
};

export function buildSystemConfig(overrides?: SystemConfigOverrides): SystemConfig {
  const domain = overrides?.domain ?? BASE_CONFIG.domain;
  return {
    ...BASE_CONFIG,
    domain,
    supportEmail: overrides?.supportEmail ?? `contact@${domain}`,
    phoneNumber: overrides?.phoneNumber ?? BASE_CONFIG.phoneNumber,
  };
}

export const SYSTEM_CONFIG: SystemConfig = BASE_CONFIG;
