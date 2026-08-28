// src/services/supabase.ts
import { createClient } from "@supabase/supabase-js";

// src/shared/utils/retry.ts
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var RETRYABLE_NETWORK_ERROR_CODES = /* @__PURE__ */ new Set([
  "ECONNRESET",
  "ETIMEDOUT",
  "EPIPE",
  "ECONNREFUSED",
  "ECONNABORTED",
  "EAI_AGAIN"
]);
async function withRetry(fn, options) {
  const maxRetries = options?.maxRetries ?? 2;
  const baseMs = options?.baseMs ?? 200;
  const maxDelayMs = options?.maxDelayMs ?? 5e3;
  const isRetryable = options?.isRetryable ?? isTransientHttpError;
  let lastError;
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
function classifyTransientError(err) {
  const status = err.status ?? err.response?.status ?? 0;
  const msg = (err.message ?? "").toLowerCase();
  const code = (err.code ?? "").toUpperCase();
  if (status >= 500 && status <= 599) return true;
  if (status === 429) return true;
  if (RETRYABLE_NETWORK_ERROR_CODES.has(code)) return true;
  if (code === "UND_ERR_CONNECT_TIMEOUT" || code === "UND_ERR_HEADERS_TIMEOUT") return true;
  if (msg.includes("etimedout") || msg.includes("econnrefused") || msg.includes("econnreset") || msg.includes("econnaborted") || msg.includes("eai_again") || msg.includes("timeout of"))
    return true;
  return false;
}
function hasTransientSignature(error, seen) {
  if (typeof error !== "object" || error === null) return false;
  if (seen.has(error)) return false;
  seen.add(error);
  const err = error;
  if (classifyTransientError(err)) return true;
  if (typeof err.cause === "object" && err.cause !== null) {
    return hasTransientSignature(err.cause, seen);
  }
  return false;
}
function isTransientHttpError(error) {
  return hasTransientSignature(error, /* @__PURE__ */ new Set());
}

// src/shared/utils/error-utils.ts
function extractErrorContext(error) {
  return {
    error: extractErrorMessage(error),
    stack: error instanceof Error ? error.stack : void 0
  };
}
function extractErrorMessage(error) {
  if (error instanceof Error) {
    const parts = [error.message];
    let cause = error.cause;
    let depth = 0;
    while (cause instanceof Error && depth < 3) {
      parts.push(`cause: ${cause.message}`);
      cause = cause.cause;
      depth++;
    }
    return parts.join(" | ");
  }
  if (typeof error === "string") return error;
  return String(error);
}

// src/shared/enums/enums.ts
var DayOfWeek = /* @__PURE__ */ ((DayOfWeek2) => {
  DayOfWeek2["MONDAY"] = "Monday";
  DayOfWeek2["TUESDAY"] = "Tuesday";
  DayOfWeek2["WEDNESDAY"] = "Wednesday";
  DayOfWeek2["THURSDAY"] = "Thursday";
  DayOfWeek2["FRIDAY"] = "Friday";
  DayOfWeek2["SATURDAY"] = "Saturday";
  DayOfWeek2["SUNDAY"] = "Sunday";
  return DayOfWeek2;
})(DayOfWeek || {});
var ALL_DAYS = Object.values(DayOfWeek);

// src/shared/config/retention.config.ts
import { z } from "zod";
var retentionConfigSchema = z.object({
  accountPurgeRetentionDays: z.number(),
  companyPurgeRetentionDays: z.number(),
  lockedCompanyPurgeRetentionDays: z.number(),
  eventLogRetentionMonths: z.number()
});
var rawRetentionConfig = {
  accountPurgeRetentionDays: 90,
  // Matches account purge — no reason to keep deactivated companies 2× longer
  companyPurgeRetentionDays: 90,
  lockedCompanyPurgeRetentionDays: 30,
  eventLogRetentionMonths: 12
};
var RETENTION_CONFIG = retentionConfigSchema.parse(rawRetentionConfig);

// src/shared/utils/time.ts
var FIVE_MINUTES_MS = 5 * 6e4;
var FIFTEEN_MINUTES_MS = 15 * 6e4;
var MS_PER_DAY = 24 * 60 * 6e4;

// src/shared/config/billing.config.ts
var DATA_RETENTION = {
  ["STARTER" /* STARTER */]: 1,
  ["PROFESSIONAL" /* PROFESSIONAL */]: 3
};
var CHANNEL_FEES = {
  ["SYSTEM_POOL" /* SYSTEM_POOL */]: 2e4,
  // ₦200 — covers network number + routing + AI
  ["MY_CHANNEL" /* MY_CHANNEL */]: 2e4
  // ₦200 — covers AI only
};
var DEDICATED_TIERS = ["PROFESSIONAL" /* PROFESSIONAL */];
var SUPPORT_SLA = {
  ["STARTER" /* STARTER */]: "Email (48hr SLA)",
  ["PROFESSIONAL" /* PROFESSIONAL */]: "Priority (4hr SLA)"
};
var BILLING_CONFIG = {
  /**
   * Currency to use across the system
   */
  CURRENCY: "NGN" /* NGN */,
  /**
   * Monthly subscription pricing (in Kobo — single currency unit)
   * ₦15,000 = 1_500_000 kobo, ₦30,000 = 3_000_000 kobo.
   */
  PRICING: {
    ["STARTER" /* STARTER */]: 15e5,
    // ₦15,000
    ["PROFESSIONAL" /* PROFESSIONAL */]: 3e6
    // ₦30,000
  },
  /**
   * Billing cycle in days
   */
  BILLING_CYCLE_DAYS: 30,
  /**
   * Days after PAST_DUE before company data is cancelled
   */
  PAST_DUE_CANCEL_DAYS: 14,
  /**
   * Days of free trial for new companies
   */
  TRIAL_DAYS: 14,
  /**
   * Days after CANCELLED before company data is purged
   * References RETENTION_CONFIG as single source of truth.
   */
  PURGE_AFTER_CANCELLED_DAYS: RETENTION_CONFIG.lockedCompanyPurgeRetentionDays,
  /**
   * Payment timeout for unconfirmed payment deliveries (in hours).
   * 10 minutes gives room for webhook delays without leaving users hanging.
   * The daily payment-reconciliation cron is the backstop for edge cases.
   */
  PAYMENT_TIMEOUT_HOURS: 1,
  /**
   * Cross-company pool fulfillment split (in Kobo). Applied at settlement when
   * a pool delivery was fulfilled by a different company's rider:
   * - platformFeeKobo is retained by the platform first,
   * - ownerShareKobo then goes to the delivery's owning company (skipped for
   *   system-owned deliveries, where the platform retains it implicitly),
   * - the fulfilling company receives the remainder.
   */
  POOL_SPLIT_KOBO: {
    platformFeeKobo: 1e4,
    // ₦100
    ownerShareKobo: 5e4
    // ₦500
  },
  /**
   * Number of days after purchase within which a refund may be requested.
   */
  REFUND_WINDOW_DAYS: 14,
  /**
   * Window (ms) within which fundWallet requests with the same company + amount
   * reuse a single PENDING reference so double-submits coalesce into one checkout.
   */
  FUND_IDEMPOTENCY_WINDOW_MS: 5 * 60 * 1e3,
  /**
   * HTTP timeout (ms) for Squad API calls.
   */
  SQUAD_HTTP_TIMEOUT: 3e4,
  /**
   * Retry configuration for failed payments.
   * Retries on specific days after failure (1, 3, 7 days).
   * MAX_ATTEMPTS = total payment attempts (1 initial + 1 retry per INTERVALS_DAYS entry).
   * If all attempts fail, moves to PAST_DUE. After PAST_DUE window, cancels.
   */
  PAYMENT_RETRY: {
    MAX_ATTEMPTS: 4,
    INTERVALS_DAYS: [1, 3, 7]
  }
};

// src/shared/config/limits.config.ts
var rawLimitsConfig = {
  maxBatchSize: 50,
  // Max actions executed per agent turn (system protection)
  dbBatchSize: 100,
  // Max rows per DB bulk operation for background/flush jobs (executeInBatches)
  userActionConcurrency: 10,
  // Chunk size for user-flow operations (chunkedPromiseAll) to avoid spiking DB connections
  externalApiConcurrency: 10,
  // Capped concurrency for external APIs like Google Maps to avoid rate limits
  maxQueryLimit: 100,
  // Fallback query limit for non-tier-aware services
  syncPageSize: 100,
  // Client sync page size served via clientConfig
  locationDeduplicationRadiusMeters: 200,
  // Drop duplicate location results within this range
  externalApiTimeoutMs: 1e4,
  // Default timeout for external requests (e.g. Maps API)
  maxRiderActiveDeliveries: 5,
  maxSearchQueryLength: 100,
  chunkSize: 100
};
var LIMITS_CONFIG = rawLimitsConfig;
var TIER_LIMITS = {
  ["STARTER" /* STARTER */]: {
    maxAIDeliveriesPerAction: 20,
    maxBulkDeliveries: 20,
    maxTrackingHistory: 50,
    retentionMonths: DATA_RETENTION["STARTER" /* STARTER */],
    maxDispatchers: 2,
    maxRiders: 20,
    maxDeliveriesPerMonth: 500,
    maxExportsPerDay: 2,
    maxExportsPerMonth: 10
  },
  ["PROFESSIONAL" /* PROFESSIONAL */]: {
    maxAIDeliveriesPerAction: 50,
    maxBulkDeliveries: 100,
    maxTrackingHistory: 100,
    retentionMonths: DATA_RETENTION["PROFESSIONAL" /* PROFESSIONAL */],
    maxDispatchers: 10,
    maxRiders: 100,
    maxDeliveriesPerMonth: 5e3,
    maxExportsPerDay: 5,
    maxExportsPerMonth: 30
  }
};

// src/services/supabase.ts
var SUPABASE_AUTH_RETRIES = 3;
function createSupabaseAdminClient(url, serviceKey) {
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}
async function deleteSupabaseUser(supabase, userId, log) {
  try {
    await withRetry(
      async () => {
        const result = await Promise.race([
          supabase.auth.admin.deleteUser(userId),
          new Promise(
            (_, reject) => setTimeout(
              () => reject(new Error("Supabase auth deleteUser timeout")),
              LIMITS_CONFIG.externalApiTimeoutMs
            )
          )
        ]);
        if (!result.error) return;
        const msg = result.error.message?.toLowerCase() ?? "";
        if (msg.includes("not found") || msg.includes("doesn't exist")) return;
        throw new Error(`Supabase auth error: ${result.error.message}`);
      },
      { maxRetries: SUPABASE_AUTH_RETRIES }
    );
    return true;
  } catch (error) {
    log?.("[SupabaseAuth] deleteUser failed after retries", {
      userId,
      ...extractErrorContext(error)
    });
    return false;
  }
}
export {
  createSupabaseAdminClient,
  deleteSupabaseUser
};
