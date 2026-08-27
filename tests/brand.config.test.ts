import { describe, it, expect, beforeEach } from 'vitest';
import { buildBrandConfig } from '../src/shared/config/brand.config';

describe('buildBrandConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.BRAND_NAME;
    delete process.env.BRAND_TRACKING_PREFIX;
  });

  it('returns defaults when no env vars or overrides', () => {
    const config = buildBrandConfig();
    expect(config.brandName).toBe('Logistix');
    expect(config.trackingPrefix).toBe('LGX-');
  });

  it('reads from env vars', () => {
    process.env.BRAND_NAME = 'Acme';
    process.env.BRAND_TRACKING_PREFIX = 'ACM-';
    const config = buildBrandConfig();
    expect(config.brandName).toBe('Acme');
    expect(config.trackingPrefix).toBe('ACM-');
  });

  it('overrides take precedence over env vars', () => {
    process.env.BRAND_NAME = 'Acme';
    const config = buildBrandConfig({ brandName: 'Beta' });
    expect(config.brandName).toBe('Beta');
  });
});
