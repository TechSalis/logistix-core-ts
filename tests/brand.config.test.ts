import { describe, it, expect, beforeEach } from 'vitest';
import { buildBrandConfig } from '../src/shared/config/brand.config';

describe('buildBrandConfig', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.BRAND_NAME;
    delete process.env.BRAND_DOMAIN;
    delete process.env.BRAND_TRACKING_PREFIX;
  });

  it('returns defaults when no env vars or overrides', () => {
    const config = buildBrandConfig();
    expect(config.brandName).toBe('Logistix');
    expect(config.domain).toBe('logistix.team');
    expect(config.trackingPrefix).toBe('LGX-');
    expect(config.jwtIssuer).toBe('logistix');
    expect(config.deepLinkScheme).toBe('logistix');
    expect(config.brandDescription).toBe('AI-Powered Logistics Platform');
  });

  it('reads from env vars', () => {
    process.env.BRAND_NAME = 'Acme';
    process.env.BRAND_DOMAIN = 'acme.com';
    const config = buildBrandConfig();
    expect(config.brandName).toBe('Acme');
    expect(config.domain).toBe('acme.com');
  });

  it('overrides take precedence over env vars', () => {
    process.env.BRAND_NAME = 'Acme';
    const config = buildBrandConfig({ brandName: 'Beta' });
    expect(config.brandName).toBe('Beta');
  });
});
