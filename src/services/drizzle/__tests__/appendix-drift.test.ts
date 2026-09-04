import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../../../../');
const APPENDIX_SQL = path.join(ROOT, 'sql', 'appendix.sql');
const ENUMS_PATH = path.join(ROOT, 'src/shared/enums/enums.ts');
const appendixSrc = fs.readFileSync(APPENDIX_SQL, 'utf-8');
const enumsSrc = fs.readFileSync(ENUMS_PATH, 'utf-8');

// ── Reason string values ──────────────────────────────────────────────────────
const REASON_STRINGS = ['past_due_notify', 'past_due_cancelled', 'cancelling_expired'] as const;

/**
 * Guard: sql/appendix.sql must contain all three billing notification
 * reason strings AND the billing_notifications pgmq queue definition.
 * These strings are the SQL→handler contract; drift breaks notifications.
 */
describe('sql/appendix.sql billing notification drift guard', () => {
  for (const reason of REASON_STRINGS) {
    it(`appendix contains reason string '${reason}'`, () => {
      expect(appendixSrc).toContain(`'${reason}'`);
    });
  }

  it('appendix defines the billing_notifications pgmq queue', () => {
    expect(appendixSrc).toMatch(/pgmq\.create\(.*billing_notifications/s);
  });
});

/**
 * Guard: the BILLING_NOTIFICATION_REASONS const in enums.ts must
 * contain all three reason strings — matching the SQL contract above.
 */
describe('enums.ts BILLING_NOTIFICATION_REASONS drift guard', () => {
  for (const reason of REASON_STRINGS) {
    it(`enums.ts BILLING_NOTIFICATION_REASONS contains '${reason}'`, () => {
      expect(enumsSrc).toContain(`'${reason}'`);
    });
  }

  it('BILLING_NOTIFICATION_REASONS is exported from enums.ts', () => {
    expect(enumsSrc).toMatch(/export const BILLING_NOTIFICATION_REASONS/);
  });

  it('BillingNotificationReason type is exported from enums.ts', () => {
    expect(enumsSrc).toMatch(/export type BillingNotificationReason/);
  });

  it('isBillingNotificationReason guard is exported from enums.ts', () => {
    expect(enumsSrc).toMatch(/export function isBillingNotificationReason/);
  });
});
