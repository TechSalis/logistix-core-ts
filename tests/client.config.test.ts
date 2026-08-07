import { describe, it, expect } from 'vitest';
import { CLIENT_CONFIG } from '../src/config/client.config.js';

describe('CLIENT_CONFIG', () => {
  it('defines a 60-minute normal poll interval', () => {
    expect(CLIENT_CONFIG.pollIntervals.normalMs).toBe(3_600_000);
  });

  it('defines a 15-minute degraded poll interval', () => {
    expect(CLIENT_CONFIG.pollIntervals.degradedMs).toBe(900_000);
  });

  it('normal is longer than degraded', () => {
    expect(CLIENT_CONFIG.pollIntervals.normalMs).toBeGreaterThan(
      CLIENT_CONFIG.pollIntervals.degradedMs,
    );
  });

  it('matches the business web sync cadence decision (60 min / 15 min)', () => {
    expect(CLIENT_CONFIG.pollIntervals.normalMs).toBe(60 * 60 * 1000);
    expect(CLIENT_CONFIG.pollIntervals.degradedMs).toBe(15 * 60 * 1000);
  });
});
