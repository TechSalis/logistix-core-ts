export interface BrandConfig {
  brandName: string;
  trackingPrefix: string;
}

const BRAND_DEFAULTS: BrandConfig = {
  brandName: 'Logistix',
  trackingPrefix: 'LGX-',
};

export function buildBrandConfig(overrides?: Partial<BrandConfig>): BrandConfig {
  return {
    brandName: overrides?.brandName ?? process.env.BRAND_NAME ?? BRAND_DEFAULTS.brandName,
    trackingPrefix:
      overrides?.trackingPrefix ??
      process.env.BRAND_TRACKING_PREFIX ??
      BRAND_DEFAULTS.trackingPrefix,
  };
}

let _brand: BrandConfig | null = null;

/** Lazy singleton — defers process.env reads until first access. */
export function getBrandConfig(): BrandConfig {
  if (!_brand) _brand = buildBrandConfig();
  return _brand;
}

/** @deprecated Use getBrandConfig() instead. */
export const BRAND: BrandConfig = new Proxy({} as BrandConfig, {
  get(_, prop) {
    return getBrandConfig()[prop as keyof BrandConfig];
  },
});
