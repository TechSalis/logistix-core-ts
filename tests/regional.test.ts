import { describe, it, expect } from 'vitest';
import { REGIONAL_CONFIG, REGIONAL_LOCALE, HQ_LOCATION } from '../src/config/regional.config.js';

describe('REGIONAL_CONFIG', () => {
  it('has Nigeria country code', () => {
    expect(REGIONAL_CONFIG.defaultCountryCode).toBe('234');
    expect(REGIONAL_CONFIG.defaultIsoCountryCode).toBe('ng');
  });

  it('has Africa/Lagos timezone', () => {
    expect(REGIONAL_CONFIG.timeZone).toBe('Africa/Lagos');
  });

  it('has naira currency', () => {
    expect(REGIONAL_CONFIG.currencySymbol).toBe('₦');
  });

  it('has Nigerian states', () => {
    expect(REGIONAL_CONFIG.states).toContain('Lagos');
    expect(REGIONAL_CONFIG.states).toContain('Federal Capital Territory');
    expect(REGIONAL_CONFIG.states.length).toBeGreaterThanOrEqual(36);
  });
});

describe('REGIONAL_LOCALE', () => {
  it('is en-NG', () => {
    expect(REGIONAL_LOCALE).toBe('en-NG');
  });
});

describe('HQ_LOCATION', () => {
  it('is Lagos, Nigeria', () => {
    expect(HQ_LOCATION).toBe('Lagos, Nigeria');
  });
});
