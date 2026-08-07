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
  // Shared neutral defaults. Backend drains (long-lived poll loops) are bounded
  // by maxJobs + the poll tick — no wall-clock budget is needed there. Worker
  // cron drains MUST pass an explicit timeBudgetMs (SCALING_CONFIG.cronTimeBudgetMs)
  // so an invocation returns within the Cloudflare cron window.
  batchSize: 5,
  defaultMaxRetries: 3, // total attempts; the first attempt counts
  // How often the drain loop prunes finished jobs from the queue table.
  pruneIntervalMs: 60 * 60 * 1000,
  // Terminal rows older than this are deleted by the prune pass.
  pruneTerminalAfterMs: 24 * 60 * 60 * 1000,
  // PROCESSING jobs with started_at older than this are reset to PENDING.
  retryStalledAfterMs: 30_000,
  // Exponential retry backoff bounds (base * 2^(retry-1), capped at max).
  retryBackoffBaseMs: 1_000,
  retryBackoffMaxMs: 60_000,
} as const;
