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

The documented surface below mirrors `src/index.ts` exactly.

### Enums

| Export                     | Values / Notes                                              |
|----------------------------|-------------------------------------------------------------|
| `UserRole`                 | ADMIN, DISPATCHER, RIDER                                    |
| `AdminRole`                | ADMIN, SUPER_ADMIN                                          |
| `DispatcherRole`           | OWNER, DISPATCHER                                           |
| `DeliveryStatus`           | PENDING, ASSIGNED, IN_TRANSIT, DELIVERED, CANCELLED, FAILED |
| `PaymentMethod`            | PREPAID, PAY_ON_DELIVERY                                   |
| `PaymentStatus`            | AWAITING, COMPLETED, FAILED                                 |
| `RiderStatus`              | ONLINE, OFFLINE, BUSY                                       |
| `ApprovalStatus`           | PENDING, APPROVED, REJECTED, SUSPENDED, DISABLED            |
| `CompanyAccessLevel`       | FULL, TRIAL, PAST_DUE, RESTRICTED                           |
| `EntityType`               | USER, DELIVERY, RIDER, COMPANY, DISPATCHER, SYSTEM, COMPANY_CHANNEL, MESSAGE |
| `ChannelPlatform`          | WHATSAPP, INSTAGRAM, FACEBOOK, TIKTOK                      |
| `CompanyChannelStatus`     | PENDING, ACTIVE, DEACTIVATED, REJECTED, REMOVED             |
| `NodeEnv`                  | development, production, test                               |
| `VehicleType`              | BIKE                                                       |
| `SubscriptionTier`         | STARTER, PROFESSIONAL                                      |
| `SubscriptionStatus`       | TRIAL, ACTIVE, PAST_DUE, CANCELLED                          |
| `SubscriptionHealth`       | HEALTHY, IN_TRIAL, PAST_DUE, EXPIRING_SOON, CANCELLED       |
| `TransactionStatus`        | PENDING, SUCCESS, FAILED, REVERSED                          |
| `TransactionType`          | DELIVERY_PAYMENT, SUBSCRIPTION, ADJUSTMENT, SETTLEMENT, REFUND |
| `LedgerAdjustmentType`     | CREDIT, DEBIT, CORRECTION, CHANNEL_FEE, OVERAGE, REFUND     |
| `ChannelType`              | SYSTEM_POOL, MY_CHANNEL                                     |
| `Currency`                 | NGN                                                         |
| `PaymentProvider`          | SQUAD, SYSTEM                                              |
| `EventType`                | All system event types (DB pgEnum)                          |
| `SubscriptionEventType`    | CREATED, UPDATED, DELETED, ASSIGNED, STATUS_CHANGED         |
| `UserAuditAction`          | LOGIN, LOGOUT, PROFILE_UPDATE, DEACTIVATED                  |
| `ChannelsUpdateType`       | MESSAGE, OWNERSHIP, CONVERSATION, CHANNEL                   |
| `MessageStatus`            | SENT, DELIVERED, READ, FAILED                               |
| `MESSAGE_STATUS_RANK`      | `Record<MessageStatus, number>` (SENT→1 … FAILED→4)         |
| `EscalationStatus`         | OPEN, RESOLVED, TAKEN_OVER                                  |
| `EscalatedTo`              | COMPANY, ADMIN, DISPATCHER                                  |
| `SenderType`               | CUSTOMER, AGENT, DISPATCHER, SYSTEM                         |
| `IdType`                   | PASSPORT                                                    |
| `ConversationHandlerType`  | AI, DISPATCHER, ADMIN                                       |
| `ExportDataType`           | DELIVERIES, BILLING, CHAT                                   |
| `ExportReason`             | QUEUED, DUPLICATE, QUOTA_EXCEEDED                           |
| `JobType`                  | delivery-notification, squad-webhook, export, ai:batch      |
| `SecurityEventType`        | RATE_LIMIT, MALICIOUS_REQUEST, BRUTE_FORCE                  |
| `SecuritySeverity`         | LOW, MEDIUM, HIGH, CRITICAL                                 |
| `ErrorCode`                | Standardized error codes                                    |
| `DayOfWeek`                | Monday, Tuesday, Wednesday, Thursday, Friday, Saturday      |
| `ALL_DAYS`                 | `readonly DayOfWeek[]` (all seven days)                     |
| `MetricDomain`             | DELIVERIES, CONVERSATIONS, RIDERS, REVENUE                  |
| `MetricGranularity`        | DAY, WEEK, MONTH, LIFETIME                                  |
| `SystemStatus`             | UP, DOWN, DEGRADED                                          |
| `LlmRole`                  | user, assistant, system                                     |
| `ProviderRole`             | interpret, synthesize                                       |
| `ProviderCapability`       | json, tools, vision                                         |
| `LogLevel`                 | debug, info, warn, error, silent                            |
| `ApiTag`                   | API route tags                                              |
| `SseEventType`             | connected, delivery, rider, message, initial, company, rider-location, typing |
| `FcmNotificationType`      | SUBSCRIPTION_CANCELLED, DELIVERY_ASSIGNED, COMPANY_STATUS_CHANGED, SETTLEMENT_FAILED, SETTLEMENT_REVERSAL, HUMAN_REQUEST |
| `NotificationPriority`     | URGENT                                                      |
| `DeliveryExpiryReason`     | STALE_PENDING_DELIVERY, SCHEDULED_WINDOW_MISSED, RIDER_SILENT, IN_TRANSIT_STALL |
| `JwtTokenType`             | access, refresh                                            |
| `ContactCategory`          | 'Become a Partner', 'For Business', 'Support', 'Tracking Inquiry', 'Feedback' |
| `LEAD_CATEGORIES`          | `ReadonlySet<ContactCategory>` (PARTNERSHIP, BUSINESS)      |
| `CAC_EVIDENCE_STATUS`      | FOUND, INACTIVE, NOT_FOUND, ERROR                           |
| `CACEvidenceStatus`        | `type` — union of the `CAC_EVIDENCE_STATUS` values         |

