/**
 * Shared cache domain contract consumed by Flutter (TTL config) and web
 * (localStorage TTLs). Single source of truth for cache expiry across platforms.
 *
 * Backend caches use their own CACHE_CONFIG — this file is for client-side
 * caches that need parity.
 */
export interface CacheDomain {
  readonly key: string;
  readonly ttlMs: number;
}

export const CACHE_DOMAINS = {
  PRICING: { key: 'pricing', ttlMs: 15 * 60 * 1000 },
  PLANS: { key: 'plans', ttlMs: 15 * 60 * 1000 },
  CHANNEL_FEES: { key: 'channel_fees', ttlMs: 15 * 60 * 1000 },
  EXPORT_TYPES: { key: 'export_types', ttlMs: 15 * 60 * 1000 },
  ENUM_CATALOG: { key: 'enum_catalog', ttlMs: 60 * 60 * 1000 },
  DELIVERY_HISTORY: { key: 'delivery_history', ttlMs: 10 * 60 * 1000 },
  WALLET_HISTORY: { key: 'wallet_history', ttlMs: 5 * 60 * 1000 },
  WALLET_BANKS: { key: 'wallet_banks', ttlMs: 60 * 60 * 1000 },
  ONBOARDING: { key: 'onboarding', ttlMs: 15 * 60 * 1000 },
  ANALYTICS_DASHBOARD: { key: 'analytics_dashboard', ttlMs: 5 * 60 * 1000 },
  ANALYTICS_TREND: { key: 'analytics_trend', ttlMs: 5 * 60 * 1000 },
} as const;
