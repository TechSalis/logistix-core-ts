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
import { UserRole, DeliveryStatus, REGIONAL_CONFIG } from 'logistix-core-ts';

console.log(UserRole.DISPATCHER);                // 'DISPATCHER'
console.log(REGIONAL_CONFIG.timeZone);           // 'Africa/Lagos'
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

### Enums

| Export                     | Values / Notes                                              |
|----------------------------|-------------------------------------------------------------|
| `UserRole`                 | ADMIN, DISPATCHER, RIDER                              |
| `DeliveryStatus`           | PENDING, ASSIGNED, IN_TRANSIT, DELIVERED, CANCELLED, FAILED |
| `RiderStatus`              | ONLINE, OFFLINE, BUSY                                       |
| `PaymentMethod`            | PREPAID, PAY_ON_DELIVERY                                   |
| `ApprovalStatus`           | PENDING, APPROVED, REJECTED                                 |
| `EntityType`               | Delivery, Rider, Company, etc.                              |
| `ChannelPlatform`          | WHATSAPP, INSTAGRAM, FACEBOOK, TIKTOK                      |
| `NodeEnv`                  | DEVELOPMENT, STAGING, PRODUCTION                            |
| `VehicleType`              | BIKE                                                       |
| `SubscriptionTier`         | STARTER, PROFESSIONAL                                      |
| `SubscriptionStatus`       | ACTIVE, PAST_DUE, CANCELLED, etc.                           |
| `TransactionStatus`        | PENDING, COMPLETED, FAILED, etc.                            |
| `TransactionType`          | CREDIT, DEBIT, etc.                                         |
| `LedgerAdjustmentType`     | SUBSCRIPTION, PAYOUT, CHANNEL_FEE, etc.                     |
| `ChannelType`              | COMPANY_OWNED, SYSTEM_OWNED                                 |
| `Currency`                 | NGN, USD, etc.                                              |
| `PaymentProvider`          | PAYSTACK, SQUAD, etc.                                       |
| `EventType`                | All system event types                                      |
| `SubscriptionEventType`    | Subscription lifecycle events                               |
| `UserAuditAction`          | LOGIN, LOGOUT, PASSWORD_CHANGE, etc.                        |
| `ChatUpdateType`           | MESSAGE, TYPING, READ, etc.                                 |
| `MessageStatus`            | SENT, DELIVERED, READ, FAILED                               |
| `EscalationStatus`         | OPEN, IN_PROGRESS, RESOLVED, etc.                           |
| `EscalatedTo`              | DISPATCHER, ADMIN, etc.                                     |
| `SenderType`               | CUSTOMER, RIDER, DISPATCHER, SYSTEM, AI                     |
| `SecurityEventType`        | RATE_LIMIT, BRUTE_FORCE, INJECTION, etc.                    |
| `SecuritySeverity`         | LOW, MEDIUM, HIGH, CRITICAL                                 |
| `ErrorCode`                | Standardized error codes                                    |
| `SystemStatus`             | HEALTHY, DEGRADED, DOWN                                     |
| `LlmRole`                  | SYSTEM, USER, ASSISTANT                                     |
| `ProviderRole`             | PRIMARY, FALLBACK, etc.                                     |
| `ProviderCapability`       | CHAT, VISION, EMBEDDING, etc.                               |
| `LogLevel`                 | DEBUG, INFO, WARN, ERROR, SILENT                          |
| `ApiTag`                   | API route tags                                              |
| `SseEventType`             | MESSAGE, STATUS_CHANGE, TRACKING, etc.                      |
| `JwtTokenType`             | ACCESS, REFRESH, SSE, OTP                                   |
| `ContactCategory`          | GENERAL, SUPPORT, BILLING, etc.                             |
| `JobType`                  | DELIVERY_NOTIFICATION, SQUAD_WEBHOOK, EXPORT, AI_BATCH       |
| `JobStatus`                | QUEUED, PROCESSING, SUCCEEDED, FAILED, CANCELLED             |

**Enum helpers:**

| Export               | Type       | Description                                        |
|----------------------|------------|----------------------------------------------------|
| `safeEnumValue()`    | `function`  | Safely parses a string into an enum value          |

### Config

| Export                   | Type       | Description                                  |
|--------------------------|------------|----------------------------------------------|
| `buildSystemConfig()`   | `function` | Factory for browser/custom env contexts      |
| `BRAND_NAME`            | `string`   | Default brand name (`'Logistix AI'`)         |
| `DELETED_USER_SENTINEL` | `string`   | Sentinel ID for soft-deleted users           |

### Regional

| Export             | Type                | Description                              |
|--------------------|---------------------|------------------------------------------|
| `REGIONAL_CONFIG`  | `object`             | Timezone, states, country code — SSOT    |

### Limits

| Export           | Type                | Description                              |
|------------------|---------------------|------------------------------------------|
| `LIMITS_CONFIG`  | `object`           | Centralized limits (pagination, search, etc.) |
| `TIER_LIMITS`    | `Record<SubscriptionTier, TierLimits>` | Per-tier limits  |
| `getTierLimits()`| `function`          | Returns limits for a given tier          |

### Billing

