import { describe, it, expect } from 'vitest';
import {
  buildSystemConfig,
  BRAND_NAME,
  DEFAULT_WORKING_HOURS,
} from '../src/config/system.config.js';
import { DayOfWeek } from '../src/enums/enums.js';

describe('buildSystemConfig', () => {
  it('returns defaults with no overrides', () => {
    const config = buildSystemConfig();
    expect(config.customerBaseUrl).toBe('');
    expect(config.emailDomain).toBe('');
    expect(config.jwtIssuer).toBe('');
    expect(config.supportEmail).toBe('');
    expect(config.paymentsEmail).toBe('');
  });

  it('sets customerBaseUrl', () => {
    const config = buildSystemConfig({
      customerBaseUrl: 'https://logistix.team',
    });
    expect(config.customerBaseUrl).toBe('https://logistix.team');
    expect(config.emailDomain).toBe('');
    expect(config.supportEmail).toBe('');
  });

  it('derives supportEmail and paymentsEmail from emailDomain', () => {
    const config = buildSystemConfig({
      customerBaseUrl: 'https://staging.logistix.team',
      emailDomain: 'logistix.team',
    });
    expect(config.customerBaseUrl).toBe('https://staging.logistix.team');
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

describe('DEFAULT_WORKING_HOURS', () => {
  it('covers Monday through Saturday at 07:00-19:00', () => {
    const entries = [
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
    ];
    expect(Object.keys(DEFAULT_WORKING_HOURS)).toHaveLength(6);
    for (const day of entries) {
      expect(DEFAULT_WORKING_HOURS[day]).toEqual({ start: '07:00', close: '19:00' });
    }
    expect(DEFAULT_WORKING_HOURS[DayOfWeek.SUNDAY]).toBeUndefined();
  });
});
