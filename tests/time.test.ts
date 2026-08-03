import { describe, it, expect } from 'vitest';
import { addDays, FIVE_MINUTES_MS, FIFTEEN_MINUTES_MS } from '../src/time.js';

describe('time constants', () => {
  it('FIVE_MINUTES_MS is 300000', () => {
    expect(FIVE_MINUTES_MS).toBe(5 * 60_000);
  });

  it('FIFTEEN_MINUTES_MS is 900000', () => {
    expect(FIFTEEN_MINUTES_MS).toBe(15 * 60_000);
  });
});

describe('addDays', () => {
  it('adds calendar days and returns a new Date', () => {
    const from = new Date('2024-01-15T10:00:00.000Z');
    const result = addDays(from, 30);
    expect(result.toISOString()).toBe('2024-02-14T10:00:00.000Z');
    expect(from.toISOString()).toBe('2024-01-15T10:00:00.000Z');
  });

  it('handles month boundaries', () => {
    expect(addDays(new Date('2024-01-31T00:00:00.000Z'), 1).toISOString()).toBe(
      '2024-02-01T00:00:00.000Z',
    );
  });

  it('supports negative days', () => {
    expect(addDays(new Date('2024-03-01T00:00:00.000Z'), -1).toISOString()).toBe(
      '2024-02-29T00:00:00.000Z',
    );
  });
});
