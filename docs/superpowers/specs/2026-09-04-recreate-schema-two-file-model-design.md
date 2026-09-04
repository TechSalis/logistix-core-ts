# Design: Recreate-schema two-file model + billing notification reasons SSOT

Date: 2026-09-04 · Status: Draft for review

## Problem

The database is a **destroy-and-rebuild** system: there are no incremental
migrations; every schema change is applied by recreating the DB from a single
"current state" source. The single source today is `drizzle/0000_initial.sql`,
but it is actually **two kinds of content fused into one file**:

1. A **generated schema** (tables/enums/constraints), owned by
   `src/services/drizzle/schema.ts` via `drizzle-kit generate`.
2. A **hand-authored database-only appendix** (extensions, pgmq queues, 13
   `pg_cron_*` functions, `cron.schedule` upserts, RLS hardening, the
   `auth.users` program) that drizzle-kit cannot express.

Fusing them is fragile:

- The generated part **cannot be hand-edited without losing generation
  provenance**, yet it must be if the appendix lives in the same file and the
  whole file is regenerated.
- The hand appendix **would be clobbered** by a full `drizzle-kit generate`
  re-run, so regenerating the schema today is unsafe.
- This fusion has already produced **real drift**: the committed
  `0000_initial.sql` lacks `IN_TRANSIT` (`DeliveryStatus`) and `SUSPENDED`
  (`RiderStatus`), which the current TS enums in `enums.ts` declare and which
  recent IN_TRANSIT/SUSPENDED feature work depends on. A fresh `drizzle-kit
  generate` restores them; the committed SQL does not (verified by scratch
  generate + diff).
- The reason strings enqueued by the pg_cron billing functions
  (`past_due_notify`, `past_due_cancelled`, `cancelling_expired`) are spelled
  as literals in both SQL and the workers handler, with no single source of
  truth → silent drift risk.
- The destroy-and-rebuild procedure is a manual two-step `psql` apply with a
  documented history of footguns (SIGPIPE truncation, tail-slice appendix).

## Goals

- Make **`1000_initial.sql` a pure generated artifact** that is *never
  hand-edited*; regenerate with `npm run db:generate`.
- Move **all hand-owned DB content** to a dedicated current-state file,
  `sql/appendix.sql`, that is the single owner/source of that content.
- Fix the **enum drift** so a rebuild produces `IN_TRANSIT` + `SUSPENDED`.
- Provide one **deterministic recreate command** (`db:recreate`) so rebuilding
  is not a manual, error-prone procedure.
- Introduce a **`BILLING_NOTIFICATION_REASONS` SSOT** and an **exhaustive
  reason switch** in the workers handler so the three reasons are defined once
  in TS and drift-tested against SQL.
- Keep the **recreate-only / no-incremental-migrations** invariant and the
  drizzle-orm journal contract intact.

## Non-goals

- No incremental (journal-tracked) migrations.
- No bespoke SQL composer build step that merges files at build time; the two
  files are applied as two ordered `psql` segments, documented and scripted.
- No renaming of the `logistix-core-ts` package.
- No gitignore churn on `drizzle/meta/*` (these are the committed applied record
  in the recreate model; keeping them tracked is intentional).
- No per-function files under `sql/`; `sql/appendix.sql` is the applied unit
  (optional future split, out of scope).

## Architecture

### Two files, two owners

- **`drizzle/0000_initial.sql`** — generated schema, produced by
  `npm run db:generate` (`drizzle-kit generate`). Contains only the schema
  drizzle-kit emits. A header comment states: *generated from
  `src/services/drizzle/schema.ts` — do not hand-edit; regenerate and re-add
  the appendix via the Appendix flow*. The generated part is followed by a
  sentinel comment `-- ===== APPENDIX (see sql/appendix.sql) =====` and then
  a short pointer; the hand content itself does NOT live here.
- **`sql/appendix.sql`** — all hand-owned DB content, the single current-state
  source, idempotent (`CREATE OR REPLACE FUNCTION`, `CREATE EXTENSION IF NOT
  EXISTS`, `pgmq.create` idempotent, `cron.schedule` upsert-style). This is
  where any future hand-owned DB logic is added.

> Rationale for the split (vs A2 single self-contained file): a full
> `db:generate` re-run is safe because it only touches `0000_initial.sql`
> (generated) and never the appendix. The "never hand-edit generated SQL"
> constraint is only satisfiable if the hand content has a separate home.

### The recreate flow

`db:recreate` (new) is the single deterministic rebuild command:

```
DROP SCHEMA public CASCADE
apply drizzle/0000_initial.sql      (generated schema; pure, regenerable)
apply sql/appendix.sql              (hand content; current-state, idempotent)
```

Implementation notes:
- Use postgres-js (`postgres()`), the same driver `scripts/migrate.ts` already
  uses, with the same SSL/localhost handling (ssl disabled on localhost,
  `rejectUnauthorized:false` otherwise) and the same `DATABASE_URL` envelope
  requirement.
- **Output to a file, not piped through `head`/`tail`** (fixes the documented
  SIGPIPE-truncation footgun). Log progress and, on success, print a clear
  summary.
