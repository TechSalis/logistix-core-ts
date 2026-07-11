import { describe, it, expect } from 'vitest';
import { buildSystemConfig, SYSTEM_CONFIG, BRAND_NAME } from '../src/config.js';

describe('buildSystemConfig', () => {
  it('returns defaults with no overrides', () => {
    const config = buildSystemConfig();
    expect(config.customerBaseUrl).toBe('');
    expect(config.businessBaseUrl).toBe('');
    expect(config.emailDomain).toBe('');
    expect(config.supportEmail).toBe('');
    expect(config.paymentsEmail).toBe('');
  });

  it('sets customerBaseUrl and businessBaseUrl', () => {
    const config = buildSystemConfig({
      customerBaseUrl: 'https://logistix.team',
      businessBaseUrl: 'https://business.logistix.team',
    });
    expect(config.customerBaseUrl).toBe('https://logistix.team');
    expect(config.businessBaseUrl).toBe('https://business.logistix.team');
    expect(config.emailDomain).toBe('');
    expect(config.supportEmail).toBe('');
  });

  it('derives supportEmail and paymentsEmail from emailDomain', () => {
    const config = buildSystemConfig({
      customerBaseUrl: 'https://staging.logistix.team',
      businessBaseUrl: 'https://business.staging.logistix.team',
      emailDomain: 'logistix.team',
    });
    expect(config.customerBaseUrl).toBe('https://staging.logistix.team');
    expect(config.businessBaseUrl).toBe('https://business.staging.logistix.team');
    expect(config.emailDomain).toBe('logistix.team');
    expect(config.supportEmail).toBe('contact@logistix.team');
    expect(config.paymentsEmail).toBe('payments@logistix.team');
  });

  it('overrides supportEmail explicitly', () => {
    const config = buildSystemConfig({ supportEmail: 'help@logistix.team' });
    expect(config.supportEmail).toBe('help@logistix.team');
  });

  it('overrides paymentsEmail explicitly', () => {
    const config = buildSystemConfig({ paymentsEmail: 'billing@logistix.team' });
    expect(config.paymentsEmail).toBe('billing@logistix.team');
  });
});

describe('BRAND_NAME constant', () => {
  it('is Logistix', () => {
    expect(BRAND_NAME).toBe('Logistix');
  });
});

describe('SYSTEM_CONFIG singleton', () => {
  it('has customerBaseUrl property', () => {
    expect(SYSTEM_CONFIG).toHaveProperty('customerBaseUrl');
  });

  it('has businessBaseUrl property', () => {
    expect(SYSTEM_CONFIG).toHaveProperty('businessBaseUrl');
  });
});
