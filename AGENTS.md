# Dev Setup

## TypeScript checks

```bash
cd logistix-backend && npx tsc --noEmit
cd logistix-workers && npx tsc --noEmit
```

## Package.json convention

Consumers (backend + workers) depend on `"logistix-core-ts": "github:TechSalis/logistix-core-ts#<sha>"` (a git pin). **`dist/` is a committed, required artifact** — consumers resolve via `main`/`types`/`exports` → `dist/*`, and a `github:` git-checkout runs **no** `prepack`/`prepare` build hook on install. So a fresh/pinned install is broken unless `dist/` is in the tree; every core-ts source change needs a **pin bump** to go live in production/CI.

Local dev only: setting `LOGISTIX_CORE_TS_SRC=/abs/path/to/core-ts` at install time makes the consumer's `postinstall` (`scripts/link-core-ts.mjs`) **symlink** `node_modules/logistix-core-ts` to that live checkout, so edits appear immediately without a pin bump. Deliberately a no-op unless the var is set AND `CI` is not truthy; production/CI always resolve the pinned committed copy.

**Do NOT switch to a workspace / `file:` dep / "generate dist in consumers" right now.** Those models only work here if all repos merge into a single GitHub monorepo (root npm workspace) OR every CI job checks out sibling repos to the same relative path — both are significant repo-layout changes. With separate GitHub repos + a git pin, committing `dist/` is the correct, simplest model. Revisit only if a monorepo consolidation lands.

## Checks

```bash
cd logistix-core-ts && npx tsc --noEmit && npm test
cd logistix-backend && npx tsc --noEmit
cd logistix-workers && npx tsc --noEmit
cd logistix-web && npm run check --prefix shared && npm run check --prefix admin && npm run check --prefix business && npm run check --prefix customer
```

## Progress

### Done (this session — Aug 29, 2026, admin/public schema split + packaging decision)
- **Admin GraphQL schema split from public** (`7278a91`) — admin is now a standalone, self-contained schema instead of a superset of public. `src/contracts/typeDefs/base.ts` declares **empty** `type Query`/`type Mutation` placeholders; `public.ts` (extend line 2 / line 56) and `admin.ts` (extend line 168 / line 247) both `extend` those roots. Result: `publicSchema = [base, public]` and `adminSchema = [base, admin]` are each independently valid, AND the combined `[base, public, admin]` is ONE valid SDL document for web codegen (no root collision). Backend (`9a58687e`) composes each endpoint from only its own root extensions (`sharedFieldResolvers` + `publicRootResolvers` / `adminSchemaResolvers`) — **zero public ops leak into admin** (verified: admin executable = 19 Query / 8 Mutation, fully standalone). Wire contract is **semantically unchanged** (proven: web `generated/index.ts` produced zero diff), so **no client code changes are needed** — web only refreshed its generated `shared/schema.graphql` (web `9550465`), Flutter needs nothing.
- **Root `dist/` rebuilt + committed (`4e10cd2`)** — full multi-entry `tsup` without `--clean` restored `NodeEnv`/`JobType`/`ChannelsUpdateType`/`ApprovalStatus`/`MessageStatus` to `dist/index.*` (a partial concurrent-agent build had dropped them, breaking all backend/workers resolution). Committed dist/ only (14 files; non-dist concurrent-agent source left uncommitted for them). `dist/contracts/*` committed in `7278a91`.
- **Packaging decision recorded (see `## Package.json convention`)** — committed `dist/` is required (git pin has no install build hook); do NOT move to workspace/`file:` until a monorepo consolidation. Standing `github:#<sha>` pin mode keeps working.
- **⚠️ PENDING PIN BUMP (release step):** the consumers currently pin `github:TechSalis/logistix-core-ts#547c639` — **before** the split (`7278a91`) and dist rebuild (`4e10cd2`). Production/CI resolving that pin still gets the pre-split schema + old dist. A pin bump to the new HEAD SHA is required to ship this work to staging/prod (per the release/`git log --oneline -1` convention).