| Export                       | Type       | Description                                  |
|------------------------------|------------|----------------------------------------------|
| `BILLING_CONFIG`             | `object`   | Billing intervals, retry policy, etc.        |
| `DATA_RETENTION`             | `object`   | Data retention periods                       |
| `CHANNEL_FEES`               | `object`   | Per-platform channel fees                    |
| `DEDICATED_TIERS`            | `object`   | Tiers that get dedicated instances           |
| `KOBO_PER_NAIRA`             | `number`   | Kobo/Naira conversion constant               |
| `getSubscriptionPrice()`     | `function` | Calculates subscription price for a tier     |
| `formatAmount()`             | `function` | Formats an amount in kobo to display string  |
| `formatNaira()`              | `function` | Formats a number as ₦ display string         |
| `isBillableTier()`           | `function` | Checks if a tier requires payment            |
| `shouldBillNow()`            | `function` | Checks if billing should trigger now         |
| `shouldRetryPayment()`       | `function` | Checks if a failed payment should be retried |

### Security

| Export              | Type                | Description                              |
|---------------------|---------------------|------------------------------------------|
| `SECURITY_CONFIG`   | `object`            | Rate limits, thresholds, ban policy      |

### Utilities

| Export                   | Type       | Description                                  |
|--------------------------|------------|----------------------------------------------|
| `fetchWithTimeout()`     | `function` | Fetch with configurable timeout              |
| `extractErrorMessage()`  | `function` | Extracts error message from unknown throwables |

### Queue Service

| Export                        | Type        | Description                                  |
|-------------------------------|-------------|----------------------------------------------|
| `queueService`                | `object`    | `job_queue` drain/enqueue singleton          |
| `queueService.enqueue()`      | `function`  | Insert a job (retries use `defaultMaxRetries` unless `maxRetries` passed) |
| `queueService.enqueueWithDedupe()` | `function` | Insert a job unless one with the same `dedupeKey` is pending |
| `queueService.drain()`        | `function` | Poll loop; `maxJobs` **required**, `timeBudgetMs` optional (cron wall-clock) |
| `queueService.countRecent()`  | `function` | Count jobs for a type/company since a cutoff  |
| `queueService.pruneTerminal()`| `function` | Delete terminal jobs older than `pruneTerminalAfterMs` |
| `QUEUE_SERVICE_CONFIG`        | `object`    | SSOT: `batchSize`, `defaultMaxRetries`, prune/retry windows, retry backoff |

**Queue contract:**

- `drain()`'s `maxRetries` option is the **total attempts** (the first attempt counts).
- `batchSize` is the per-claim lock scope (`SELECT ... LIMIT n FOR UPDATE SKIP LOCKED`), not a time concept.
- Workers pass `timeBudgetMs` for Cloudflare-cron wall-clock compliance; the backend poll loop relies on `maxJobs` + its poll tick instead.
- Dedupe uniqueness is enforced by the `job_queue_dedupe_key_unique` partial unique index (dedupe key is NULL for non-dedupe jobs, so only pending dedupe-keyed jobs block re-enqueue).

### Formatters

| Export                    | Type       | Description                                  |
|---------------------------|------------|----------------------------------------------|
| `formatDeliveryStatus()`  | `function` | Formats DeliveryStatus enum to display text  |
| `formatEnumToTitleCase()` | `function` | Formats any enum value to Title Case         |

### Tracking

| Export                       | Type     | Description                              |
|------------------------------|----------|------------------------------------------|
| `TRACKING_ID_PREFIX`         | `string` | `'LGX-'` prefix for tracking IDs        |
| `TRACKING_ID_SUFFIX_LENGTH`  | `number` | Length of the random suffix              |
| `TRACKING_ID_LENGTH`         | `number` | Total tracking ID length                 |
| `TRACKING_ID_CHARS`          | `string` | Character set for random suffix          |
| `TRACKING_ID_ALPHABET`       | `string` | Expanded charset for generation (lockstep with `TRACKING_ID_CHARS`) |

### Email Service

| Export              | Type        | Description                          |
|---------------------|-------------|--------------------------------------|
| `EmailService`      | `class`     | Email sending service                |

### Domain Entity Types

| Export            | Type    | Description                              |
|-------------------|---------|------------------------------------------|
| `DeliveryBase`    | `type`  | Core delivery entity shape               |
| `RiderBase`       | `type`  | Core rider entity shape                  |
| `DispatcherBase`  | `type`  | Core dispatcher entity shape             |

### Drizzle ORM Schema

All Drizzle table definitions and relations are re-exported via `export * from './drizzle/index.js'`. This includes:

- **Tables:** `companies`, `companySettings`, `companyChannels`, `conversations`, `messages`, `admins`, `dispatchers`, `blockedIps`, `deliveries`, `riders`, `paymentTransactions`, `subscriptionTransactions`, `deliveryAllocations`, `ledgerTransactions`, `eventLogs`, `jobQueue`, `eventOutbox`, `companyDailyMetrics`, `companyLifetimeMetrics`
- **pgEnums:** `deliveryStatus`, `jobStatus`, `companyChannelStatus`, `ledgerAdjustmentType`, `channelPlatform`, `messageStatus`, `paymentMethod`, `approvalStatus`, `riderStatus`, `senderType`, `subscriptionTier`, `transactionStatus`, `transactionType`, `vehicleType`, `paymentProvider`, `subscriptionStatus`, `channelType`, `escalatedTo`, `eventType`, `entityType`, `currencyEnum`, `adminRoleEnum`, `dispatcherRoleEnum`
- **Relations:** All table relations for query building

> **Note:** Drizzle exports are primarily for backend/workers that use Drizzle ORM directly. Web apps should use the typed API clients instead.
