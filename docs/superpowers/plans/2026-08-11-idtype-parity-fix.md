# 2026-08-11 — core-ts IdType parity fix

## Objective

Backend SDL (`logistix-backend/src/core/graphql/typeDefs.ts:74-78`) defines `enum IdType { NIN DRIVER_LICENSE PASSPORT }` but core-ts `IdType` (`src/enums/enums.ts:386-388`) has only `PASSPORT`. Restore parity so clients (web/mobile/backend fixtures) can type against the server-driven members instead of string literals.

## Background

- `rg IdType` across `logistix-web` and `logistix-app` → **0 usages today** (no client consumes it yet). This is a forward-parity fix, not a migration.
- Backend rider test fixture uses the literal `'PASSPORT'` (`logistix-backend/src/modules/operations/riders/resolvers/__tests__/rider.resolver.test.ts`) — can optionally switch to `IdType.PASSPORT` in the backend plan, but not required.

## Tasks

1. `src/enums/enums.ts` — add the two missing members:
   ```ts
   export enum IdType {
     NIN = 'NIN',
     DRIVER_LICENSE = 'DRIVER_LICENSE',
     PASSPORT = 'PASSPORT',
   }
   ```
   (`src/index.ts` already re-exports `IdType`; no export change needed.)

## Verification

```bash
cd logistix-core-ts && npm run build && npm run test
```

## Cross-repo note

No consumer changes required. When the web admin rebuild or mobile docs/flows eventually surface `IdType`, they must reference `IdType.NIN` / `IdType.DRIVER_LICENSE` / `IdType.PASSPORT` (wire-enum standard).
