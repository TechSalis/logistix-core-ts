import { BRAND } from '../config/brand.config.js';

/**
 * Tracking ID prefix for brand recognition and easy pattern matching.
 * Makes IDs trivially identifiable (e.g. LGX-A2B3C4), reducing AI
 * hallucination risk and false-positive guardrail matches.
 */
export const TRACKING_ID_PREFIX = BRAND.trackingPrefix;

/**
 * Length of the random suffix portion of a tracking ID (after the prefix).
 */
export const TRACKING_ID_SUFFIX_LENGTH = 6;

/**
 * Total tracking ID length including prefix.
 */
export const TRACKING_ID_LENGTH = TRACKING_ID_PREFIX.length + TRACKING_ID_SUFFIX_LENGTH;

/**
 * Ambiguity-free alphabet for tracking IDs.
 * Excludes 0, O, 1, I (visual confusion between these pairs).
 * @example `/[2-9A-HJ-NP-Z]{6}/`
 */
export const TRACKING_ID_CHARS = '2-9A-HJ-NP-Z';

/**
 * Expanded character set matching `TRACKING_ID_CHARS`, for random
 * generation (crypto.randomInt index selection). Kept in lockstep with
 * `TRACKING_ID_CHARS` by the drift-guard test.
 */
export const TRACKING_ID_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
