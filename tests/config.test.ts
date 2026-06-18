import { describe, it, expect } from 'vitest';
import { buildSystemConfig, SYSTEM_CONFIG } from '../src/config.js';

describe('buildSystemConfig', () => {
  it('returns defaults with no env vars', () => {
    const config = buildSystemConfig({});
    expect(config.brandName).toBe('Logistix');
    expect(config.domain).toBe('logistix.team');
    expect(config.supportEmail).toBe('contact@logistix.team');
    expect(config.enableTrackingCodes).toBe(true);
  });

  it('has hardcoded brand Name and domain', () => {
    const config = buildSystemConfig({});
    expect(config.brandName).toBe('Logistix');
    expect(config.domain).toBe('logistix.team');
    expect(config.supportEmail).toBe('contact@logistix.team');
  });

  it('disables tracking codes via env', () => {
    const config = buildSystemConfig({ ENABLE_TRACKING_CODES: 'false' });
    expect(config.enableTrackingCodes).toBe(false);
  });

  it('has working hours for Monday–Saturday by default', () => {
    const config = buildSystemConfig({});
    expect(config.workingHours['Monday']).toEqual({ start: '07:00', close: '19:00' });
    expect(config.workingHours['Saturday']).toEqual({ start: '07:00', close: '19:00' });
    expect(config.workingHours['Sunday']).toBeUndefined();
  });
});

describe('SYSTEM_CONFIG singleton', () => {
  it('is a valid SystemConfig object', () => {
    expect(SYSTEM_CONFIG).toHaveProperty('brandName');
    expect(SYSTEM_CONFIG).toHaveProperty('domain');
    expect(SYSTEM_CONFIG).toHaveProperty('supportEmail');

    expect(SYSTEM_CONFIG).toHaveProperty('workingHours');
    expect(typeof SYSTEM_CONFIG.enableTrackingCodes).toBe('boolean');
  });
});