### Done (this session — Aug 8, 2026, consistency campaign — Phase 1)
- **Plan `docs/superpowers/plans/2026-08-08-consistency-campaign.md` + `2026-08-08-phase-1-backend-workers-correctness.md`** — Tasks 1/4/6 DONE on branch `consistency-phase-1` (reviewed per SDD). Full ledger: `docs/superpowers/audit/phase-1-ledger.md`.
- **Task 1** — `EventType.LEDGER_ADJUSTED` added (migration `drizzle/0001_mature_luminals.sql` = single `ALTER TYPE ... ADD VALUE`, applied to dev DB; exact-member-set test `tests/enums.test.ts`); `processPaymentAllocation` idempotency guard (no-op on re-run, `payments.ts:150-162`); leftover fallback restricted to unpriced rows and flowed to the payer ledger (`payments.ts:209-227`).
- **Task 4 (metadata SSOT)** — `src/types/metadata.ts` is now the single source for metadata shapes, enforced by the contract test `tests/metadata.test.ts` (9 shapes, entry-point identity, exact field pins, JSON round-trip; compile-locked via `tsconfig.test.json` + `npm run test:typecheck`). 17 real writer fields back-filled (`cdcf008`): 9 TransactionMetadata, 3 ChatMessageMetadata, 4 DeliveryMetadata, `cacVerification` CompanyMetadata, `deactivatedReason` CompanyChannelMetadata.
- **Task 6 (dead code)** — dead `PollIntervalsConfig` removed (duplicate of `ClientConfig`); dead identical-branch FCM topic ternary collapsed (`fcm-sender.ts`); offset-at-noon UTC dedup (`monthStartInTimezone` now delegates to `getStartOfDayInTimezone`).
- **Cross-repo flags (Phase 2)**: workers `CacVerificationEvidence` consolidated to SSOT; workers `deactivated_reason` write flipped to SSOT camelCase `deactivatedReason` (was write-only — flipped in follow-up round); `previousRiderId` removed from `DeliveryMetadata` SSOT (was dead); `proofPromotionFailed` now READ by workers `cleanupR2Images` (skip flag — was a latent bug); Flutter reads `editedCount` vs backend `editCount` (tolerant reader, cosmetic naming divergence — app-side Phase 2).
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

### Done (this session — Aug 9, 2026, consistency cleanup — dispatcher SSE + CAC SSOT)
- **Dispatcher SSE removal** (`16ff390`) — `SseEventType.DISPATCHER` deleted from `src/enums/enums.ts` + its test assertion. No lingering references in README / AGENTS.md / docs / enum-catalog; the README `SseEventType` row was corrected to the real wire values (`connected, delivery, rider, message, initial, company, rider-location, typing`).
- **CAC evidence SSOT union** (`46af843`) — `CAC_EVIDENCE_STATUS` const + `CACEvidenceStatus` union + `CacVerificationEvidence` shape exported from the package entry; `CompanyMetadata.cacVerification` now typed by the SSOT shape. Wire values `FOUND/INACTIVE/NOT_FOUND/ERROR` verified against the workers CAC cron (`cac-verification.service.ts`) and the design spec `docs/superpowers/specs/2026-08-07-cac-verification-design.md`. Compile-locked by `tests/cac-evidence.test.ts` via `tsconfig.test.json`.
- **Audit consistency cleanup** (`33e808b`) — dead zero-consumer barrel exports (`GranularityRetention`/`MetricColumn`/`MetricDomainMapping`) removed; `classifyTransientError` + `isRetryableEmailError` now read the canonical `RETRYABLE_NETWORK_ERROR_CODES` (their inline copies silently diverged — `EPIPE` etc.); stale `VehicleType` comment in `src/drizzle/schema.ts` fixed.
- **Export integrity** — all 162 symbols imported by backend/workers/web resolve against the rebuilt `dist/index.d.ts`; `SystemConfig`/`EnumCatalog`/`EnumValue`/`DeliveryStatus` + every enum listed in AGENTS.md are exported. `src/enums/enum-catalog.ts` (13 keys) matches the backend `EnumCatalog` GraphQL typeDefs exactly.
- **Gate:** build clean (ESM/CJS/DTS); 27 files / 299 tests; `tsc --noEmit` + `test:typecheck` clean; lint + prettier clean.
