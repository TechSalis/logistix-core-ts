import { SubscriptionTier } from '../enums/enums.js';
import { FIVE_MINUTES_MS, FIFTEEN_MINUTES_MS, MS_PER_DAY } from '../utils/time.js';

export interface SecurityConfig {
  readonly rateLimits: {
    readonly global: { readonly max: number; readonly windowMs: number };
    readonly auth: { readonly max: number; readonly windowMs: number };
    readonly login: { readonly max: number; readonly windowMs: number };
    readonly register: { readonly max: number; readonly windowMs: number };
    readonly tiers: Record<SubscriptionTier, { readonly max: number; readonly windowMs: number }>;
  };
  readonly jwt: {
    readonly jwtExpiresIn: string;
    readonly jwtRefreshExpiresIn: string;
  };
  readonly blocks: {
    // Escalation ladder for temporary (in-memory) auto-blocks: offense #1 → #2 → #3+.
    readonly temporaryLadderMs: readonly number[];
    // Promote a repeat IP offender to a persistent (DB) block after this many
    // temporary blocks within `escalationWindowMs`.
    readonly escalateAfterBlocks: number;
    readonly escalationWindowMs: number;
    readonly persistentEscalatedMs: number;
    readonly maxPersistentMs: number;
  };
  readonly headers: {
    readonly [key: string]: string;
  };
  readonly maliciousPatterns: readonly RegExp[];
  readonly validation: {
    readonly maxEmailLength: number;
    readonly maxPasswordLength: number;
    readonly maxNameLength: number;
    readonly maxDescriptionLength: number;
    readonly maxPhoneLength: number;
    readonly maxAddressLength: number;
    readonly securityPinMinRange: number;
    readonly securityPinMaxRange: number;
  };
}

const rawSecurityConfig = {
  rateLimits: {
    global: { max: 1000, windowMs: 60_000 },
    auth: { max: 15, windowMs: FIFTEEN_MINUTES_MS },
    login: { max: 10, windowMs: FIVE_MINUTES_MS },
    register: { max: 3, windowMs: 3_600_000 },
    tiers: {
      [SubscriptionTier.STARTER]: { max: 500, windowMs: FIFTEEN_MINUTES_MS },
      [SubscriptionTier.PROFESSIONAL]: { max: 2000, windowMs: FIFTEEN_MINUTES_MS },
    },
  },
  jwt: {
    jwtExpiresIn: '1h',
    jwtRefreshExpiresIn: '30d',
  },
  blocks: {
    temporaryLadderMs: [3_600_000, 6 * 3_600_000, 24 * 3_600_000],
    escalateAfterBlocks: 3,
    escalationWindowMs: 7 * MS_PER_DAY,
    persistentEscalatedMs: 7 * MS_PER_DAY,
    maxPersistentMs: 90 * MS_PER_DAY,
  },
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'",
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
    'X-DNS-Prefetch-Control': 'off',
  },
  maliciousPatterns: [
    /(?:wp-admin|wordpress|\.env|\.php$|phpmyadmin|admin\.php|config\.php|\.git|\.svn|\.\.|etc\/passwd|proc\/self|windows\/system32|union\s+select|drop\s+table|insert\s+into|delete\s+from|<script|javascript:|onload=|onerror=)/i,
  ],
  validation: {
    maxEmailLength: 254,
    maxPasswordLength: 128,
    maxNameLength: 150,
    maxDescriptionLength: 1000,
    maxPhoneLength: 20,
    maxAddressLength: 300,
    securityPinMinRange: 100000,
    securityPinMaxRange: 999999,
  },
} as const;

export const SECURITY_CONFIG: SecurityConfig = rawSecurityConfig;
