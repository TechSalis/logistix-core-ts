export interface BankDetails {
  readonly bankName: string;
  readonly bankCode: string;
  readonly accountNumber: string;
  readonly accountName: string;
}

export const BRAND_NAME = 'Logistix';

export interface SystemConfig {
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

export function buildSystemConfig(overrides: Partial<SystemConfig> = {}): SystemConfig {
  return {
    customerBaseUrl: overrides.customerBaseUrl ?? '',
    businessBaseUrl: overrides.businessBaseUrl ?? '',
    emailDomain: overrides.emailDomain ?? '',
    supportEmail:
      overrides.supportEmail ?? (overrides.emailDomain ? `support@${overrides.emailDomain}` : ''),
    paymentsEmail:
      overrides.paymentsEmail ?? (overrides.emailDomain ? `payments@${overrides.emailDomain}` : ''),
  };
}