**Enum helpers:**

| Export               | Type       | Description                                        |
|----------------------|------------|----------------------------------------------------|
| `safeEnumValue()`    | `function` | Safely parses a string into an enum value          |

### Config

| Export                    | Type            | Description                                     |
|---------------------------|-----------------|-------------------------------------------------|
| `buildSystemConfig()`     | `function`      | Factory for browser/custom env contexts         |
| `SHARED_SYSTEM_CONFIG`    | `SystemConfig`  | Env-derived singleton config                    |
| `BRAND_NAME`              | `string`        | Default brand name (`'Logistix AI'`)            |
| `DELETED_USER_SENTINEL`   | `string`        | Sentinel ID for soft-deleted users              |
| `SYSTEM_ACTOR_ID`         | `string`        | `'system'` — system actor identifier            |
| `SystemConfig`            | `type`          | System config shape                             |
| `BankDetails`             | `type`          | Bank account details shape                      |

### Regional

| Export             | Type     | Description                              |
|--------------------|----------|------------------------------------------|
| `REGIONAL_CONFIG`  | `object` | Timezone, states, country code — SSOT    |
| `REGIONAL_LOCALE`  | `string` | `'en-NG'`                                |
| `HQ_LOCATION`      | `string` | `'Lagos, Nigeria'`                       |

### Timezone

| Export                          | Type       | Description                                  |
|---------------------------------|------------|----------------------------------------------|
| `getMonthStartInTimezone()`     | `function` | Month start in a given timezone              |
| `getStartOfDayInTimezone()`     | `function` | Start of day in a given timezone             |
| `getRetentionCutoff()`          | `function` | Retention cutoff in a given timezone         |

### Limits

| Export                 | Type                | Description                              |
|------------------------|---------------------|------------------------------------------|
| `LIMITS_CONFIG`        | `object`           | Centralized limits (pagination, search, etc.) |
| `TIER_LIMITS`          | `Record<SubscriptionTier, TierLimits>` | Per-tier limits  |
| `getTierLimits()`      | `function`          | Returns limits for a given tier          |
| `DEFAULT_MESSAGE_LIMIT`| `number`            | Default message length limit             |
| `TierLimits`           | `type`              | Per-tier limits shape                    |

### Delivery rules

| Export                        | Type       | Description                                  |
|-------------------------------|------------|----------------------------------------------|
| `ALLOWED_STATUS_TRANSITIONS`  | `object`   | Legal `DeliveryStatus` transitions           |

### Client config

| Export           | Type       | Description                              |
|------------------|------------|------------------------------------------|
| `CLIENT_CONFIG`  | `object`   | Client-side config (branding, URLs)      |

### Export config

| Export                    | Type                     | Description                                  |
|---------------------------|--------------------------|----------------------------------------------|
| `VALID_DATA_TYPES`        | `readonly ExportDataType[]` | Supported export types                    |
| `MONTH_REQUIRED_TYPES`    | `ReadonlySet<DataType>`  | Export types that require a month            |
| `DataType`                | `type`                   | `(typeof VALID_DATA_TYPES)[number]`          |

### Retention

| Export             | Type       | Description                              |
|--------------------|------------|------------------------------------------|
| `RETENTION_CONFIG` | `object`   | Retention periods                        |

