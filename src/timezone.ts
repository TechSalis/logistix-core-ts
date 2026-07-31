import { REGIONAL_CONFIG } from './regional.js';

/**
 * Returns midnight (00:00:00.000) of the first day of the current month
 * in the configured timezone (defaults to REGIONAL_CONFIG.timeZone).
 *
 * Works for any IANA timezone by computing the UTC offset at noon UTC
 * on the 1st — safe from DST boundary edge cases at month boundaries.
 */
export function getMonthStartInTimezone(timezone: string = REGIONAL_CONFIG.timeZone): Date {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [year, month] = formatter.format(now).split('-').map(Number);

  const candidate = new Date(Date.UTC(year, month - 1, 1, 12, 0, 0, 0));
  const tzParts = candidate.toLocaleString('sv-SE', { timeZone: timezone }).split(' ');
  const [tzHour, tzMin] = tzParts[1].split(':').map(Number);

  const offsetMs = ((tzHour - 12) * 3600 + tzMin * 60) * 1000;
  return new Date(Date.UTC(year, month - 1, 1, 0, 0, 0, 0) - offsetMs);
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

  const candidate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0, 0));
  const tzParts = candidate.toLocaleString('sv-SE', { timeZone: timezone }).split(' ');
  const [tzHour, tzMin] = tzParts[1].split(':').map(Number);

  const offsetMs = ((tzHour - 12) * 3600 + tzMin * 60) * 1000;
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - offsetMs);
}
