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
| `UserRole`                 | ADMIN, COMPANY, DISPATCHER, RIDER, CUSTOMER                 |
| `DeliveryStatus`           | PENDING, AWAITING_PAYMENT, ASSIGNED, IN_TRANSIT, DELIVERED, CANCELLED |
| `RiderStatus`              | ONLINE, OFFLINE, BUSY                                       |
| `PaymentMethod`            | PREPAID, POD                                                |
| `ApprovalStatus`           | PENDING, APPROVED, REJECTED                                 |
| `EntityType`               | Delivery, Rider, Company, etc.                              |
| `ChannelPlatform`          | WHATSAPP, TELEGRAM, WEB, etc.                               |
| `NodeEnv`                  | DEVELOPMENT, STAGING, PRODUCTION                            |
| `VehicleType`              | BIKE, VAN, TRUCK, etc.                                      |
| `SubscriptionTier`         | FREE, STARTER, GROWTH, ENTERPRISE                           |
| `SubscriptionStatus`       | ACTIVE, PAST_DUE, CANCELLED, etc.                           |
| `TransactionStatus`        | PENDING, COMPLETED, FAILED, etc.                            |
| `TransactionType`          | CREDIT, DEBIT, etc.                                         |
| `LedgerAdjustmentType`     | SUBSCRIPTION, PAYOUT, CHANNEL_FEE, etc.                     |
| `ChannelType`              | COMPANY_OWNED, SYSTEM_OWNED                                 |
| `Currency`                 | NGN, USD, etc.                                              |
| `PaymentProvider`          | PAYSTACK, SQUAD, etc.                                       |
| `EventType`                | All system event types                                      |
| `SubscriptionEventType`    | Subscription lifecycle events                               |
| `NotificationEventType`    | Notification trigger types                                  |
| `NotificationPriority`     | LOW, NORMAL, HIGH, URGENT                                   |
| `UserAuditAction`          | LOGIN, LOGOUT, PASSWORD_CHANGE, etc.                        |
| `ChatUpdateType`           | MESSAGE, TYPING, READ, etc.                                 |
| `MessageStatus`            | SENT, DELIVERED, READ, FAILED                               |
| `EscalationStatus`         | OPEN, IN_PROGRESS, RESOLVED, etc.                           |
| `EscalatedTo`              | DISPATCHER, ADMIN, etc.                                     |
| `SenderType`               | CUSTOMER, RIDER, DISPATCHER, SYSTEM, AI                     |
| `ExportRequestStatus`      | PENDING, PROCESSING, COMPLETED, FAILED                      |
| `SecurityEventType`        | RATE_LIMIT, BRUTE_FORCE, INJECTION, etc.                    |
| `SecuritySeverity`         | LOW, MEDIUM, HIGH, CRITICAL                                 |
| `ErrorCode`                | Standardized error codes                                    |
| `SystemStatus`             | HEALTHY, DEGRADED, DOWN                                     |
| `ComponentStatus`          | UP, DEGRADED, DOWN                                          |
| `LlmRole`                  | SYSTEM, USER, ASSISTANT                                     |
| `ProviderRole`             | PRIMARY, FALLBACK, etc.                                     |
| `ProviderCapability`       | CHAT, VISION, EMBEDDING, etc.                               |
| `LogLevel`                 | DEBUG, INFO, WARN, ERROR, CRITICAL                          |
| `ApiTag`                   | API route tags                                              |
| `UpdateReason`             | EDIT, SCHEDULE, CANCEL, etc.                                |
| `SseEventType`             | MESSAGE, STATUS_CHANGE, TRACKING, etc.                      |
| `JwtTokenType`             | ACCESS, REFRESH, SSE, OTP                                   |
| `ContactCategory`          | GENERAL, SUPPORT, BILLING, etc.                             |

**Enum helpers:**

| Export               | Type       | Description                                        |
|----------------------|------------|----------------------------------------------------|
| `isDeliveryTerminal()` | `function` | Returns `true` for DELIVERED / CANCELLED statuses |
| `safeEnumValue()`    | `function`  | Safely parses a string into an enum value          |

### Config

| Export                   | Type       | Description                                  |
|--------------------------|------------|----------------------------------------------|
| `buildSystemConfig()`   | `function` | Factory for browser/custom env contexts      |
| `DEFAULT_WORKING_HOURS` | `object`   | Default working hours config                 |
| `BRAND_NAME`            | `string`   | Default brand name (`'Logistix AI'`)         |
| `DELETED_USER_SENTINEL` | `string`   | Sentinel ID for soft-deleted users           |

### Regional

| Export             | Type                | Description                              |
|--------------------|---------------------|------------------------------------------|
| `REGIONAL_CONFIG`  | `RegionalConfig`    | Timezone, states, country code — SSOT    |

### Limits

