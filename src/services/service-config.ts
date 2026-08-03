/**
 * Tunable runtime constants for core shared services.
 *
 * Previously scattered as inline literals inside each service; centralized here
 * so deployment tuning is a single-file change. Mirrors `LIMITS_CONFIG` (limits.ts).
 */

export const FCM_SERVICE_CONFIG = {
  // OAuth access tokens: valid for 1 hour, refreshed 5 minutes early.
  tokenLifetimeMs: 3_600_000,
  tokenBufferMs: 5 * 60_000,
  tokenExpirySeconds: 3600, // JWT `exp` claim in seconds
  // Max messages sent concurrently per batch (`sendBatch`).
  sendChunkSize: 10,
} as const;

export const QUEUE_SERVICE_CONFIG = {
  // Default drain bounds when a caller supplies no options.
  defaultDrainOptions: {
    timeBudgetMs: 12 * 60 * 1000,
    maxJobs: 200,
    batchSize: 5,
  } as const,
  // How often the drain loop prunes finished jobs from the queue table.
  pruneIntervalMs: 60 * 60 * 1000,
  // Exponential retry backoff bounds (base * 2^(retry-1), capped at max).
  retryBackoffBaseMs: 1_000,
  retryBackoffMaxMs: 60_000,
} as const;
