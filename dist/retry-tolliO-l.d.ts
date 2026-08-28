declare function sleep(ms: number): Promise<void>;
/**
 * Canonical node-level transient network error codes, shared across
 * logistix-backend (postgres.js wrapper) and logistix-workers (pg/Hyperdrive
 * wrapper). These are OS/Node codes surfaced on the error (or its `cause`)
 * when a connection cannot be established or is dropped mid-query.
 */
declare const RETRYABLE_NETWORK_ERROR_CODES: Set<string>;
/**
 * Canonical PostgreSQL SQLSTATE codes for connection-class failures.
 * `08xxx` is the connection_exception class; 57P03 = cannot_connect_now;
 * 53300 = too_many_connections. Consumed by the workers pg wrapper, whose
 * driver reports protocol failures as SQLSTATE on `error.code`. The backend
 * postgres.js wrapper classifies node-level network codes instead
 * (`RETRYABLE_NETWORK_ERROR_CODES`) — the two driver layers legitimately
 * differ in the shape of the errors they surface.
 */
declare const RETRYABLE_SQLSTATE_CODES: Set<string>;
interface WithRetryOptions {
  maxRetries?: number;
  baseMs?: number;
  maxDelayMs?: number;
  label?: string;
  isRetryable?: (error: unknown) => boolean;
  onRetry?: (info: {
    attempt: number;
    maxRetries: number;
    error: unknown;
    delayMs: number;
  }) => void;
}
/**
 * Retries a function with exponential backoff + jitter.
 * Only retries on 5xx, 429 (rate limit), network errors, and timeouts.
 * Does NOT retry 4xx (client errors) or success responses.
 * Pass a custom `isRetryable` to change retry eligibility (e.g. always retry).
 */
declare function withRetry<T>(
  fn: (attempt: number) => Promise<T>,
  options?: WithRetryOptions,
): Promise<T>;
/**
 * Classifies an error as transient (retryable) from HTTP status codes, known
 * network/timeout error codes, and message substrings. Also unwraps
 * `error.cause` chains — real Node fetch failures surface as
 * `TypeError: fetch failed` with the transient code nested on `cause`.
 * Strict superset of top-level-only classification (cycle-safe).
 */
declare function isTransientHttpError(error: unknown): boolean;

export {
  RETRYABLE_NETWORK_ERROR_CODES as R,
  type WithRetryOptions as W,
  RETRYABLE_SQLSTATE_CODES as a,
  isTransientHttpError as i,
  sleep as s,
  withRetry as w,
};
