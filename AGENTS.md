# Dev Setup

## TypeScript checks

```bash
cd logistix-backend && npx tsc --noEmit
cd logistix-workers && npx tsc --noEmit
```

## Package.json convention

Consumers use `"logistix-core-ts": "file:../logistix-core-ts"`. A `preinstall` script clones + installs + builds core-ts if not present (for Render deploys). CI checks it out explicitly for caching.