- Because `auth.users` is platform-managed (Supabase), the appendix's
  `auth.users.phone_verified_at` `ALTER` is already wrapped so the pooler role
  failure degrades to a `WARNING`, not an abort. `db:recreate` must not abort
  on that warning.
- After apply, **seed the drizzle journal** by running the existing
  `scripts/migrate.ts` (so `db:migrate` reports the schema as fully applied, no
  incremental pending) — matching the current documented post-recreate step.
  The script should note this in its summary and/or invoke `db:migrate` at the
  end.
- `DROP SCHEMA` targets `public` only. It must NOT touch `auth`/`extensions`.
  Confirm at execution that the DB is not production-critical and that this is
  intentional (the script should require an explicit `--yes`/env guard, mirroring
  destructive operation caution).

### The `npm run db:generate` provenance

- `drizzle/0000_initial.sql` is produced by `npx drizzle-kit generate`
  (`package.json` `db:generate`). After the enum-drift reconciliation, running
  it produces a generated part that includes `IN_TRANSIT` and `SUSPENDED`;
  then `sql/appendix.sql` is re-appended via the Appendix flow (not edited
  into the generated file).
- A drift test asserts the committed generated part still matches what a fresh
  generate would emit (guards future drift).

### Billing notification reasons SSOT

- `src/shared/enums/enums.ts` gains:
  - `export const BILLING_NOTIFICATION_REASONS = ['past_due_notify','past_due_cancelled','cancelling_expired'] as const;`
  - `export type BillingNotificationReason = (typeof BILLING_NOTIFICATION_REASONS)[number];`
  - `export function isBillingNotificationReason(reason: string): reason is BillingNotificationReason { return (BILLING_NOTIFICATION_REASONS as readonly string[]).includes(reason); }`
- `sql/appendix.sql` header comment on the two billing functions states the
  enqueued `reason` strings must equal `BILLING_NOTIFICATION_REASONS`.
- Workers `billing-notification.handler.ts`: exhaustive `switch` over
  `BillingNotificationReason`; unknown reason (after `isBillingNotificationReason`
  narrowing) is a handled error, not a fall-through. No raw string literals in
  the happy path beyond the SSOT.

## Drift-guard tests

In `src/services/drizzle/__tests__/` (modeled on the existing
`enum-drift.test.ts`, which reads files at test time):

1. **`recreate-drift.test.ts`**
   - Assert the generated part of `drizzle/0000_initial.sql` contains the
     DB-enum SQL for `IN_TRANSIT` (DeliveryStatus) and `SUSPENDED`
     (RiderStatus) — i.e. a regenerate preserves them (guards the exact drift
     this design fixes).
   - Assert the generated part does **not** contain hand-owned markers (e.g.
     `CREATE OR REPLACE FUNCTION`, `CREATE EXTENSION`, `pgmq.create`) →
     guarantees the file really is pure-generated.
2. **`appendix-drift.test.ts`**
   - Assert `sql/appendix.sql` contains the three `BILLING_NOTIFICATION_REASONS`
     literals (via the TS SSOT) and the `billing_notifications` queue
     (`pgmq.create('billing_notifications')`).
   - (Optional future) assert appendix idempotency markers.

These gates make a silently-wrong rebuild fail in CI before apply.

## Integration & verification

- **core-ts**: `npm run build`; full unit suite; the two new drift tests pass;
  `tsc --noEmit` clean.
- **Workers**: after handler repoint — `tsc` clean, `billing-notification.handler.spec.ts`
  green (existing tests keep asserting the three reasons behave the same).
- **Backend/web/app**: unchanged behavior; backend TSC + unit remain green
  (pin to the new core-ts commit).
- **Manual rebuild smoke** (dev/test DB): run `db:recreate`; verify
  `SELECT enum_range(NULL::"DeliveryStatus")` includes `IN_TRANSIT`,
  `SELECT enum_range(NULL::"RiderStatus")` includes `SUSPENDED`,
  `SELECT to_regclass('pgmq.q_billing_notifications')` exists, and the pg_cron
  jobs are scheduled. This smoke is optional in CI (needs a live DB) but is the
  definition of done for the reconcile.

## Deliverables

1. `sql/appendix.sql` — extracted hand content (current-state, idempotent).
2. `drizzle/0000_initial.sql` — regenerated pure schema (+ `-- APPENDIX` sentinel),
   now includes `IN_TRANSIT`/`SUSPENDED`.
3. `scripts/recreate.ts` + `package.json` `db:recreate` — deterministic apply.
4. `BILLING_NOTIFICATION_REASONS`/`type`/`isBillingNotificationReason` in
   `enums.ts`.
5. Workers handler exhaustive-switch repoint + spec updates.
6. Two drift-guard tests.
7. `docs/deployment.md` + backend/core-ts `AGENTS.md` two-file model updates.
8. core-ts rebuild (dist) + backend/workers pin bumps; committed per-repo,
   never pushed (never-push directive).

## Out of scope (future)

- Per-function files under `sql/`.
- Any normalization of `auth.users.phone_verified_at` ownership (needs
  `supabase_admin`; pre-existing drift unchanged).
- Switching to a classic incremental-migration tool.