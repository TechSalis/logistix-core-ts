import { DayOfWeek } from '../enums/enums.js';
import { getBrandConfig } from './brand.config.js';

export interface BankDetails {
  readonly bankName: string;
  readonly bankCode: string;
  readonly accountNumber: string;
  readonly accountName: string;
}

/** Sentinel value used when a user record is purged but references remain. */
export const DELETED_USER_SENTINEL = 'DELETED_USER';

/**
 * System actor ID used for automated/system-generated audit log entries.
 * Used in event_logs.actorId and as RLS role for worker sessions.
 */
export const SYSTEM_ACTOR_ID = 'system';

/** Actor ID used when an admin performs an action without a specific performer. */
export const ADMIN_ACTOR_ID = 'admin';

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

export const DEFAULT_WORKING_HOURS: Partial<Record<DayOfWeek, WorkingHoursEntry>> = {
  [DayOfWeek.MONDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.TUESDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.WEDNESDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.THURSDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.FRIDAY]: { start: '07:00', close: '19:00' },
  [DayOfWeek.SATURDAY]: { start: '07:00', close: '19:00' },
};

export function buildSystemConfig(overrides: Partial<SystemConfig> = {}): SystemConfig {
  const emailDomain = overrides.emailDomain ?? '';
  return {
    jwtIssuer: overrides.jwtIssuer ?? '',
    customerBaseUrl: overrides.customerBaseUrl ?? '',
    businessBaseUrl: overrides.businessBaseUrl ?? '',
    emailDomain,
    supportEmail: overrides.supportEmail ?? (emailDomain ? `contact@${emailDomain}` : ''),
    paymentsEmail: overrides.paymentsEmail ?? (emailDomain ? `payments@${emailDomain}` : ''),
    // Default brand name delegates to BrandConfig — a single authoritative
    // source for the brand. Explicit overrides (web's PUBLIC_BRAND_NAME) win.
    brandName: overrides.brandName ?? getBrandConfig().brandName,
  };
}

/** Shared instance built from env (used by contact/email modules). */
let _systemConfig: SystemConfig | null = null;

/** Lazy singleton — defers process.env reads until first access. */
export function getSystemConfig(): SystemConfig {
  if (!_systemConfig) {
    _systemConfig = buildSystemConfig({
      ...(process.env.EMAIL_DOMAIN ? { emailDomain: process.env.EMAIL_DOMAIN } : {}),
    });
  }
  return _systemConfig;
}

/**
 * Lazy convenience accessor for the brand name — single source is
 * `BrandConfig` (via `getBrandConfig`), kept here so existing `BRAND_NAME`
 * consumers resolve the same authoritative value.
 */
let _brandName: string | null = null;
export function getBrandName(): string {
  if (_brandName === null) _brandName = getBrandConfig().brandName;
  return _brandName;
}

export const BRAND_NAME = getBrandName();
