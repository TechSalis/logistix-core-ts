export interface BrandConfig {
  brandName: string;
  trackingPrefix: string;
}

const BRAND_DEFAULTS: BrandConfig = {
  brandName: 'Logistix',
  trackingPrefix: 'LGX-',
};

let _brand: BrandConfig | null = null;

/** Lazy singleton — defers process.env reads until first access. */
export function getBrandConfig(): BrandConfig {
  if (!_brand) {
    _brand = {
      brandName: process.env.BRAND_NAME ?? BRAND_DEFAULTS.brandName,
      trackingPrefix: process.env.BRAND_TRACKING_PREFIX ?? BRAND_DEFAULTS.trackingPrefix,
    };
  }
  return _brand;
}
