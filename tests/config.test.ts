import { describe, it, expect } from 'vitest';
import { buildSystemConfig, SYSTEM_CONFIG } from '../src/config.js';

describe('buildSystemConfig', () => {
  it('returns defaults with no overrides', () => {
    const config = buildSystemConfig();
    expect(config.brandName).toBe('Logistix');
    expect(config.domain).toBe('logistix.team');
    expect(config.supportEmail).toBe('contact@logistix.team');
  });

  it('overrides domain', () => {
    const config = buildSystemConfig({ domain: 'staging.logistix.team' });
    expect(config.domain).toBe('staging.logistix.team');
    expect(config.supportEmail).toBe('contact@staging.logistix.team');
  });

  it('overrides supportEmail explicitly', () => {
    const config = buildSystemConfig({ supportEmail: 'help@logistix.team' });
    expect(config.supportEmail).toBe('help@logistix.team');
    expect(config.domain).toBe('logistix.team');
  });

  it('keeps brandName hardcoded', () => {
    const config = buildSystemConfig({ domain: 'other.com' });
    expect(config.brandName).toBe('Logistix');
  });
});

describe('SYSTEM_CONFIG singleton', () => {
  it('has all required properties', () => {
    expect(SYSTEM_CONFIG.brandName).toBe('Logistix');
    expect(SYSTEM_CONFIG.domain).toBe('logistix.team');
    expect(SYSTEM_CONFIG.supportEmail).toBe('contact@logistix.team');
    expect(SYSTEM_CONFIG.workingHours['Monday']).toEqual({ start: '07:00', close: '19:00' });
  });

  it('does not include Sunday in DEFAULT_WORKING_HOURS', () => {
    expect(SYSTEM_CONFIG.workingHours['Sunday']).toBeUndefined();
  });
});
