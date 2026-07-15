export interface BankDetails {
  readonly bankName: string;
  readonly bankCode: string;
  readonly accountNumber: string;
  readonly accountName: string;
}

export const BRAND_NAME = 'Logistix AI';

/** Sentinel value used when a user record is purged but references remain. */
export const DELETED_USER_SENTINEL = 'DELETED_USER';

export interface SystemConfig {
  readonly domain: string;
  readonly customerBaseUrl: string;
  readonly businessBaseUrl: string;
  readonly emailDomain: string;
  readonly supportEmail: string;
  readonly paymentsEmail: string;
}

export const DEFAULT_WORKING_HOURS: Record<string, { start: string; close: string }> = {
  Monday: { start: '07:00', close: '19:00' },
  Tuesday: { start: '07:00', close: '19:00' },
  Wednesday: { start: '07:00', close: '19:00' },
  Thursday: { start: '07:00', close: '19:00' },
  Friday: { start: '07:00', close: '19:00' },
  Saturday: { start: '07:00', close: '19:00' },
};

export const SYSTEM_CONFIG: SystemConfig = /* #__PURE__ */ buildSystemConfig();

/** Shared instance built from env (used by contact/email modules). */
export const SHARED_SYSTEM_CONFIG: SystemConfig = /* #__PURE__ */ buildSystemConfig(
  process.env.CUSTOMER_BASE_URL ? { customerBaseUrl: process.env.CUSTOMER_BASE_URL } : {},
);

export function buildSystemConfig(overrides: Partial<SystemConfig> = {}): SystemConfig {
  const emailDomain = overrides.emailDomain ?? '';
  return {
    domain: overrides.domain ?? 'logistix.team',
    customerBaseUrl: overrides.customerBaseUrl ?? '',
    businessBaseUrl: overrides.businessBaseUrl ?? '',
    emailDomain,
    supportEmail: overrides.supportEmail ?? (emailDomain ? `contact@${emailDomain}` : ''),
    paymentsEmail: overrides.paymentsEmail ?? (emailDomain ? `payments@${emailDomain}` : ''),
  };
}
