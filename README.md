# logistix-core-ts

> Shared TypeScript types, enums, config, and utilities — single source of truth for all Logistix services.

Consumed by:
- `logistix-backend`
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
import { UserRole, DeliveryStatus, buildSystemConfig } from 'logistix-core-ts';

console.log(UserRole.DISPATCHER);                // 'DISPATCHER'
const config = buildSystemConfig({ customerBaseUrl: 'https://...' });
```

---

## Configuration via Environment Variables

`buildSystemConfig()` creates a `SystemConfig` from environment variables:

| Env Variable        | Default              | Description                  |
|---------------------|----------------------|------------------------------|
| `BRAND_NAME`        | `Logistix AI`        | Public brand name            |
| `CUSTOMER_BASE_URL` | (none)               | Customer portal base URL     |
| `BUSINESS_BASE_URL` | (none)               | Business portal base URL     |
| `EMAIL_DOMAIN`      | (none)               | Email-sending domain         |
| `supportEmail`      | (none)               | Support email (function param) |
| `paymentsEmail`     | (none)               | Payments email (function param) |

In **SvelteKit** (browser), use `buildSystemConfig()` with your PUBLIC env map:

```ts
import { buildSystemConfig } from 'logistix-core-ts';
import { env } from '$env/dynamic/public';

export const config = buildSystemConfig({
  customerBaseUrl: env.PUBLIC_CUSTOMER_PORTAL_URL,
  businessBaseUrl: env.PUBLIC_BUSINESS_PORTAL_URL,
  emailDomain: env.PUBLIC_EMAIL_DOMAIN,
  supportEmail: env.PUBLIC_SUPPORT_EMAIL,
  ...(env.PUBLIC_BRAND_NAME ? { brandName: env.PUBLIC_BRAND_NAME } : {}),
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
| `UserRole`              | `enum`            | ADMIN, COMPANY, DISPATCHER, RIDER, CUSTOMER  |
| `DeliveryStatus`        | `enum`            | PENDING, AWAITING_PAYMENT, ASSIGNED, IN_TRANSIT, DELIVERED, CANCELLED |
| `RiderStatus`           | `enum`            | ONLINE, OFFLINE, BUSY                        |
| `PaymentMethod`         | `enum`            | PREPAID, POD                                 |
| `EventType`             | `enum`            | All system event types                       |
| `ErrorCode`             | `enum`            | Standardized error codes                     |
| *(+ many more)*         | `enum`            | See `src/enums.ts`                           |
| `buildSystemConfig()`   | `function`        | Factory for browser/custom env contexts      |
| `fetchWithTimeout()`    | `function`        | Fetch with configurable timeout              |
