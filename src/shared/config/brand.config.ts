export interface BrandConfig {
  brandName: string;
  brandDescription: string;
  domain: string;
  supportEmail: string;
  paymentsEmail: string;
  supportPhone: string;
  logoUrl: string;
  faviconUrl: string;
  trackingPrefix: string;
  jwtIssuer: string;
  deepLinkScheme: string;
  appStoreUrl: string;
  playStoreUrl: string;
}

const BRAND_DEFAULTS: BrandConfig = {
  brandName: 'Logistix',
  brandDescription: 'AI-Powered Logistics Platform',
  domain: 'logistix.team',
  supportEmail: 'support@logistix.team',
  paymentsEmail: 'payments@logistix.team',
  supportPhone: '',
  logoUrl: '/pwa-192x192.png',
  faviconUrl: '/favicon.png',
  trackingPrefix: 'LGX-',
  jwtIssuer: 'logistix',
  deepLinkScheme: 'logistix',
  appStoreUrl: '',
  playStoreUrl: '',
};

export function buildBrandConfig(
  overrides?: Partial<BrandConfig>,
): BrandConfig {
  return {
    brandName:
      overrides?.brandName ??
      process.env.BRAND_NAME ??
      BRAND_DEFAULTS.brandName,
    brandDescription:
      overrides?.brandDescription ??
      process.env.BRAND_DESCRIPTION ??
      BRAND_DEFAULTS.brandDescription,
    domain:
      overrides?.domain ??
      process.env.BRAND_DOMAIN ??
      BRAND_DEFAULTS.domain,
    supportEmail:
      overrides?.supportEmail ??
      process.env.BRAND_SUPPORT_EMAIL ??
      BRAND_DEFAULTS.supportEmail,
    paymentsEmail:
      overrides?.paymentsEmail ??
      process.env.BRAND_PAYMENTS_EMAIL ??
      BRAND_DEFAULTS.paymentsEmail,
    supportPhone:
      overrides?.supportPhone ??
      process.env.BRAND_SUPPORT_PHONE ??
      BRAND_DEFAULTS.supportPhone,
    logoUrl:
      overrides?.logoUrl ??
      process.env.BRAND_LOGO_URL ??
      BRAND_DEFAULTS.logoUrl,
    faviconUrl:
      overrides?.faviconUrl ??
      process.env.BRAND_FAVICON_URL ??
      BRAND_DEFAULTS.faviconUrl,
    trackingPrefix:
      overrides?.trackingPrefix ??
      process.env.BRAND_TRACKING_PREFIX ??
      BRAND_DEFAULTS.trackingPrefix,
    jwtIssuer:
      overrides?.jwtIssuer ??
      process.env.BRAND_JWT_ISSUER ??
      BRAND_DEFAULTS.jwtIssuer,
    deepLinkScheme:
      overrides?.deepLinkScheme ??
      process.env.BRAND_DEEP_LINK_SCHEME ??
      BRAND_DEFAULTS.deepLinkScheme,
    appStoreUrl:
      overrides?.appStoreUrl ??
      process.env.BRAND_APP_STORE_URL ??
      BRAND_DEFAULTS.appStoreUrl,
    playStoreUrl:
      overrides?.playStoreUrl ??
      process.env.BRAND_PLAY_STORE_URL ??
      BRAND_DEFAULTS.playStoreUrl,
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
