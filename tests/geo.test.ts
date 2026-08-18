import { describe, it, expect } from 'vitest';
import { haversineDistanceMeters } from '../src/utils/geo.js';

describe('haversineDistanceMeters', () => {
  it('same coordinates returns 0', () => {
    expect(haversineDistanceMeters(6.5244, 3.3792, 6.5244, 3.3792)).toBe(0);
  });

  it('Lagos to Abuja is approximately 534km (within 1%)', () => {
    const lagos = [6.5244, 3.3792];
    const abuja = [9.0579, 7.4951];
    const dist = haversineDistanceMeters(lagos[0], lagos[1], abuja[0], abuja[1]);
    expect(dist).toBeGreaterThan(530_000);
    expect(dist).toBeLessThan(540_000);
  });

  it('antipodal points are approximately half Earth circumference', () => {
    const dist = haversineDistanceMeters(0, 0, 0, 180);
    const halfCircumference = Math.PI * 6_371_000;
    expect(dist).toBeCloseTo(halfCircumference, -2);
  });

  it('same latitude different longitude computes correctly', () => {
    const dist = haversineDistanceMeters(0, 0, 0, 1);
    expect(dist).toBeGreaterThan(110_000);
    expect(dist).toBeLessThan(112_000);
  });
});
