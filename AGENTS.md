# Dev Setup

## TypeScript checks

```bash
cd logistix-backend && npx tsc --noEmit
cd logistix-workers && npx tsc --noEmit
```

## Package.json convention

Consumers use `"logistix-core-ts": "file:../logistix-core-ts"`. A `preinstall` script clones + installs + builds core-ts if not present (for Render deploys). CI checks it out explicitly for caching.

## Checks

```bash
cd logistix-core-ts && npx tsc --noEmit && npm test
cd logistix-backend && npx tsc --noEmit
cd logistix-workers && npx tsc --noEmit
cd logistix-web && npm run check --prefix shared && npm run check --prefix admin && npm run check --prefix business && npm run check --prefix customer
```

## Progress

### Done (this session — Aug 8, 2026, consistency campaign — Phase 1)
- **Plan `docs/superpowers/plans/2026-08-08-consistency-campaign.md` + `2026-08-08-phase-1-backend-workers-correctness.md`** — Tasks 1/4/6 DONE on branch `consistency-phase-1` (reviewed per SDD). Full ledger: `docs/superpowers/audit/phase-1-ledger.md`.
- **Task 1** — `EventType.LEDGER_ADJUSTED` added (migration `drizzle/0001_mature_luminals.sql` = single `ALTER TYPE ... ADD VALUE`, applied to dev DB; exact-member-set test `tests/enums.test.ts`); `processPaymentAllocation` idempotency guard (no-op on re-run, `payments.ts:150-162`); leftover fallback restricted to unpriced rows and flowed to the payer ledger (`payments.ts:209-227`).
- **Task 4 (metadata SSOT)** — `src/types/metadata.ts` is now the single source for metadata shapes, enforced by the contract test `tests/metadata.test.ts` (9 shapes, entry-point identity, exact field pins, JSON round-trip; compile-locked via `tsconfig.test.json` + `npm run test:typecheck`). 17 real writer fields back-filled (`cdcf008`): 9 TransactionMetadata, 3 ChatMessageMetadata, 4 DeliveryMetadata, `cacVerification` CompanyMetadata, `deactivatedReason` CompanyChannelMetadata.
- **Task 6 (dead code)** — dead `PollIntervalsConfig` removed (duplicate of `ClientConfig`); dead identical-branch FCM topic ternary collapsed (`fcm-sender.ts`); offset-at-noon UTC dedup (`monthStartInTimezone` now delegates to `getStartOfDayInTimezone`).
- **Cross-repo flags (Phase 2)**: workers `CacVerificationEvidence` consolidated to SSOT; workers writes snake_case `deactivated_reason` vs SSOT `deactivatedReason` (write-only, decision deferred); Flutter reads `editedCount` vs backend `editCount`; `proofPromotionFailed`/`previousRiderId` are write-only (zero readers).
- **Gates**: build clean (ESM/CJS/DTS); 25 files / 264 tests; `test:typecheck` clean; `drizzle-kit check` clean.

