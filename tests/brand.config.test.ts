import { describe, it, expect, vi, afterEach } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getBrandConfig', () => {
  it('returns committed defaults when env is unset', async () => {
    vi.resetModules();
    const { getBrandConfig } = await import('../src/shared/config/brand.config');
    expect(getBrandConfig().brandName).toBe('Logistix');
    expect(getBrandConfig().trackingPrefix).toBe('LGX-');
  });

  it('reads brand name from env', async () => {
    vi.stubEnv('BRAND_NAME', 'Beta');
    vi.resetModules();
    const { getBrandConfig } = await import('../src/shared/config/brand.config');
    expect(getBrandConfig().brandName).toBe('Beta');
  });

  it('reads tracking prefix from env', async () => {
    vi.stubEnv('BRAND_TRACKING_PREFIX', 'BT-');
    vi.resetModules();
    const { getBrandConfig } = await import('../src/shared/config/brand.config');
    expect(getBrandConfig().trackingPrefix).toBe('BT-');
  });

  it('memoizes (lazy once)', async () => {
    vi.resetModules();
    const mod = await import('../src/shared/config/brand.config');
    const first = mod.getBrandConfig();
    vi.stubEnv('BRAND_NAME', 'Changed');
    expect(mod.getBrandConfig()).toBe(first);
  });
});