| Export           | Type                | Description                              |
|------------------|---------------------|------------------------------------------|
| `LIMITS_CONFIG`  | `LimitsConfig`      | Centralized limits (pagination, search, etc.) |
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
| `MS_PER_DAY`                 | `number`   | Milliseconds per day constant                |
| `getSubscriptionPrice()`     | `function` | Calculates subscription price for a tier     |
| `formatAmount()`             | `function` | Formats an amount in kobo to display string  |
| `formatNaira()`              | `function` | Formats a number as ₦ display string         |
| `isBillableTier()`           | `function` | Checks if a tier requires payment            |
| `shouldBillNow()`            | `function` | Checks if billing should trigger now         |
| `shouldRetryPayment()`       | `function` | Checks if a failed payment should be retried |
| `getNextRetryDate()`         | `function` | Returns the next retry date                  |
| `computeAllocationTargets()` | `function` | Computes payment allocation targets          |

### Security

| Export              | Type                | Description                              |
|---------------------|---------------------|------------------------------------------|
| `SECURITY_CONFIG`   | `SecurityConfig`    | Rate limits, thresholds, ban policy      |

### Pricing

| Export                     | Type                | Description                          |
|----------------------------|---------------------|--------------------------------------|
| `DEFAULT_PRICING_SCHEMES`  | `PricingSchemeDefaults` | Default pricing per vehicle type  |

### AI

| Export        | Type        | Description                          |
|---------------|-------------|--------------------------------------|
| `AI_CONFIG`   | `AIConfig`  | AI provider config, limits, timeouts |

### Utilities

| Export                   | Type       | Description                                  |
|--------------------------|------------|----------------------------------------------|
| `fetchWithTimeout()`     | `function` | Fetch with configurable timeout              |
| `extractErrorMessage()`  | `function` | Extracts error message from unknown throwables |

### Formatters

| Export                    | Type       | Description                                  |
|---------------------------|------------|----------------------------------------------|
| `formatDeliveryStatus()`  | `function` | Formats DeliveryStatus enum to display text  |
| `formatEnumToTitleCase()` | `function` | Formats any enum value to Title Case         |

### Contact Form

| Export                       | Type       | Description                                  |
|------------------------------|------------|----------------------------------------------|
| `sendContactSubmissionAck()` | `function` | Sends acknowledgement email for contact form |

### Notifications

| Export                          | Type       | Description                                  |
|---------------------------------|------------|----------------------------------------------|
| `fetchActiveCompanyRecipients()` | `function` | Fetches active notification recipients      |
| `sendMaintenanceNotification()` | `function` | Sends maintenance window notification        |
| `sendBreachNotification()`      | `function` | Sends security breach notification           |
| `logBreachIncident()`           | `function` | Logs a breach incident                       |
| `sendSettlementReceipt()`       | `function` | Sends settlement receipt email               |
| `getSeverityLabel()`            | `function` | Maps severity enum to human-readable label   |
| `formatDuration()`              | `function` | Formats milliseconds to human-readable duration |
| `settlementReceiptEmailTemplate()` | `function` | Returns HTML email template for settlements |

### Offline / Local-First

| Export            | Type     | Description                              |
|-------------------|----------|------------------------------------------|
| `OFFLINE_DB_NAME` | `string` | IndexedDB database name for offline mode |

### Tracking

| Export                       | Type     | Description                              |
|------------------------------|----------|------------------------------------------|
| `TRACKING_ID_PREFIX`         | `string` | `'LGX-'` prefix for tracking IDs        |
| `TRACKING_ID_SUFFIX_LENGTH`  | `number` | Length of the random suffix              |
| `TRACKING_ID_LENGTH`         | `number` | Total tracking ID length                 |
| `TRACKING_ID_CHARS`          | `string` | Character set for random suffix          |

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

- **Tables:** `companies`, `companySettings`, `companyChannels`, `conversations`, `messages`, `admins`, `dispatchers`, `blockedIps`, `deliveries`, `riders`, `transactions`, `deliveryAllocations`, `ledgerTransactions`, `eventLogs`, `exportRequests`, `escalations`, `companyDailyMetrics`, `riderLocationLogs`
- **pgEnums:** `deliveryStatus`, `exportRequestStatus`, `ledgerAdjustmentType`, `channelPlatform`, `messageStatus`, `paymentMethod`, `approvalStatus`, `riderStatus`, `senderType`, `subscriptionTier`, `transactionStatus`, `transactionType`, `vehicleType`, `paymentProvider`, `subscriptionStatus`, `channelType`, `escalatedTo`, `escalationStatus`, `eventType`, `entityType`, `currencyEnum`
- **Relations:** All table relations for query building

> **Note:** Drizzle exports are primarily for backend/workers that use Drizzle ORM directly. Web apps should use the typed API clients instead.
