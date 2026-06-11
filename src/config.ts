/**
 * Global system configuration.
 *
 * All values can be overridden via environment variables so that white-labelling
 * or staging environments never require code changes.
 *
 * In Node.js (backend / workers) env vars are read from process.env.
 * In browser environments the host app is responsible for injecting values
 * (e.g. via SvelteKit's PUBLIC_ env vars) and passing them to this factory.
 */

export interface SystemConfig {
  /** Public-facing brand name shown in emails, UI, etc. */
  readonly brandName: string;
  /** Primary domain (without protocol), e.g. "logistix.team" */
  readonly domain: string;
  /** Transactional / support email address */
  readonly supportEmail: string;
  /** Primary support phone number */
  readonly phoneNumber: string;
  /** Full URL to the publicly hosted logo */
  readonly logoUrl: string;
  /** Full URL to the favicon */
  readonly faviconUrl: string;
  /** Apple App Store URL for the mobile app */
  readonly appStoreUrl: string;
  /** Google Play Store URL for the mobile app */
  readonly playStoreUrl: string;
  /** Whether delivery tracking codes are enabled */
  readonly enableTrackingCodes: boolean;
  /** Full public tracking link, e.g. "https://logistix.team/track" */
  readonly trackingLink: string;
  /** Business working hours per weekday */
  readonly workingHours: Record<string, { start: string; close: string }>;
}

const DEFAULT_WORKING_HOURS: Record<string, { start: string; close: string }> = {
  Monday:    { start: '07:00', close: '19:00' },
  Tuesday:   { start: '07:00', close: '19:00' },
  Wednesday: { start: '07:00', close: '19:00' },
  Thursday:  { start: '07:00', close: '19:00' },
  Friday:    { start: '07:00', close: '19:00' },
  Saturday:  { start: '07:00', close: '19:00' },
};

/**
 * Builds a SystemConfig from environment variables with sensible defaults.
 *
 * @param env - An object of environment variables (e.g. `process.env` on Node,
 *              or a manually constructed map in the browser).
 */
export function buildSystemConfig(env: Record<string, string | undefined> = {}): SystemConfig {
  const domain = env['BRAND_DOMAIN'] ?? 'logistix.team';
  const brandName = env['BRAND_NAME'] ?? 'Logistix';

  return {
    brandName,
    domain,
    supportEmail: env['BRAND_SUPPORT_EMAIL'] ?? `contact@${domain}`,
    phoneNumber:  env['BRAND_PHONE_NUMBER']  ?? '09069184604',
    logoUrl:      env['BRAND_LOGO_URL']      ?? '/icon_transparent.png',
    faviconUrl:   env['BRAND_FAVICON_URL']   ?? '/favicon.png',
    appStoreUrl:  env['PUBLIC_APP_STORE_URL']  ?? 'https://apps.apple.com',
    playStoreUrl: env['PUBLIC_PLAY_STORE_URL'] ?? 'https://play.google.com',
    enableTrackingCodes: (env['ENABLE_TRACKING_CODES'] ?? 'true') === 'true',
    trackingLink: env['BRAND_TRACKING_LINK'] ?? `https://${domain}/track`,
    workingHours: DEFAULT_WORKING_HOURS,
  };
}

/**
 * Node.js singleton — auto-populated from process.env.
 * Import this directly in the backend and workers.
 *
 * In browser/SvelteKit code, call `buildSystemConfig(yourEnvMap)` instead,
 * since `process.env` is not available.
 */
export const SYSTEM_CONFIG: SystemConfig =
  typeof process !== 'undefined'
    ? buildSystemConfig(process.env as Record<string, string | undefined>)
    : buildSystemConfig();