### Done (this session — Aug 7, 2026, consistency cleanup — Phase 3)
- **Task 1** — PUSH-BACK: `company_lifetime_metrics` is LIVE, not dead. Consumers: workers `daily-metrics.service.ts` (folds lifetime totals), backend `trend-analytics.service.ts` (LEFT JOIN) + `admin-analytics.service.ts` (SUM/channel_breakdown). Table/schema/relations/migrations untouched; README table list keeps it.
- **Task 2** — removed zero-consumer barrel re-exports from `src/index.ts`: `FCM_SERVICE_CONFIG`, `isTransientHttpError`, `computeAllocationTargets`, `AllocationDeliveryInput`, `AllocationTarget`, `SquadClientOptions`, `ChargeCardParams`, `ChargeCardResult`, `EmailAttachment`, `SendEmailOptions`, `DrainOptions`, `DrainResult`, `EnqueueOptions`, `EnqueueWithDedupeOptions`, `FcmMessage`, `FcmResponse`, `WorkingHoursEntry`, `LimitsConfig`, `RegionalConfig`, `RetentionConfig`, `SecurityConfig`, `ClientConfig`, `PollIntervalsConfig`, `RiderMetadata`, `CompanyMetadata`, `LedgerMetadata`. Kept: `QUEUE_SERVICE_CONFIG` (workers orchestrator), `TierLimits` (backend AI handlers), tracking constants (Task 3 SSOT). All removed symbols stay exported from their defining modules.
- **Task 3** — tracking alphabet SSOT: added `TRACKING_ID_ALPHABET` (expanded charset) to `src/utils/tracking.ts`; backend `generateTrackingId` consumes it instead of its hardcoded copy. Drift-guard test in `tests/tracking.test.ts` pins `TRACKING_ID_ALPHABET` ↔ `TRACKING_ID_CHARS`.
- **Task 4** — transient-error SSOT: added `RETRYABLE_NETWORK_ERROR_CODES` (node-level) + `RETRYABLE_SQLSTATE_CODES` (pg connection-class) to `src/utils/retry.ts`. Backend `drizzle.ts` and workers `database.client.ts` classify via these (documented driver-layer divergence). Backoff base unified: workers `SCALING_CONFIG.retryBackoffBaseMs` reads `QUEUE_SERVICE_CONFIG.retryBackoffBaseMs` (core-ts is SSOT).
- **Task 5** — split the same-line doc comment + `async failPermanent(` in `src/services/queue.service.ts` (lint noise).
- **Task 6** — corrected stale README: removed nonexistent exports (`isDeliveryTerminal`, `NotificationEventType`, `NotificationPriority`, `ComponentStatus`, `UpdateReason`, `getNextRetryDate`, `AI_CONFIG`, `DEFAULT_PRICING_SCHEMES`, `computeAllocationTargets`), private methods (`dequeue`, `retryStalled`), wrong pgEnum names (`adminRoleEnum`/`dispatcherRoleEnum`), stale enum-value tables, and the table list (added `subscriptionTransactions`, `eventOutbox`; kept `companyLifetimeMetrics`).
- **Gate:** core-ts build + tsc clean, 24 files / 258 tests; backend + workers tsc clean, workers 25 files / 316 tests; web shared/admin/business/customer svelte-check 0 errors.

### Done (this session — Aug 8, 2026, schema/migration/index audit — Phase 4)
- **Migration chain ≡ schema (proven).** Live dev DB (supabase local:54322) reconciled via `reconcile_live.sql` (2 backups in `/var/folders/.../T/opencode/drizzle-sync-check/`). `drizzle-kit check` passes.
- **Fixed stale journal snapshots by folding.** `meta/0004_snapshot.json` (and earlier snapshots) still described the OLD `company_channels` shape while the committed migrations had the new one, so every `drizzle-kit generate` hit a TTY column-conflict prompt. Replaced `0000_initial.sql` + `0001`–`0004` + all 5 snapshots with a fresh `0000_initial.sql` + `0000_snapshot.json` + `_journal.json` generated from schema.ts. `drizzle-kit generate` on unchanged schema is now a no-op; `migrate.ts` seeds squashed journals on existing DBs.
- **8 hot-path indexes** added to `schema.ts` and applied to the live DB: `dispatchers_company_id_created_at_idx`, `deliveries_rider_id_updated_at_idx`, `deliveries_created_at_idx`, `riders_approval_status_idx`, `event_logs_created_at_idx`, `messages_created_at_idx`, `conversations_last_message_at_idx`, `company_settings_subscription_status_idx`. Live index inventory now byte-identical to schema (verified via snapshot-vs-`pg_indexes` diff). Known residual (pre-existing, deliberately not applied): `clm_company_idx` `UNIQUE NULLS NOT DISTINCT` introspection gap.
- **Backend fixes:** `admin-company.service.ts` `ANY(companyIds)` row-constructor → `ANY(ARRAY[${sql.join(...)}])`; `rate-limiting.service.ts` raw `Date` in sql param → `.toISOString()`; integration fixtures for pool-delivery assertion + oauth orphan cleanup; unit mocks gained `sql.join` (drizzle-orm mock) and fixtures `'PAID'` → `PaymentStatus.COMPLETED` (canonical).
- **Workers fixes:** `delivery-payment.service.ts` cancel UPDATE now strips `metadata->>'paymentStatus'` (cancelled rows were re-selected forever → duplicate `CANCELLED_PAYMENT_TIMEOUT` event_logs); `archival.service.ts` `cleanupR2Images` now reads `r.metadata.proofOfDeliveryImagePath` (column did not exist).
- **Live data repair:** 3 `company_lifetime_metrics.channel_breakdown` rows double-encoded as strings → jsonb.
- **Gate:** backend tsc clean + 2210 unit + 154 Postgres integration; workers tsc clean + 317; core-ts tsc clean. Deploy order: backend sync branches first.
