import { describe, it, expect } from 'vitest';
import { FIVE_MINUTES_MS, FIFTEEN_MINUTES_MS } from '../src/time.js';

describe('time constants', () => {
  it('FIVE_MINUTES_MS is 300000', () => {
    expect(FIVE_MINUTES_MS).toBe(5 * 60_000);
  });

  it('FIFTEEN_MINUTES_MS is 900000', () => {
    expect(FIFTEEN_MINUTES_MS).toBe(15 * 60_000);
  });
});
