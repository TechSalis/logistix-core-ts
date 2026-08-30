# logistix-core-ts — Engineering Philosophy

The canonical design principles for `logistix-core-ts`: the shared library that is the **single source of truth (SSOT)** for every cross-repo contract in Logistix. Backend, workers, web, and the Flutter app all consume this package. Every file in this repository is judged against this document. core-ts is not a "helpers grab-bag" — it is the **contract layer**: if a value, shape, enum, or rule spans more than one consumer repo, its canonical home is here, and it lives nowhere else.

> **Status:** Living document. Amended as audits proceed. The mirror audience-side philosophy docs are backend `logistix-backend/docs/superpowers/philosophy.md`, workers `logistix-workers/docs/superpowers/philosophy.md`, web `logistix-web/docs/superpowers/philosophy.md`, app `logistix-app/docs/superpowers/philosophy.md`.

---

## 1. One Canonical Philosophy

Minimal complexity and stress under runtime load, while keeping the codebase clean and readable. Hierarchy of concern:

1. **Correctness** — the runtime behavior must be right (non-negotiable).
2. **Runtime efficiency** — avoid waste: redundant provisioning, unbounded sets, N+1 in helper services that ship to consumers.
3. **Consistency** — one author. Same pattern for the same problem, everywhere.
4. **Clarity** — easy to read; SSOTs; no duplication.

---

## 2. core-ts Is the Contract Layer

- **Enums** are the full catalog (`src/enums/enums.ts`) whose member strings ARE the wire/DB values (`TransactionStatus.SUCCESS = 'SUCCESS'`). The DB-backed subset exists as `pgEnum`s in `src/drizzle/schema.ts`. Do NOT define new wire enums inline in backend/workers/web/Flutter — they live here.
- **Configs** (`src/config/*`) are the SSOT for every runtime value that spans a boundary (`LIMITS_CONFIG.externalApiTimeoutMs`, `SQUAD_HTTP_TIMEOUT`, `REGIONAL_CONFIG.timeZone`, `BRAND_CONFIG`, `SECURITY_CONFIG`, `QUEUE_SERVICE_CONFIG`, `CLIENT_CONFIG`…). Consumers import; never re-read `process.env`.
- **Metadata shapes** route through `buildMetadata(scope, entries)` / `validateMetadata(scope, value)` against the `METADATA_KEYS` registry (`src/shared/types/metadata.ts`). Never hand-spread divergent inline JSONB shapes in consumers.
- **Tracking / identity schemes** (tracking alphabet, ID prefixes) — one SSOT (`TRACKING_ID_ALPHABET`, `TRACKING_ID_PREFIX`), pin-tested so a consumer can't silently fork.

**Rule:** if a backend/worker/web/app file needs a value that another repo also needs, the value belongs here. A local re-declaration in a consumer is drift and is fixed by importing from core-ts.

---

## 3. Zero Drift, Proveable

- **`src/drizzle/schema.ts` is authoritative.** Migration chain must ≡ schema (verified by `drizzle-kit check` and the squash-to-`0000_initial.sql` single-migration convention). When schema changes: update schema.ts + regenerate/rebase `0000_initial.sql` + snapshot; apply to local dev DB; never leave `drizzle-kit generate` TTY-prompting.
- **`dist/` is a committed, required artifact** (git-pin install runs no build hook). Every exported-symbol change therefore also rebuilds + commits `dist/`; a source change without a pin-bump is not "live."
- **Export integrity is enforced**: symbols imported by backend/workers/web must resolve against the rebuilt `dist/index.d.ts`; barrel re-exports are audited (zero consumers → removed from the barrel; the symbol stays in its defining module).
- **Contract tests compile-lock shapes** (`tsconfig.test.json` + `npm run test:typecheck`; `tests/metadata.test.ts`, `tests/enums.test.ts`, `tests/cac-evidence.test.ts`, `tests/tracking.test.ts`, `enum-drift` pgEnum keep-list). If a test can't pin it, the contract can silently drift.

---

## 4. Conservative Surface

- **Export only what consumers need.** A dead/unused exported symbol is removed (it can be resurrected from the defining module if ever needed). Zero-consumer re-exports are deleted, not kept "just in case."
- **Single-value "enums" are constants, not enums.** `CURRENCY = 'NGN' as const` and `NOTIFICATION_PRIORITY = 'URGENT' as const` are the model. Enums survive only when they are genuinely enumerated mutation-lifecycle states (`VehicleType` stays an enum because it's a mutation input; its DB column is `text` + `CHECK`, not a `pgEnum`). Do **not** re-add `Currency`/`VehicleType` as pgEnums.
- New surfaced constants require: a consumer, a doc row, a test (if contract-bearing).

---

## 5. Services Here Are Shared, Not App-Specific

- `SquadClient`, `EmailService`/SMTP, FCM sender, `queue.service.ts`, `payments.ts` (allocation/ledger), `retry`/circuit helpers live here because multiple runtimes use them.
- These must be **dependency-light and transport-agnostic** so consumers can load them without pulling app concerns. Backend/workers adapt them (e.g., `SquadProvider` wraps `SquadClient` with a circuit breaker; workers `SquadPaymentService` wraps it with retry/backoff) — consumers never re-implement the underlying call.
- Retry policy / transient-error classification is SSOT (`RETRYABLE_NETWORK_ERROR_CODES`, `RETRYABLE_SQLSTATE_CODES`, `QUEUE_SERVICE_CONFIG`), so consumer drivers stay synchronized on what is retryable.

---

## 6. Efficiency at the Source

- The DB schema carries the hot-path indexes (rider-company-time, delivery-rider-updated, event-log time, message/conversation time, subscription-status). A new query against a growth table requires a matching index — never a scan.
- `queue.service.ts` is the batching/drain SSOT: `drain(maxJobs, …)`, dedupe keys, `retryStalled`, `pruneTerminal`. Consumers pass explicit budget/limits — the service does not invent wall-clock defaults.
- Aggregate/enum defaults in schema (`text NOT NULL DEFAULT … + CHECK`) over `pgEnum` where the value is not mutation-lifecycled — avoids enum-alter migrations for constants.

---

## 7. Error Handling Canon

- Errors are typed and exportable (`extractErrorMessage`, `extractErrorContext`, `classifyTransientError`, `toError`-style wrappers) so consumers share one failure-handling model.
- The same "one `instanceof Error` check" and `Promise.allSettled` isolation rules as the backend philosophy apply to any async fan-out inside core-ts helpers.

---

## 8. Resilience / In-Flight Work

The philosophy applies to all files, including uncommitted WIP (e.g. concurrent-agent source edits in the working tree). Review the same standards; do not churn unrelated in-flight edits beyond a task's scope.

---

## 9. Document-Conformance

- **README rows must match real exports.** Tables (`SubscriptionStatus`, `EnumCatalog`, pgEnum names, export lists) are corrected when a sweep finds a stale row — a doc row naming a symbol that doesn't exist is drift.
- Cross-repo docs (plans/specs/ledgers) live under `docs/superpowers/` and are reconciled when the feature they describe lands.