### Metrics

| Export                         | Type       | Description                                  |
|--------------------------------|------------|----------------------------------------------|
| `METRICS_RETENTION`            | `object`   | Per-granularity retention periods            |
| `METRICS_FOLD_CHAIN`           | `readonly MetricGranularity[]` | Coarsening ladder for the compression job |
| `METRIC_DOMAINS`               | `readonly MetricDomain[]` | Supported metric domains                  |
| `METRIC_DOMAIN_MAPPINGS`       | `readonly MetricDomainMapping[]` | Domain → column mapping                 |
| `LIFETIME_BUCKET_START`        | `string`   | LIFETIME sentinel bucket start (`'1970-01-01'`) |
| `MAX_TREND_WINDOW_DAYS`        | `number`   | Maximum trend window                       |
| `granularityForWindowDays()`   | `function` | Picks granularity for a window in days     |
| `windowExceedsDayRetention()`  | `function` | True if window exceeds DAY retention       |
| `isLifetime()`                 | `function` | True for LIFETIME granularity              |

### Billing

| Export                       | Type       | Description                                  |
|------------------------------|------------|----------------------------------------------|
| `BILLING_CONFIG`             | `object`   | Billing intervals, retry policy, etc.        |
| `DATA_RETENTION`             | `object`   | Data retention periods                       |
| `CHANNEL_FEES`               | `object`   | Per-platform channel fees                    |
| `DEDICATED_TIERS`            | `object`   | Tiers that get dedicated instances           |
| `SUPPORT_SLA`                | `object`   | Support response SLAs per tier               |
| `KOBO_PER_NAIRA`             | `number`   | Kobo/Naira conversion constant               |
| `getSubscriptionPrice()`     | `function` | Calculates subscription price for a tier     |
| `formatAmount()`             | `function` | Formats an amount in kobo to display string  |
| `isBillableTier()`           | `function` | Checks if a tier requires payment            |
| `shouldBillNow()`            | `function` | Checks if billing should trigger now         |
| `shouldRetryPayment()`       | `function` | Checks if a failed payment should be retried |
| `computeAccessLevel()`       | `function` | Derives `CompanyAccessLevel` from a subscription |

### Shared payment allocation

| Export                         | Type       | Description                                  |
|--------------------------------|------------|----------------------------------------------|
| `getTotalPaidForDeliveries()`  | `function` | Sum paid per delivery                        |
| `applyPaymentStatusUpdate()`   | `function` | Applies a payment status change              |
| `processPaymentAllocation()`   | `function` | Allocates a payment across deliveries        |
| `PaymentAllocationTransaction` | `type`     | Payment allocation transaction shape         |
| `PaymentAllocationResult`      | `type`     | Payment allocation result shape              |

### Squad client

| Export              | Type       | Description                                  |
|---------------------|------------|----------------------------------------------|
| `SquadClient`       | `class`    | Squad payment client                         |
| `SquadRequestError` | `class`    | Squad request error                          |

### Queue Service

| Export                        | Type        | Description                                  |
|-------------------------------|-------------|----------------------------------------------|
| `queueService`                | `object`    | pgmq drain/enqueue singleton          |
| `queueService.enqueue()`      | `function`  | Insert a job (retries use `defaultMaxRetries` unless `maxRetries` passed) |
| `queueService.enqueueWithDedupe()` | `function` | Insert a job unless one with the same `dedupeKey` is pending |
| `queueService.drain()`        | `function` | Poll loop; `maxJobs` **required**, `timeBudgetMs` optional (cron wall-clock) |
| `queueService.countRecent()`  | `function` | Count jobs for a type/company since a cutoff  |
| `queueService.pruneTerminal()`| `function` | Delete terminal jobs older than `pruneTerminalAfterMs` |
| `QUEUE_SERVICE_CONFIG`        | `object`    | SSOT: `batchSize`, `defaultMaxRetries`, prune/retry windows, retry backoff |
| `PermanentJobError`           | `class`     | Thrown for jobs that should not be retried   |
| `QueueHandler`                | `type`      | Queue handler callback shape                 |

**Queue contract:**

- `drain()`'s `maxRetries` option is the **total attempts** (the first attempt counts).
- `batchSize` is the per-claim lock scope (`SELECT ... LIMIT n FOR UPDATE SKIP LOCKED`), not a time concept.
- Workers pass `timeBudgetMs` for Cloudflare-cron wall-clock compliance; the backend poll loop relies on `maxJobs` + its poll tick instead.
- Dedupe uniqueness is enforced by pgmq's built-in dedup on the queue name (dedupe key is NULL for non-dedupe jobs, so only pending dedupe-keyed jobs block re-enqueue).

