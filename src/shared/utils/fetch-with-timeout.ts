/**
 * Lightweight fetch wrapper with request timeout support.
 * Compatible with both Node.js (≥18) and browser environments.
 */

import { LIMITS_CONFIG } from '../config/limits.config.js';

/** Default fallback timeout, sourced from `LIMITS_CONFIG.externalApiTimeoutMs`. */
export const DEFAULT_TIMEOUT_MS = LIMITS_CONFIG.externalApiTimeoutMs;

interface FetchWithTimeoutOptions extends Omit<RequestInit, 'signal'> {
  /** Timeout in milliseconds. Defaults to `LIMITS_CONFIG.externalApiTimeoutMs`. */
  timeoutMs?: number;
  /** Custom fetch implementation (useful for testing). */
  fetch?: typeof globalThis.fetch;
}

export async function fetchWithTimeout(
  url: string | URL | Request,
  options: FetchWithTimeoutOptions = {},
): Promise<Response> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, fetch: fetchFn = globalThis.fetch, ...rest } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  if (typeof timer === 'object' && typeof timer.unref === 'function') timer.unref();

  try {
    const res = await fetchFn(url, { ...rest, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}
