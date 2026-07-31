import { describe, it, expect } from 'vitest';
import {
  MS_PER_MINUTE,
  MS_PER_HOUR,
  MS_PER_DAY,
  FIVE_MINUTES_MS,
  TEN_MINUTES_MS,
  FIFTEEN_MINUTES_MS,
} from '../src/time.js';

describe('time constants', () => {
  it('MS_PER_MINUTE is 60000', () => {
    expect(MS_PER_MINUTE).toBe(60_000);
  });

  it('MS_PER_HOUR is 3600000', () => {
    expect(MS_PER_HOUR).toBe(3_600_000);
  });

  it('MS_PER_DAY is 86400000', () => {
    expect(MS_PER_DAY).toBe(86_400_000);
  });

  it('FIVE_MINUTES_MS is 5 * MS_PER_MINUTE', () => {
    expect(FIVE_MINUTES_MS).toBe(5 * MS_PER_MINUTE);
  });

  it('TEN_MINUTES_MS is 10 * MS_PER_MINUTE', () => {
    expect(TEN_MINUTES_MS).toBe(10 * MS_PER_MINUTE);
  });

  it('FIFTEEN_MINUTES_MS is 15 * MS_PER_MINUTE', () => {
    expect(FIFTEEN_MINUTES_MS).toBe(15 * MS_PER_MINUTE);
  });
});
