import { z } from 'zod';

/**
 * Data retention and purge configuration.
 *
 * Single source of truth shared across all projects (backend, workers, web).
 * Previously scattered in workers-only SCALING_CONFIG.
 */

export interface RetentionConfig {
  /**
   * Days after deactivation before individual accounts (riders/dispatchers)
   * are permanently purged from the system.
   */
  readonly accountPurgeRetentionDays: number;

  /**
   * Days of inactivity before a company is flagged for deactivation.
   * After this period, the company enters a locked state (deactivatedAt set).
   */
  readonly companyPurgeRetentionDays: number;

  /**
   * Days after deactivation before a company is permanently purged.
   * This covers both inactivity-triggered and user-initiated deactivations.
   */
  readonly lockedCompanyPurgeRetentionDays: number;

  /**
   * Fixed retention floor (months) for audit logs (event_logs).
   * event_logs is high-volume and only read recently (sync, admin monitoring),
   * so it is archived at a flat 12-month floor regardless of tier —
   * older than tier windows, and independent of DATA_RETENTION.
   */
  readonly eventLogRetentionMonths: number;

  /**
   * Fixed retention floor (months) for the company_daily_metrics rollup table.
   * Rows are tiny (one per company per day) and feed the live trend-analytics
   * chart, so they are pruned at a flat 12-month floor — same class as
   * event_logs, independent of DATA_RETENTION.
   */
  readonly dailyMetricsRetentionMonths: number;

  /**
   * Days after reaching a terminal status (COMPLETED/FAILED) before an
   * export_requests row is pruned. PENDING rows are never pruned here —
   * the export runner owns them.
   */
  readonly exportRequestRetentionDays: number;
}

const retentionConfigSchema = z.object({
  accountPurgeRetentionDays: z.number(),
  companyPurgeRetentionDays: z.number(),
  lockedCompanyPurgeRetentionDays: z.number(),
  eventLogRetentionMonths: z.number(),
  dailyMetricsRetentionMonths: z.number(),
  exportRequestRetentionDays: z.number(),
});

const rawRetentionConfig = {
  accountPurgeRetentionDays: 90,
  companyPurgeRetentionDays: 180,
  lockedCompanyPurgeRetentionDays: 30,
  eventLogRetentionMonths: 12,
  dailyMetricsRetentionMonths: 12,
  exportRequestRetentionDays: 30,
} as const;

// Runtime validation guard — keeps config in sync with schema
export const RETENTION_CONFIG: RetentionConfig = retentionConfigSchema.parse(rawRetentionConfig);
