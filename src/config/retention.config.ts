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
   * Days of inactivity (no rider/dispatcher activity) before a company is
   * automatically deactivated. After deactivation, `lockedCompanyPurgeRetentionDays`
   * controls how long until permanent purge. Aligned with accountPurgeRetentionDays
   * so companies and individual accounts have comparable lifetimes.
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
}

const retentionConfigSchema = z.object({
  accountPurgeRetentionDays: z.number(),
  companyPurgeRetentionDays: z.number(),
  lockedCompanyPurgeRetentionDays: z.number(),
  eventLogRetentionMonths: z.number(),
});

const rawRetentionConfig = {
  accountPurgeRetentionDays: 90,
  // Matches account purge — no reason to keep deactivated companies 2× longer
  companyPurgeRetentionDays: 90,
  lockedCompanyPurgeRetentionDays: 30,
  eventLogRetentionMonths: 12,
} as const;

// Runtime validation guard — keeps config in sync with schema
export const RETENTION_CONFIG: RetentionConfig = retentionConfigSchema.parse(rawRetentionConfig);
