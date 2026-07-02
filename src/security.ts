import { z } from 'zod';

export interface SecurityConfig {
  readonly rateLimits: {
    readonly global: { readonly max: number; readonly windowMs: number };
    readonly auth: { readonly max: number; readonly windowMs: number };
    readonly api: { readonly max: number; readonly windowMs: number };
    readonly login: { readonly max: number; readonly window: number };
    readonly register: { readonly max: number; readonly window: number };
    readonly otp: { readonly max: number; readonly window: number };
    readonly tiers: {
      readonly FREE: { readonly max: number; readonly windowMs: number };
      readonly STARTER: { readonly max: number; readonly windowMs: number };
      readonly PROFESSIONAL: { readonly max: number; readonly windowMs: number };
    };
  };
  readonly jwt: {
    readonly jwtExpiresIn: string;
    readonly jwtRefreshExpiresIn: string;
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
    readonly securityPinLength: number;
    readonly securityPinMinRange: number;
    readonly securityPinMaxRange: number;
  };
}

const securityConfigSchema = z.object({
  rateLimits: z.object({
    global: z.object({ max: z.number(), windowMs: z.number() }),
    auth: z.object({ max: z.number(), windowMs: z.number() }),
    api: z.object({ max: z.number(), windowMs: z.number() }),
    login: z.object({ max: z.number(), window: z.number() }),
    register: z.object({ max: z.number(), window: z.number() }),
    otp: z.object({ max: z.number(), window: z.number() }),
    tiers: z.object({
      FREE: z.object({ max: z.number(), windowMs: z.number() }),
      STARTER: z.object({ max: z.number(), windowMs: z.number() }),
      PROFESSIONAL: z.object({ max: z.number(), windowMs: z.number() }),
    }),
  }),
  jwt: z.object({
    jwtExpiresIn: z.string(),
    jwtRefreshExpiresIn: z.string(),
  }),
  headers: z.custom<Record<string, string>>((val) => typeof val === 'object' && val !== null),
  maliciousPatterns: z.array(z.instanceof(RegExp)),
  validation: z.object({
    maxEmailLength: z.number(),
    maxPasswordLength: z.number(),
    maxNameLength: z.number(),
    maxDescriptionLength: z.number(),
    maxPhoneLength: z.number(),
    maxAddressLength: z.number(),
    securityPinLength: z.number().default(6),
    securityPinMinRange: z.number().default(100000),
    securityPinMaxRange: z.number().default(999999),
  }),
});

const rawSecurityConfig = {
  rateLimits: {
    global: { max: 1000, windowMs: 60_000 },
    auth: { max: 15, windowMs: 900_000 },
    api: { max: 100, windowMs: 60_000 },
    login: { max: 10, window: 300 },
    register: { max: 3, window: 3600 },
    otp: { max: 5, window: 3600 },
    tiers: {
      FREE: { max: 100, windowMs: 900_000 },
      STARTER: { max: 500, windowMs: 900_000 },
      PROFESSIONAL: { max: 2000, windowMs: 900_000 },
    },
  },
  jwt: {
    jwtExpiresIn: '1h',
    jwtRefreshExpiresIn: '30d',
  },
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'",
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
    securityPinLength: 6,
    securityPinMinRange: 100000,
    securityPinMaxRange: 999999,
  },
} as const;

export const SECURITY_CONFIG: SecurityConfig = securityConfigSchema.parse(rawSecurityConfig);
