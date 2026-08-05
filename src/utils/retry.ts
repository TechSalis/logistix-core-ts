export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface WithRetryOptions {
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
export async function withRetry<T>(
  fn: (attempt: number) => Promise<T>,
  options?: WithRetryOptions,
): Promise<T> {
  const maxRetries = options?.maxRetries ?? 2;
  const baseMs = options?.baseMs ?? 200;
  const maxDelayMs = options?.maxDelayMs ?? 5_000;
  const isRetryable = options?.isRetryable ?? isTransientHttpError;

  let lastError: unknown;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn(attempt);
    } catch (error) {
      lastError = error;
      if (attempt >= maxRetries) break;
      if (!isRetryable(error)) break;

      const jitter = Math.random() * 200;
      const delayMs = Math.min(baseMs * Math.pow(2, attempt - 1) + jitter, maxDelayMs);
      options?.onRetry?.({ attempt, maxRetries, error, delayMs });
      await sleep(delayMs);
    }
  }
  throw lastError;
}

interface TransientHttpErrorShape {
  status?: number;
  response?: { status?: number };
  code?: string;
  message?: string;
  cause?: unknown;
}

function classifyTransientError(err: TransientHttpErrorShape): boolean {
  const status = err.status ?? err.response?.status ?? 0;
  const msg = (err.message ?? '').toLowerCase();
  const code = (err.code ?? '').toUpperCase();
  if (status >= 500 && status <= 599) return true;
  if (status === 429) return true;
  if (
    code === 'ECONNRESET' ||
    code === 'ECONNREFUSED' ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNABORTED' ||
    code === 'EAI_AGAIN' ||
    code === 'UND_ERR_CONNECT_TIMEOUT' ||
    code === 'UND_ERR_HEADERS_TIMEOUT'
  )
    return true;
  if (
    msg.includes('etimedout') ||
    msg.includes('econnrefused') ||
    msg.includes('econnreset') ||
    msg.includes('econnaborted') ||
    msg.includes('eai_again') ||
    msg.includes('timeout of')
  )
    return true;
  return false;
}

function hasTransientSignature(error: unknown, seen: Set<object>): boolean {
  if (typeof error !== 'object' || error === null) return false;
  if (seen.has(error)) return false;
  seen.add(error);
  const err = error as TransientHttpErrorShape;
  if (classifyTransientError(err)) return true;
  if (typeof err.cause === 'object' && err.cause !== null) {
    return hasTransientSignature(err.cause, seen);
  }
  return false;
}

/**
 * Classifies an error as transient (retryable) from HTTP status codes, known
 * network/timeout error codes, and message substrings. Also unwraps
 * `error.cause` chains — real Node fetch failures surface as
 * `TypeError: fetch failed` with the transient code nested on `cause`.
 * Strict superset of top-level-only classification (cycle-safe).
 */
export function isTransientHttpError(error: unknown): boolean {
  return hasTransientSignature(error, new Set<object>());
}
