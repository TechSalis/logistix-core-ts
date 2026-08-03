// Internal-only minute multipliers (NOT re-exported from index.ts).
export const FIVE_MINUTES_MS = 5 * 60_000;

export const FIFTEEN_MINUTES_MS = 15 * 60_000;

// 1 day in milliseconds (24 hours).
export const MS_PER_DAY = 24 * 60 * 60_000;

/**
 * Adds calendar days to a date, returning a new Date (input untouched).
 * Uses local-time setDate semantics so DST transitions stay calendar-correct
 * (unlike naive `ms + days * MS_PER_DAY` arithmetic).
 */
export function addDays(from: Date, days: number): Date {
  const result = new Date(from.getTime());
  result.setDate(result.getDate() + days);
  return result;
}
