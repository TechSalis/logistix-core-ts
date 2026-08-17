import { describe, it, expect } from 'vitest';
import {
  METRICS_RETENTION,
  METRICS_FOLD_CHAIN,
  METRIC_DOMAIN_MAPPINGS,
  LIFETIME_BUCKET_START,
  granularityForWindowDays,
} from '../src/config/metrics.config.js';
import { MetricDomain, MetricGranularity } from '../src/enums/enums.js';

describe('METRICS_RETENTION', () => {
  it('defines the four-tier compression ladder', () => {
    expect(Object.keys(METRICS_RETENTION).sort()).toEqual(
      ['DAY', 'WEEK', 'MONTH', 'LIFETIME'].sort(),
    );
  });

  it('DAY is retained 90 days and folds into WEEK', () => {
    const day = METRICS_RETENTION[MetricGranularity.DAY];
    expect(day.retainFor).toBe(90);
    expect(day.unit).toBe('days');
    expect(day.foldTo).toBe(MetricGranularity.WEEK);
  });

  it('WEEK is retained 12 months and folds into MONTH', () => {
    const week = METRICS_RETENTION[MetricGranularity.WEEK];
    expect(week.retainFor).toBe(12);
    expect(week.unit).toBe('months');
    expect(week.foldTo).toBe(MetricGranularity.MONTH);
  });

  it('MONTH is retained 5 years and folds into LIFETIME', () => {
    const month = METRICS_RETENTION[MetricGranularity.MONTH];
    expect(month.retainFor).toBe(60);
    expect(month.unit).toBe('months');
    expect(month.foldTo).toBe(MetricGranularity.LIFETIME);
  });

  it('LIFETIME is terminal (kept forever, folds nowhere)', () => {
    const lifetime = METRICS_RETENTION[MetricGranularity.LIFETIME];
    expect(lifetime.foldTo).toBeNull();
    expect(lifetime.retainFor).toBe(Number.POSITIVE_INFINITY);
  });
});

describe('METRICS_FOLD_CHAIN', () => {
  it('orders finest -> coarsest', () => {
    expect(METRICS_FOLD_CHAIN).toEqual([
      MetricGranularity.DAY,
      MetricGranularity.WEEK,
      MetricGranularity.MONTH,
    ]);
  });
});

describe('METRIC_DOMAIN_MAPPINGS', () => {
  it('maps every domain exactly once', () => {
    const domains = METRIC_DOMAIN_MAPPINGS.map((m) => m.domain);
    expect(new Set(domains).size).toBe(domains.length);
    expect(domains).toEqual(
      expect.arrayContaining([
        MetricDomain.DELIVERIES,
        MetricDomain.CONVERSATIONS,
        MetricDomain.RIDERS,
        MetricDomain.REVENUE,
      ]),
    );
  });

  it('DELIVERIES uses the full delivery-specific column set', () => {
    const deliveries = METRIC_DOMAIN_MAPPINGS.find((m) => m.domain === MetricDomain.DELIVERIES)!;
    expect(deliveries.columns).toContain('totalCount');
    expect(deliveries.columns).toContain('avgDeliveryTimeMinutes');
    expect(deliveries.columns).toContain('peakHour');
    expect(deliveries.columns).toContain('uniqueRidersActive');
    expect(deliveries.columns).toContain('totalRevenueKobo');
  });

  it('non-delivery domains declare their extra metric keys', () => {
    const conversations = METRIC_DOMAIN_MAPPINGS.find(
      (m) => m.domain === MetricDomain.CONVERSATIONS,
    )!;
    expect(conversations.extraMetricKeys).toContain('messagesReceived');
    const riders = METRIC_DOMAIN_MAPPINGS.find((m) => m.domain === MetricDomain.RIDERS)!;
    expect(riders.extraMetricKeys).toContain('approvedCount');
    const revenue = METRIC_DOMAIN_MAPPINGS.find((m) => m.domain === MetricDomain.REVENUE)!;
    expect(revenue.extraMetricKeys).toContain('refundedKobo');
  });
});

describe('LIFETIME_BUCKET_START', () => {
  it('is the sentinel date', () => {
    expect(LIFETIME_BUCKET_START).toBe('1970-01-01');
  });
});

describe('granularityForWindowDays', () => {
  it('returns DAY within the 90-day window', () => {
    expect(granularityForWindowDays(1)).toBe(MetricGranularity.DAY);
    expect(granularityForWindowDays(90)).toBe(MetricGranularity.DAY);
  });

  it('returns WEEK between 90 days and 12 months (360d)', () => {
    expect(granularityForWindowDays(91)).toBe(MetricGranularity.WEEK);
    expect(granularityForWindowDays(360)).toBe(MetricGranularity.WEEK);
  });

  it('returns MONTH beyond 12 months', () => {
    expect(granularityForWindowDays(361)).toBe(MetricGranularity.MONTH);
    expect(granularityForWindowDays(5000)).toBe(MetricGranularity.MONTH);
  });
});
