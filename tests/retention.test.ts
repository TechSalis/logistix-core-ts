import { describe, it, expect } from 'vitest';
import { RETENTION_CONFIG } from '../src/shared/config/retention.config.js';

describe('RETENTION_CONFIG', () => {
  it('keeps individual account purge at 90 days', () => {
    expect(RETENTION_CONFIG.accountPurgeRetentionDays).toBe(90);
  });

  it('deactivates inactive companies after 90 days', () => {
    expect(RETENTION_CONFIG.companyPurgeRetentionDays).toBe(90);
  });

  it('purges deactivated companies after 30 days', () => {
    expect(RETENTION_CONFIG.lockedCompanyPurgeRetentionDays).toBe(30);
  });

  it('archives event logs at a fixed 12-month floor', () => {
    expect(RETENTION_CONFIG.eventLogRetentionMonths).toBe(12);
  });
});
