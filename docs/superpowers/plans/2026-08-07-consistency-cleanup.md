# Core-ts Consistency Cleanup (Phase 3)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Drop the dead `company_lifetime_metrics` table, remove zero-consumer barrel exports, fix duplicated SSOTs (tracking alphabet, transient-error classification, retry backoff base), and correct the stale README. Part of the cross-repo consistency program (sibling plans: backend, workers, web, app).

**Tech Stack:** TypeScript, drizzle-orm, drizzle-kit, tsup, vitest.

## Global Constraints

- ~~The in-flight `queue.service.ts` snake_case→camelCase dequeue fix + its test are uncommitted and must be preserved verbatim.~~ Resolved during this phase: landed as commit `beb0bfc` (Aldo's fix, includes in-flight dequeue column-mapping fix). No uncommitted queue.service changes.
- Do not rename pgEnum types or DB columns (would break consumers). Type/column drift (`creatorPlatform`, `handledByType`, `job_queue.type`, money precision) is deferred to Phase 8.
- Gate: `npm run build`, `npx tsc --noEmit`, full vitest suite.

---

## Task 1: Drop dead `company_lifetime_metrics` table

> **PUSH-BACK (Step 1 gate failed) — task SKIPPED. The table is LIVE, not dead.**

Step 1 audit found live consumers repo-wide:

- `logistix-workers/src/cron/services/daily-metrics.service.ts` (241, 248, 278, 327, 339) — folds daily metrics into lifetime totals via INSERT/SELECT
- `logistix-backend/src/modules/intelligence/analytics/services/trend-analytics.service.ts` (160, 173) — `LEFT JOIN company_lifetime_metrics clm`
- `logistix-backend/src/modules/platform/admin/services/admin-analytics.service.ts` (54, 59, 69) — `SUM` + `channel_breakdown`

Dropping the table would break production analytics. `companyLifetimeMetrics` (camelCase) appears only in `schema.ts:963`; the SQL-level table is the live consumer. No changes made to schema, relations, or migrations. (Task 6 Step 4 will NOT remove it from the README table list.)

- [x] **Step 1:** Confirm zero consumers repo-wide. (Audit performed; premise FAILED — see push-back above.)
- [ ] **Step 2:** Delete the table definition + its relations entry. *(skipped)*
- [ ] **Step 3:** Rebase the migration chain. *(skipped)*
- [ ] **Step 4:** Update README table list. *(skipped)*
- [ ] **Step 5:** Build + tsc + tests green. *(n/a — no code change)*

## Task 2: Remove zero-consumer barrel exports

**Files:**
- `src/index.ts`
- consumers (verify before removing)

- [x] **Step 1:** For each candidate, `rg` all repos to confirm zero external consumers.

  Audit result (backend/src + workers/src + web `shared|admin|business|customer`):
  - **KEPT — live barrel consumers:** `QUEUE_SERVICE_CONFIG` (workers `cron/orchestrator.ts`), `TierLimits` (backend AI delivery-booking handlers ×2). `TRACKING_ID_CHARS`/`TRACKING_ID_LENGTH` re-exported live in Task 3 (they ARE the SSOT; backend currently copies locally).
  - **REMOVED — zero external consumers:** `FCM_SERVICE_CONFIG`, `isTransientHttpError`, `computeAllocationTargets`, `AllocationDeliveryInput`, `AllocationTarget`, `SquadClientOptions`, `ChargeCardParams`, `ChargeCardResult`, `EmailAttachment`, `SendEmailOptions`, `DrainOptions`, `DrainResult`, `EnqueueOptions`, `EnqueueWithDedupeOptions`, `FcmMessage`, `FcmResponse`, `WorkingHoursEntry`, `LimitsConfig`, `RegionalConfig`, `RetentionConfig`, `SecurityConfig`, `ClientConfig`, `PollIntervalsConfig`, `RiderMetadata`, `CompanyMetadata`, `LedgerMetadata`.
  - **No-op — not in core-ts at all:** `WorkingHourEntry` (no such symbol in `src/`; nothing to remove).
  - `PollIntervalsConfig` backend/web hits are LOCAL shadow definitions (`client-rules.service.ts`, web `runtime-config.svelte.ts`), not barrel consumers.
- [x] **Step 2:** Remove only the barrel re-exports confirmed dead. Kept symbols exported from their defining modules for internal use (`FCM_SERVICE_CONFIG` → `config/service.config.ts`, `isTransientHttpError` → `utils/retry.ts`, `computeAllocationTargets` → `config/billing.config.ts`, `WorkingHoursEntry` → `config/system.config.ts`). No core-ts source imports from the barrel, so no internal breakage.
- [x] **Step 3:** Build + tsc + tests green. (`tsc --noEmit` clean; tsup build OK; vitest 24 files / 256 tests pass.)

## Task 3: Fix duplicated tracking-ID alphabet

**Files:**
- `src/utils/tracking.ts` (16, 23) — `TRACKING_ID_LENGTH`, `TRACKING_ID_CHARS`
- `logistix-backend/src/modules/operations/deliveries/utils/tracking.ts` (23)

- [x] **Step 1:** Re-export/restore `TRACKING_ID_CHARS` + `TRACKING_ID_LENGTH` from `index.ts` (they ARE the SSOT). Already present in barrel; backend `tracking.test.ts` already imports them from core-ts. Added `TRACKING_ID_ALPHABET` (expanded charset for `crypto.randomInt` selection) + barrel export.
- [x] **Step 2:** Update the backend to import `TRACKING_ID_ALPHABET` from core-ts instead of its hardcoded copy; delete the backend local alphabet literal.
- [x] **Step 3:** Add a drift-guard test in core-ts asserting the exported alphabet constant equals the canonical set. (`tests/tracking.test.ts` — charset-regex round-trip: no dupes, every alphabet char in `TRACKING_ID_CHARS`, every class member present; plus literal lock.)
- [x] **Step 4:** Core-ts + backend gates green. (core-ts 24 files / 258 tests; backend tsc clean + `tracking.test.ts` 3 tests pass.)

## Task 4: Consolidate transient-error classification + retry backoff SSOT

**Files:**
- `src/utils/retry.ts` — `isTransientHttpError` (107)
- `logistix-backend/src/core/db/drizzle.ts` (87-108) — `RETRYABLE_ERROR_CODES` + own `withRetry`
- `logistix-workers/src/cron/core/database.client.ts` (171-185) — `isTransientError`

- [x] **Step 1:** Shared classification tables added to core-ts `src/utils/retry.ts` + barrel-exported: `RETRYABLE_NETWORK_ERROR_CODES` (node-level: ECONNRESET/ETIMEDOUT/EPIPE/ECONNREFUSED/ECONNABORTED/EAI_AGAIN) and `RETRYABLE_SQLSTATE_CODES` (pg connection-class: 08000/08003/08006/57P03/53300). Backend `drizzle.ts` now classifies via `RETRYABLE_NETWORK_ERROR_CODES` (dropped its local const; set is a strict superset of the old 4 — adds ECONNABORTED/EAI_AGAIN retries, both legitimate transient network codes postgres.js can surface via `cause`). Workers `database.client.ts` classifies via `RETRYABLE_SQLSTATE_CODES` (identical 5 codes → zero behavior change), keeps message-substring fallback for ECONNREFUSED/ETIMEDOUT (pg may not expose node codes as `.code`). Note: workers `core/utils/retry.ts` already delegates to core-ts `withRetry` (prior phase).
- [x] **Step 2:** Driver layers legitimately differ (SQLSTATE vs node codes) — distinction documented in code comments at both call sites + core-ts. Backoff base unified: workers `SCALING_CONFIG.retryBackoffBaseMs` now reads `QUEUE_SERVICE_CONFIG.retryBackoffBaseMs` (both were 1000; core-ts is now the SSOT). Backend has no retry backoff base (its DB wrapper retries immediately, no sleep).
- [x] **Step 3:** Gates green across core-ts, backend, workers. (core-ts 24/258, workers 25/316; backend + workers tsc clean.)

## Task 5: Fix `queue.service.ts` doc-comment lint noise

**Files:**
- `src/services/queue.service.ts` (240)

- [x] **Step 1:** Split the doc comment + `async failPermanent(` onto separate lines. Verified no other same-line `*/ signature` patterns remain in the file. tsc clean + `queue.service.test.ts` 13 tests pass.

## Task 6: Correct stale README

**Files:**
- `README.md`

- [x] **Step 1:** Remove documented-but-nonexistent exports: `isDeliveryTerminal`, `NotificationEventType`, `NotificationPriority`, `ComponentStatus`, `UpdateReason`, `getNextRetryDate`, `AI_CONFIG` (whole AI section), `DEFAULT_PRICING_SCHEMES` (whole Pricing section), plus `computeAllocationTargets` row (removed from barrel in Task 2). All verified 0 hits in `src/` (DEFAULT_PRICING_SCHEMES only appears in a schema.ts comment).
- [x] **Step 2:** Remove private methods from the documented API (`dequeue()`, `retryStalled()`) — both are `private` in `queue.service.ts` (131, 178).
- [x] **Step 3:** Fix wrong pgEnum names (`adminRole` → `adminRoleEnum`, `dispatcherRole` → `dispatcherRoleEnum`; confirmed at `schema.ts:91-92`) and stale enum-value tables: `UserRole` (ADMIN/DISPATCHER/RIDER), `DeliveryStatus` (+FAILED, no AWAITING_PAYMENT), `PaymentMethod` (PAY_ON_DELIVERY not POD), `VehicleType` (BIKE only), `SubscriptionTier` (STARTER/PROFESSIONAL), `ChannelPlatform` (WHATSAPP/INSTAGRAM/FACEBOOK/TIKTOK). Also corrected type annotations for barrel-removed types (`RegionalConfig`/`LimitsConfig`/`SecurityConfig` → `object`) and added `TRACKING_ID_ALPHABET` row.
- [x] **Step 4:** Update table list: added `subscriptionTransactions`, `eventOutbox`. `companyLifetimeMetrics` KEPT (Task 1 push-back — table is live). List now matches all 19 pgTable exports exactly.

## Task 7: Verify + record

- [x] **Step 1:** Full gates: core-ts `npm run build` + `npx tsc --noEmit` + full suite (24 files / 258 tests) green; backend `tsc --noEmit` clean; workers `tsc --noEmit` clean + 25 files / 316 tests; web `svelte-check` 0 errors across shared/admin/business/customer.
- [x] **Step 2:** Update `AGENTS.md` Progress section (added Phase 3 record + cross-repo Checks block).
