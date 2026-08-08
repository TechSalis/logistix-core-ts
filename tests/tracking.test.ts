import { describe, it, expect } from 'vitest';
import {
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TRACKING_ID_LENGTH,
  TRACKING_ID_CHARS,
  TRACKING_ID_ALPHABET,
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

describe('TRACKING_ID_ALPHABET drift-guard', () => {
  const charsetRegex = new RegExp(`^[${TRACKING_ID_CHARS}]$`);
  const full = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  it('contains exactly the TRACKING_ID_CHARS set, no dupes', () => {
    const alphabetSet = new Set(TRACKING_ID_ALPHABET);
    expect(alphabetSet.size).toBe(TRACKING_ID_ALPHABET.length);
    for (const ch of alphabetSet) {
      expect(charsetRegex.test(ch)).toBe(true);
    }
    for (const ch of full) {
      if (charsetRegex.test(ch)) {
        expect(alphabetSet.has(ch)).toBe(true);
      }
    }
  });

  it('alphabet matches the canonical charset literal', () => {
    expect(TRACKING_ID_ALPHABET).toBe('23456789ABCDEFGHJKLMNPQRSTUVWXYZ');
  });
});
