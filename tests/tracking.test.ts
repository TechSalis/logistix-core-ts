import { describe, it, expect } from 'vitest';
import {
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TRACKING_ID_LENGTH,
  TRACKING_ID_CHARS,
} from '../src/utils/tracking.js';

describe('tracking constants', () => {
  it('has correct prefix', () => {
    expect(TRACKING_ID_PREFIX).toBe('LGX-');
  });

  it('has correct suffix length', () => {
    expect(TRACKING_ID_SUFFIX_LENGTH).toBe(6);
  });

  it('computes total length correctly', () => {
    expect(TRACKING_ID_LENGTH).toBe(10);
  });

  it('has ambiguity-free charset', () => {
    expect(TRACKING_ID_CHARS).toBe('2-9A-HJ-NP-Z');
  });
});
