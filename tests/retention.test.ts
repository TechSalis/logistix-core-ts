import { describe, it, expect } from 'vitest';
import { RETENTION_CONFIG } from '../src/config/retention.config.js';

describe('RETENTION_CONFIG', () => {
  it('keeps individual account purge at 90 days', () => {
    expect(RETENTION_CONFIG.accountPurgeRetentionDays).toBe(90);
  });

  it('deactivates inactive companies after 180 days', () => {
    expect(RETENTION_CONFIG.companyPurgeRetentionDays).toBe(180);
  });

  it('purges deactivated companies after 30 days', () => {
    expect(RETENTION_CONFIG.lockedCompanyPurgeRetentionDays).toBe(30);
  });

  it('archives event logs at a fixed 12-month floor', () => {
    expect(RETENTION_CONFIG.eventLogRetentionMonths).toBe(12);
  });

  it('prunes daily metrics rollups at a fixed 12-month floor', () => {
    expect(RETENTION_CONFIG.dailyMetricsRetentionMonths).toBe(12);
  });

  it('prunes terminal export requests after 30 days', () => {
    expect(RETENTION_CONFIG.exportRequestRetentionDays).toBe(30);
  });
});
