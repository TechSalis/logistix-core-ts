/**
 * Global system configuration.
 *
 * All values can be overridden via environment variables so that staging
 * environments never require code changes.
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
  /** Whether delivery tracking codes are enabled */
  readonly enableTrackingCodes: boolean;
  /** Business working hours per weekday */
  readonly workingHours: Record<string, { start: string; close: string }>;
  /** The unique business handle representing the central/system company hub */
  readonly businessHandle: string;
}

import { z } from 'zod';

export const DEFAULT_WORKING_HOURS: Record<string, { start: string; close: string }> = {
  Monday: { start: '07:00', close: '19:00' },
  Tuesday: { start: '07:00', close: '19:00' },
  Wednesday: { start: '07:00', close: '19:00' },
  Thursday: { start: '07:00', close: '19:00' },
  Friday: { start: '07:00', close: '19:00' },
  Saturday: { start: '07:00', close: '19:00' },
};

const SystemConfigSchema = z.object({
  BRAND_DOMAIN: z.string().optional(),
  BRAND_NAME: z.string().optional(),
  BRAND_SUPPORT_EMAIL: z.string().optional(),
  BRAND_PHONE_NUMBER: z.string().optional(),
  BRAND_LOGO_URL: z.string().optional(),
  BRAND_FAVICON_URL: z.string().optional(),
  ENABLE_TRACKING_CODES: z.string().optional(),
  SYSTEM_HUB_HANDLE: z.string().optional(),
});

/**
 * Builds a SystemConfig from environment variables with strict validation.
 *
 * @param env - An object of environment variables (e.g. `process.env` on Node,
 *              or a manually constructed map in the browser).
 */
export function buildSystemConfig(env: Record<string, string | undefined> = {}): SystemConfig {
  try {
    const validated = SystemConfigSchema.parse(env);

    const domain = validated.BRAND_DOMAIN || 'logistix.team';

    return {
      domain,
      brandName: validated.BRAND_NAME || 'Logistix',
      supportEmail: validated.BRAND_SUPPORT_EMAIL || `contact@${domain}`,
      phoneNumber: validated.BRAND_PHONE_NUMBER || '09069184604',
      logoUrl: validated.BRAND_LOGO_URL || '/icon_transparent.png',
      faviconUrl: validated.BRAND_FAVICON_URL || '/favicon.png',
      enableTrackingCodes: (validated.ENABLE_TRACKING_CODES || 'true') === 'true',
      workingHours: DEFAULT_WORKING_HOURS,
      businessHandle: validated.SYSTEM_HUB_HANDLE || 'logistix',
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error('❌ Missing or invalid System Configuration:');
      for (const issue of err.issues) {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      }
    }
    const newErr = new Error('System configuration validation failed.');
    (newErr as any).cause = err;
    throw newErr;
  }
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