### Email Service

| Export              | Type        | Description                          |
|---------------------|-------------|--------------------------------------|
| `EmailService`      | `class`     | Email sending service                |

### FCM Push Notifications

| Export          | Type            | Description                          |
|-----------------|-----------------|--------------------------------------|
| `FcmService`    | `class`         | Firebase Cloud Messaging service     |
| `FcmCredentials`| `type`          | FCM credentials shape                |

### Security

| Export              | Type                | Description                              |
|---------------------|---------------------|------------------------------------------|
| `SECURITY_CONFIG`   | `object`            | Rate limits, thresholds, ban policy      |

### Utilities

| Export                   | Type       | Description                                  |
|--------------------------|------------|----------------------------------------------|
| `fetchWithTimeout()`     | `function` | Fetch with configurable timeout              |
| `MS_PER_DAY`             | `number`   | Milliseconds in a day                        |
| `addDays()`              | `function` | Adds days to a `Date`                        |
| `mergeChannelCounts()`   | `function` | Merges per-channel metric counts             |
| `extractErrorMessage()`  | `function` | Extracts error message from unknown throwables |
| `extractErrorContext()`  | `function` | Extracts `{ error, stack }` context          |

### Retry

| Export                          | Type       | Description                                  |
|---------------------------------|------------|----------------------------------------------|
| `withRetry()`                   | `function` | Retries a task with backoff                  |
| `sleep()`                       | `function` | Resolves after `ms` milliseconds             |
| `RETRYABLE_NETWORK_ERROR_CODES` | `Set<string>` | Node-level network error codes           |
| `RETRYABLE_SQLSTATE_CODES`      | `Set<string>` | Postgres connection-class SQLSTATE codes |
| `WithRetryOptions`              | `type`     | `withRetry()` options shape                  |

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

### Domain Entity Types

| Export            | Type    | Description                              |
|-------------------|---------|------------------------------------------|
| `DeliveryBase`    | `type`  | Core delivery entity shape               |
| `RiderBase`       | `type`  | Core rider entity shape                  |
| `DispatcherBase`  | `type`  | Core dispatcher entity shape             |

### Enum Catalog

| Export         | Type           | Description                              |
|----------------|----------------|------------------------------------------|
| `ENUM_CATALOG` | `EnumCatalog` | Programmatically built enum catalog      |
| `EnumValue`    | `type`         | `{ name, label }` pair                   |
| `EnumCatalog`  | `type`         | Catalog shape                            |

### Metadata Types

| Export                       | Type    | Description                              |
|------------------------------|---------|------------------------------------------|
| `ConversationMetadata`       | `type`  | Conversation metadata shape              |
| `ChannelCredentials`         | `type`  | Channel credentials shape                |
| `CompanyChannelMetadata`     | `type`  | Company channel metadata shape           |
| `DeliveryMetadata`           | `type`  | Delivery metadata shape                  |
| `RiderMetadata`              | `type`  | Rider metadata shape                     |
| `CompanyMetadata`            | `type`  | Company metadata shape                   |
| `CacVerificationEvidence`    | `type`  | CAC verification evidence shape          |
| `TransactionMetadata`        | `type`  | Transaction metadata shape               |
| `ChatMessageMetadata`        | `type`  | Chat message metadata shape              |
| `LedgerMetadata`             | `type`  | Ledger metadata shape                    |

### Drizzle ORM Schema

All Drizzle table definitions and relations are re-exported via `export * from './drizzle/index.js'`. This includes:

- **Tables:** `companies`, `companySettings`, `companyChannels`, `conversations`, `messages`, `admins`, `dispatchers`, `blockedIps`, `deliveries`, `riders`, `paymentTransactions`, `subscriptionTransactions`, `deliveryAllocations`, `ledgerTransactions`, `eventLogs`, `jobQueue`, `eventOutbox`, `companyDailyMetrics`, `companyLifetimeMetrics`, `metrics`
- **pgEnums:** `deliveryStatus`, `jobStatusEnum`, `companyChannelStatus`, `ledgerAdjustmentType`, `channelPlatform`, `messageStatus`, `paymentMethod`, `approvalStatus`, `riderStatus`, `senderType`, `subscriptionTier`, `transactionStatus`, `transactionType`, `vehicleType`, `paymentProvider`, `subscriptionStatus`, `channelType`, `escalatedTo`, `eventType`, `entityType`, `currencyEnum`, `adminRoleEnum`, `dispatcherRoleEnum`, `metricDomain`, `metricGranularity`
- **Relations:** All table relations for query building

> **Note:** Drizzle exports are primarily for backend/workers that use Drizzle ORM directly. Web apps should use the typed API clients instead.
