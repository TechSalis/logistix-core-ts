import { z } from 'zod';
import { DayOfWeek } from './enums.js';

export interface BankDetails {
  readonly bankName: string;
  readonly bankCode: string;
  readonly accountNumber: string;
  readonly accountName: string;
}

/** Sentinel value used when a user record is purged but references remain. */
export const DELETED_USER_SENTINEL = 'DELETED_USER';

export interface SystemConfig {
  readonly jwtIssuer: string;
  readonly customerBaseUrl: string;
  readonly businessBaseUrl: string;
  readonly emailDomain: string;
  readonly supportEmail: string;
  readonly paymentsEmail: string;
  readonly brandName: string;
}

export type WorkingHoursEntry = { start: string; close: string };

const dayOfWeekSchema = z.enum(DayOfWeek);
const workingHoursEntrySchema = z.object({ start: z.string(), close: z.string() });
const workingHoursSchema = z.record(dayOfWeekSchema, workingHoursEntrySchema.optional());

const rawDefaultWorkingHours = {
  [DayOfWeek.MONDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.TUESDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.WEDNESDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.THURSDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.FRIDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.SATURDAY]: { start: '07:00', close: '19:00' },
} as const;

// Runtime validation guard — keeps config in sync with schema
export const DEFAULT_WORKING_HOURS: Partial<Record<DayOfWeek, WorkingHoursEntry>> =
  workingHoursSchema.parse(rawDefaultWorkingHours);

export function buildSystemConfig(overrides: Partial<SystemConfig> = {}): SystemConfig {
  const emailDomain = overrides.emailDomain ?? '';
  return {
    jwtIssuer: overrides.jwtIssuer ?? '',
    customerBaseUrl: overrides.customerBaseUrl ?? '',
    businessBaseUrl: overrides.businessBaseUrl ?? '',
    emailDomain,
    supportEmail: overrides.supportEmail ?? (emailDomain ? `contact@${emailDomain}` : ''),
    paymentsEmail: overrides.paymentsEmail ?? (emailDomain ? `payments@${emailDomain}` : ''),
    brandName: overrides.brandName ?? process.env.BRAND_NAME ?? 'Logistix AI',
  };
}

/** Shared instance built from env (used by contact/email modules). */
export const SHARED_SYSTEM_CONFIG: SystemConfig = /* #__PURE__ */ buildSystemConfig({
  ...(process.env.CUSTOMER_BASE_URL ? { customerBaseUrl: process.env.CUSTOMER_BASE_URL } : {}),
  ...(process.env.BUSINESS_BASE_URL ? { businessBaseUrl: process.env.BUSINESS_BASE_URL } : {}),
  ...(process.env.EMAIL_DOMAIN ? { emailDomain: process.env.EMAIL_DOMAIN } : {}),
  ...(process.env.BRAND_NAME ? { brandName: process.env.BRAND_NAME } : {}),
});

export const BRAND_NAME = SHARED_SYSTEM_CONFIG.brandName;
