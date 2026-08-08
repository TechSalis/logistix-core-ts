import { REGIONAL_CONFIG } from '../config/regional.config.js';

/**
 * UTC offset (ms) of the given timezone at noon UTC on the given calendar day.
 * Noon UTC anchors away from DST boundary edge cases at midnight.
 */
function offsetAtNoonUtc(year: number, monthIndex: number, day: number, timezone: string): number {
  const candidate = new Date(Date.UTC(year, monthIndex, day, 12, 0, 0, 0));
  const tzParts = candidate.toLocaleString('sv-SE', { timeZone: timezone }).split(' ');
  const [tzHour, tzMin] = tzParts[1].split(':').map(Number);
  return ((tzHour - 12) * 3600 + tzMin * 60) * 1000;
}

/**
 * Midnight (00:00:00.000) of the given calendar month in the timezone.
 * The returned Date is a UTC instant whose wall-clock time is midnight on
 * the 1st in the target timezone — its UTC date may be the prior day.
 */
function monthStartInTimezone(year: number, monthIndex: number, timezone: string): Date {
  return new Date(
    Date.UTC(year, monthIndex, 1, 0, 0, 0, 0) - offsetAtNoonUtc(year, monthIndex, 1, timezone),
  );
}

/** Current calendar year + 0-based month index in the timezone. */
function currentYearMonthInTimezone(timezone: string): [number, number] {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
  });
  const [year, month] = formatter.format(now).split('-').map(Number);
  return [year, month - 1];
}

/**
 * Returns midnight (00:00:00.000) of the first day of the current month
 * in the configured timezone (defaults to REGIONAL_CONFIG.timeZone).
 *
 * Works for any IANA timezone by computing the UTC offset at noon UTC
 * on the 1st — safe from DST boundary edge cases at month boundaries.
 */
export function getMonthStartInTimezone(timezone: string = REGIONAL_CONFIG.timeZone): Date {
  const [year, monthIndex] = currentYearMonthInTimezone(timezone);
  return monthStartInTimezone(year, monthIndex, timezone);
}

/**
 * Returns midnight (00:00:00.000) of today in the configured timezone.
 * Safe from DST boundary edge cases.
 */
export function getStartOfDayInTimezone(timezone: string = REGIONAL_CONFIG.timeZone): Date {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [year, month, day] = formatter.format(now).split('-').map(Number);

  const offsetMs = offsetAtNoonUtc(year, month - 1, day, timezone);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - offsetMs);
}

/**
 * Returns the month-anchored retention cutoff: firstOfMonth(now) - N months,
 * as midnight on the 1st in the configured timezone.
 *
 * Uses explicit year/month arithmetic (never setUTCMonth on a shifted UTC
 * date, which overflows at month boundaries). Used for tier-based/fixed-floor
 * archival and in-app history clamping.
 */
export function getRetentionCutoff(
  retentionMonths: number,
  timezone: string = REGIONAL_CONFIG.timeZone,
): Date {
  const [year, monthIndex] = currentYearMonthInTimezone(timezone);
  const totalMonths = year * 12 + monthIndex - retentionMonths;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonthIndex = totalMonths - targetYear * 12;
  return monthStartInTimezone(targetYear, targetMonthIndex, timezone);
}
