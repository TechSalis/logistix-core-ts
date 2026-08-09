import { MetricDomain, MetricGranularity } from '../enums/enums.js';

/**
 * Unified metrics configuration — single source of truth for the `metrics`
 * table shared across backend (query layer), workers (compute + compress),
 * and clients (windows / granularity selection).
 *
 * The `metrics` table stores one row per (company scope, domain, granularity,
 * bucket_start). Domains share one generic column set; each domain only fills
 * the columns meaningful to it (see METRIC_DOMAIN_MAPPINGS). Fine buckets are
 * folded into coarser ones by the workers' compression ladder per
 * METRICS_RETENTION below.
 */

/**
 * Sentinel bucket_start for LIFETIME rows. LIFETIME is not a rolling window —
 * there is exactly one LIFETIME row per (scope, domain), so the bucket_start
 * is a fixed sentinel instead of a date (the unique index then yields one row).
 */
export const LIFETIME_BUCKET_START = '1970-01-01';

/**
 * Compression ladder: how long each granularity is retained before its
 * expired buckets are folded into the next coarser tier.
 *
 *   DAY     -> retained 90 days  -> folds into WEEK
 *   WEEK    -> retained 12 months -> folds into MONTH
 *   MONTH   -> retained 5 years   -> folds into LIFETIME
 *   LIFETIME -> retained forever   (nothing to fold into)
 *
 * Tiers are cumulative: a WEEK bucket is the sum of its (now-deleted) DAY
 * buckets, etc. All retention boundaries are month/date-anchored in the Lagos
 * timezone (see getRetentionCutoff).
 */
export interface GranularityRetention {
  /** Retention window for buckets of this granularity. */
  readonly retainFor: number;
  /** Unit of `retainFor`. 'days' for DAY, 'months' for WEEK/MONTH. */
  readonly unit: 'days' | 'months';
  /** Coarser granularity expired buckets are folded into; null = keep forever. */
  readonly foldTo: MetricGranularity | null;
}

export const METRICS_RETENTION: Record<MetricGranularity, GranularityRetention> = {
  [MetricGranularity.DAY]: { retainFor: 90, unit: 'days', foldTo: MetricGranularity.WEEK },
  [MetricGranularity.WEEK]: { retainFor: 12, unit: 'months', foldTo: MetricGranularity.MONTH },
  [MetricGranularity.MONTH]: {
    retainFor: 5 * 12,
    unit: 'months',
    foldTo: MetricGranularity.LIFETIME,
  },
  [MetricGranularity.LIFETIME]: {
    retainFor: Number.POSITIVE_INFINITY,
    unit: 'months',
    foldTo: null,
  },
};

/**
 * Maximum trend window (days) for system-wide reads. Derived from the MONTH
 * granularity's retention (~5 years) so the admin system-trend clamp can never
 * drift from the compression ladder — anything beyond this horizon lives only
 * in the LIFETIME row, served separately via lifetime totals.
 */
export const MAX_TREND_WINDOW_DAYS = METRICS_RETENTION[MetricGranularity.MONTH].retainFor * 30;

/**
 * Ordered compression chain (finest -> coarsest). The workers fold each tier
 * in this order, so a coarse tier is always current before its own fold.
 */
export const METRICS_FOLD_CHAIN: readonly MetricGranularity[] = [
  MetricGranularity.DAY,
  MetricGranularity.WEEK,
  MetricGranularity.MONTH,
];

export const METRIC_DOMAINS: readonly MetricDomain[] = [
  MetricDomain.DELIVERIES,
  MetricDomain.CONVERSATIONS,
  MetricDomain.RIDERS,
  MetricDomain.REVENUE,
];

/**
 * Generic columns shared by all domains on the `metrics` table. Each domain
 * fills a subset (documented in METRIC_DOMAIN_MAPPINGS); unused columns stay
 * at their defaults (0 / null / {}).
 */
export type MetricColumn =
  | 'totalCount'
  | 'deliveredCount'
  | 'cancelledCount'
  | 'failedCount'
  | 'totalRevenueKobo'
  | 'avgDeliveryTimeMinutes'
  | 'channelBreakdown'
  | 'peakHour'
  | 'uniqueRidersActive';

/**
 * Per-domain mapping: which generic columns a domain populates, plus the keys
 * it writes into `extra_metrics` (JSON). Central reference for the workers'
 * compute step and the backend's read/aggregation layer.
 */
export interface MetricDomainMapping {
  readonly domain: MetricDomain;
  /** Generic columns this domain fills. */
  readonly columns: readonly MetricColumn[];
  /** extra_metrics JSON keys this domain writes (documentation + contract). */
  readonly extraMetricKeys: readonly string[];
}

export const METRIC_DOMAIN_MAPPINGS: readonly MetricDomainMapping[] = [
  {
    domain: MetricDomain.DELIVERIES,
    columns: [
      'totalCount',
      'deliveredCount',
      'cancelledCount',
      'failedCount',
      'totalRevenueKobo',
      'avgDeliveryTimeMinutes',
      'channelBreakdown',
      'peakHour',
      'uniqueRidersActive',
    ],
    extraMetricKeys: ['prepaidCount', 'payOnDeliveryCount'],
  },
  {
    domain: MetricDomain.CONVERSATIONS,
    columns: ['totalCount', 'channelBreakdown'],
    extraMetricKeys: [
      'activeCount',
      'messagesReceived',
      'messagesSent',
      'escalatedCount',
      'avgFirstResponseMinutes',
    ],
  },
  {
    domain: MetricDomain.RIDERS,
    columns: ['totalCount', 'deliveredCount', 'uniqueRidersActive'],
    extraMetricKeys: ['approvedCount', 'pendingCount', 'suspendedCount'],
  },
  {
    domain: MetricDomain.REVENUE,
    columns: ['totalCount', 'totalRevenueKobo', 'channelBreakdown'],
    extraMetricKeys: ['refundedKobo', 'avgTransactionValueKobo'],
  },
];

/**
 * Returns the bucket granularity to serve for a requested window in days.
 * Mirrors the METRICS_RETENTION ladder so a client asking for `days` always
 * gets the finest tier whose retention covers the window.
 *
 *   <= 90 days   -> DAY
 *   <= ~12 months -> WEEK
 *   <= ~5 years  -> MONTH
 *   beyond       -> MONTH (server must additionally read LIFETIME to fill the
 *                   horizon; MONTH is the coarsest rolling tier).
 */
export function granularityForWindowDays(days: number): MetricGranularity {
  if (days <= METRICS_RETENTION[MetricGranularity.DAY].retainFor) {
    return MetricGranularity.DAY;
  }
  if (days <= METRICS_RETENTION[MetricGranularity.WEEK].retainFor * 30) {
    return MetricGranularity.WEEK;
  }
  return MetricGranularity.MONTH;
}

/**
 * Whether a read window extends beyond the finest granularity's retention and
 * therefore must also read the LIFETIME row to cover the horizon.
 */
export function windowExceedsDayRetention(days: number): boolean {
  return days > METRICS_RETENTION[MetricGranularity.DAY].retainFor;
}

/** True when the given granularity is LIFETIME. */
export function isLifetime(granularity: MetricGranularity): boolean {
  return granularity === MetricGranularity.LIFETIME;
}
