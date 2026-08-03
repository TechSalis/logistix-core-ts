import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRetentionCutoff, getStartOfDayInTimezone } from '../src/timezone.js';

afterEach(() => {
  vi.useRealTimers();
});

describe('getRetentionCutoff', () => {
  it('returns firstOfMonth(now) minus N months as midnight in the timezone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00Z'));
    const cutoff = getRetentionCutoff(3);
    // June 1 00:00 Lagos = May 31 23:00Z; minus 3 months = Mar 1 00:00 Lagos (leap year) = Feb 29 23:00Z
    expect(cutoff.toISOString()).toBe('2024-02-29T23:00:00.000Z');
  });

  it('returns firstOfMonth when N is 0', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-05T12:00:00Z'));
    // Jan 1 00:00 Lagos = Dec 31 23:00Z
    expect(getRetentionCutoff(0).toISOString()).toBe('2023-12-31T23:00:00.000Z');
  });

  it('anchors to month start (not day-of-month overflow)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-05-31T12:00:00Z'));
    // May 31 Lagos; firstOfMonth May 1 00:00 Lagos = Apr 30 23:00Z; minus 1 = Apr 1 00:00 Lagos
    const cutoff = getRetentionCutoff(1);
    expect(cutoff.toISOString()).toBe('2024-03-31T23:00:00.000Z');
  });
});

describe('getStartOfDayInTimezone', () => {
  it('returns midnight in the given timezone', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T00:30:00Z'));
    const start = getStartOfDayInTimezone('Africa/Lagos');
    // 00:30Z = 01:30 Lagos on the 15th → midnight of the 15th Lagos = 14th 23:00Z
    expect(start.toISOString()).toBe('2024-06-14T23:00:00.000Z');
  });
});
