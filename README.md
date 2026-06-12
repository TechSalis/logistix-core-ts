# logistix-core-ts

> Shared TypeScript types, enums, config, and utilities — single source of truth for all Logistix services.

Consumed by:
- `logistix-backend` (NestJS API)
- `logistix-workers` (background jobs)
- `logistix-web` (SvelteKit dashboards)

---

## Installation

Install directly from the GitHub repository:

```bash
npm install git+https://github.com/TechSalis/logistix-core-ts.git
```

Pin to a specific commit or tag for reproducible builds:

```bash
npm install git+https://github.com/TechSalis/logistix-core-ts.git#v1.0.0
```

---

## Usage

```ts
import { UserRole, DeliveryStatus, SYSTEM_CONFIG, localParse } from 'logistix-core-ts';

console.log(UserRole.DISPATCHER);       // 'DISPATCHER'
console.log(SYSTEM_CONFIG.brandName);   // 'Logistix' (or env override)

const deliveries = localParse(rawText);
```

---

## Configuration via Environment Variables

`SYSTEM_CONFIG` is auto-populated from environment variables. Override any default:

| Env Variable            | Default              | Description                  |
|-------------------------|----------------------|------------------------------|
| `BRAND_NAME`            | `Logistix`           | Public brand name            |
| `BRAND_DOMAIN`          | `logistix.team`      | Primary domain               |
| `BRAND_SUPPORT_EMAIL`   | `contact@{domain}`   | Support email                |
| `BRAND_PHONE_NUMBER`    | `09069184604`        | Support phone number         |
| `BRAND_LOGO_URL`        | `/icon_transparent.png` | Logo URL                  |
| `BRAND_FAVICON_URL`     | `/favicon.png`       | Favicon URL                  |
| `ENABLE_TRACKING_CODES` | `true`               | Enable delivery tracking     |
| `BRAND_TRACKING_LINK`   | `https://{domain}/track` | Tracking page URL        |

In **SvelteKit** (browser), use `buildSystemConfig()` with your PUBLIC env map:

```ts
import { buildSystemConfig } from 'logistix-core-ts';
import { env } from '$env/dynamic/public';

export const SYSTEM_CONFIG = buildSystemConfig({
  BRAND_NAME: env.PUBLIC_BRAND_NAME,
  BRAND_DOMAIN: env.PUBLIC_BRAND_DOMAIN,
  // ...
});
```

---

## Development

```bash
npm install
npm run build    # compile to dist/
npm run check    # TypeScript type-check
npm test         # run unit tests
```

---

## Exports

| Export                  | Type              | Description                                  |
|-------------------------|-------------------|----------------------------------------------|
| `UserRole`              | `enum`            | ADMIN, COMPANY, DISPATCHER, RIDER            |
| `DeliveryStatus`        | `enum`            | PENDING, ASSIGNED, IN_TRANSIT, DELIVERED, CANCELLED |
| `RiderStatus`           | `enum`            | ONLINE, OFFLINE, BUSY                        |
| `PaymentMethod`         | `enum`            | PREPAID, POD                                 |
| `EventType`             | `enum`            | All system event types                       |
| `ErrorCode`             | `enum`            | Standardized error codes                     |
| *(+ many more)*         | `enum`            | See `src/enums.ts`                           |
| `SYSTEM_CONFIG`         | `SystemConfig`    | Auto-built from environment variables        |
| `buildSystemConfig()`   | `function`        | Factory for browser/custom env contexts      |
| `localParse()`          | `function`        | Parse delivery text templates locally        |
| `fetchWithTimeout()`    | `function`        | Fetch with configurable timeout              |
