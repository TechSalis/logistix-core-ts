# Dev Setup

## npm link setup (local dev)

```bash
cd logistix-core-ts && npm link
cd ../logistix-backend && npm link logistix-core-ts
cd ../logistix-workers && npm link logistix-core-ts
cd ../logistix-web/shared && npm link logistix-core-ts
cd ../logistix-web/admin && npm link logistix-core-ts
cd ../logistix-web/customer && npm link logistix-core-ts
cd ../logistix-web/driver && npm link logistix-core-ts
```

## After `npm install` in core-ts

The `postinstall` script auto-creates a symlink to `../logistix-backend/node_modules/drizzle-orm` when the monorepo sibling structure is detected. This avoids dual-instance type conflicts from `npm link`.

In CI (GitHub install), the guard skips the symlink — npm hoists peer deps correctly in that case.

You can also run manually:
```bash
npm run dev:link
```

## TypeScript checks

```bash
cd logistix-backend && npx tsc --noEmit
cd logistix-workers && npx tsc --noEmit
```

## Package.json convention

Consumers use `"logistix-core-ts": "github:TechSalis/logistix-core-ts#main"`. Local dev overrides with `npm link`.
