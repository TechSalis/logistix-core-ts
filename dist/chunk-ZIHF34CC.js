import {
  ApprovalStatus,
  ChannelPlatform,
  ChannelType,
  DeliveryStatus,
  ExportDataType,
  FIFTEEN_MINUTES_MS,
  FIVE_MINUTES_MS,
  MS_PER_DAY,
  MetricDomain,
  MetricGranularity,
  PaymentMethod,
  REGIONAL_CONFIG,
  RiderStatus,
  SubscriptionStatus,
  SubscriptionTier,
  TransactionStatus,
  VehicleType,
} from './chunk-ZCLRRHR4.js';

// src/shared/utils/formatters.ts
function splitEnum(value) {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
function formatDeliveryStatus(status) {
  return formatEnumToTitleCase(status) || 'Unknown';
}
function formatEnumToTitleCase(value) {
  if (!value) return '';
  return splitEnum(value);
}

// src/shared/enums/enum-catalog.ts
function buildValues(enumObj) {
  return Object.values(enumObj).map((name) => ({
    name,
    label: formatEnumToTitleCase(name),
  }));
}
var ENUM_CATALOG = {
  exportDataTypes: buildValues(ExportDataType),
  vehicleTypes: buildValues(VehicleType),
  deliveryStatuses: buildValues(DeliveryStatus),
  riderStatuses: buildValues(RiderStatus),
  approvalStatuses: buildValues(ApprovalStatus),
  subscriptionTiers: buildValues(SubscriptionTier),
  subscriptionStatuses: buildValues(SubscriptionStatus),
  channelPlatforms: buildValues(ChannelPlatform),
  channelTypes: buildValues(ChannelType),
  paymentMethods: buildValues(PaymentMethod),
  transactionStatuses: buildValues(TransactionStatus),
  metricDomains: buildValues(MetricDomain),
  metricGranularities: buildValues(MetricGranularity),
};

// src/shared/config/brand.config.ts
var BRAND_DEFAULTS = {
  brandName: 'Logistix',
  trackingPrefix: 'LGX-',
};
function buildBrandConfig(overrides) {
  return {
    brandName: overrides?.brandName ?? process.env.BRAND_NAME ?? BRAND_DEFAULTS.brandName,
    trackingPrefix:
      overrides?.trackingPrefix ??
      process.env.BRAND_TRACKING_PREFIX ??
      BRAND_DEFAULTS.trackingPrefix,
  };
}
var _brand = null;
function getBrandConfig() {
  if (!_brand) _brand = buildBrandConfig();
  return _brand;
}
var BRAND = new Proxy(
  {},
  {
    get(_, prop) {
      return getBrandConfig()[prop];
    },
  },
);

// src/shared/config/delivery.config.ts
var ALLOWED_STATUS_TRANSITIONS = {
  ['PENDING' /* PENDING */]: ['ASSIGNED' /* ASSIGNED */, 'CANCELLED' /* CANCELLED */],
  ['ASSIGNED' /* ASSIGNED */]: [
    'IN_TRANSIT' /* IN_TRANSIT */,
    'PENDING' /* PENDING */,
    'CANCELLED' /* CANCELLED */,
  ],
  ['IN_TRANSIT' /* IN_TRANSIT */]: ['DELIVERED' /* DELIVERED */, 'CANCELLED' /* CANCELLED */],
  ['DELIVERED' /* DELIVERED */]: [],
  ['FAILED' /* FAILED */]: [],
  ['CANCELLED' /* CANCELLED */]: [],
};

// src/shared/config/pricing.config.ts
var DEFAULT_PRICING_SCHEMES = [
  { vehicleType: 'BIKE' /* BIKE */, baseFare: 2e4, perKmRate: 2e4, minFare: 2e4 },
];

// src/shared/config/client.config.ts
var rawClientConfig = {
  pollIntervals: {
    // Normal: lazy background sync cadence. SSE carries live updates, so a
    // coarse 60-min poll is the safety net, not the live path.
    normalMs: 36e5,
    // 60 min — business web dispatcher sync cadence
    // Degraded: FASTER retry when syncs fail (SSE down / repeated errors), so
    // the client recovers sooner once the connection is back.
    degradedMs: 9e5,
    // 15 min — failure-recovery retry cadence
  },
};
var CLIENT_CONFIG = rawClientConfig;

// src/shared/config/export.config.ts
var VALID_DATA_TYPES = ['DELIVERIES' /* DELIVERIES */, 'BILLING' /* BILLING */, 'CHAT' /* CHAT */];
var MONTH_REQUIRED_TYPES = /* @__PURE__ */ new Set([
  'DELIVERIES' /* DELIVERIES */,
  'BILLING' /* BILLING */,
]);

// src/shared/config/metrics.config.ts
var LIFETIME_BUCKET_START = '1970-01-01';
var METRICS_RETENTION = {
  ['DAY' /* DAY */]: { retainFor: 90, unit: 'days', foldTo: 'WEEK' /* WEEK */ },
  ['WEEK' /* WEEK */]: { retainFor: 12, unit: 'months', foldTo: 'MONTH' /* MONTH */ },
  ['MONTH' /* MONTH */]: {
    retainFor: 5 * 12,
    unit: 'months',
    foldTo: 'LIFETIME' /* LIFETIME */,
  },
  ['LIFETIME' /* LIFETIME */]: {
    retainFor: Number.POSITIVE_INFINITY,
    unit: 'months',
    foldTo: null,
  },
};
var METRICS_FOLD_CHAIN = ['DAY' /* DAY */, 'WEEK' /* WEEK */, 'MONTH' /* MONTH */];
var METRIC_DOMAIN_MAPPINGS = [
  {
    domain: 'DELIVERIES' /* DELIVERIES */,
    columns: [
      'totalCount',
      'deliveredCount',
      'cancelledCount',
      'failedCount',
      'totalRevenueKobo',
      'avgDeliveryTimeMinutes',
      'channelBreakdown',
      'peakHour',
      'uniqueRidersActive',
    ],
    extraMetricKeys: ['prepaidCount', 'payOnDeliveryCount'],
  },
  {
    domain: 'CONVERSATIONS' /* CONVERSATIONS */,
    columns: ['totalCount', 'channelBreakdown'],
    extraMetricKeys: [
      'activeCount',
      'messagesReceived',
      'messagesSent',
      'escalatedCount',
      'avgFirstResponseMinutes',
    ],
  },
  {
    domain: 'RIDERS' /* RIDERS */,
    columns: ['totalCount', 'deliveredCount', 'uniqueRidersActive'],
    extraMetricKeys: ['approvedCount', 'pendingCount', 'suspendedCount'],
  },
  {
    domain: 'REVENUE' /* REVENUE */,
    columns: ['totalCount', 'totalRevenueKobo', 'channelBreakdown'],
    extraMetricKeys: ['refundedKobo', 'avgTransactionValueKobo'],
  },
];
function granularityForWindowDays(days) {
  if (days <= METRICS_RETENTION['DAY' /* DAY */].retainFor) {
    return 'DAY' /* DAY */;
  }
  if (days <= METRICS_RETENTION['WEEK' /* WEEK */].retainFor * 30) {
    return 'WEEK' /* WEEK */;
  }
  return 'MONTH' /* MONTH */;
}

// src/shared/config/security.config.ts
var rawSecurityConfig = {
  rateLimits: {
    global: { max: 1e3, windowMs: 6e4 },
    auth: { max: 15, windowMs: FIFTEEN_MINUTES_MS },
    login: { max: 10, windowMs: FIVE_MINUTES_MS },
    register: { max: 3, windowMs: 36e5 },
    tiers: {
      ['STARTER' /* STARTER */]: { max: 500, windowMs: FIFTEEN_MINUTES_MS },
      ['PROFESSIONAL' /* PROFESSIONAL */]: { max: 2e3, windowMs: FIFTEEN_MINUTES_MS },
    },
  },
  jwt: {
    jwtExpiresIn: '1h',
    jwtRefreshExpiresIn: '30d',
  },
  blocks: {
    temporaryLadderMs: [36e5, 6 * 36e5, 24 * 36e5],
    escalateAfterBlocks: 3,
    escalationWindowMs: 7 * MS_PER_DAY,
    persistentEscalatedMs: 7 * MS_PER_DAY,
    maxPersistentMs: 90 * MS_PER_DAY,
  },
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'",
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self)',
    'X-DNS-Prefetch-Control': 'off',
  },
  maliciousPatterns: [
    /(?:wp-admin|wordpress|\.env|\.php$|phpmyadmin|admin\.php|config\.php|\.git|\.svn|\.\.|etc\/passwd|proc\/self|windows\/system32|union\s+select|drop\s+table|insert\s+into|delete\s+from|<script|javascript:|onload=|onerror=)/i,
  ],
  validation: {
    maxEmailLength: 254,
    maxPasswordLength: 128,
    maxNameLength: 150,
    maxDescriptionLength: 1e3,
    maxPhoneLength: 20,
    maxAddressLength: 300,
    securityPinMinRange: 1e5,
    securityPinMaxRange: 999999,
  },
};
var SECURITY_CONFIG = rawSecurityConfig;

// src/shared/config/session.config.ts
var rawSessionConfig = {
  // Max concurrent refresh sessions per user. Covers desktop + phone + one
  // re-login. Users needing more can contact support.
  maxActiveSessions: 3,
  pruneRetentionDays: 30,
};
var SESSION_CONFIG = rawSessionConfig;

// src/shared/utils/geo.ts
var EARTH_RADIUS_M = 6371e3;
function haversineDistanceMeters(lat1, lng1, lat2, lng2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_M * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function haversineDistanceKm(lat1, lng1, lat2, lng2, routingFactor = 1.3) {
  const meters = haversineDistanceMeters(lat1, lng1, lat2, lng2);
  return (meters / 1e3) * routingFactor;
}

// src/shared/utils/metrics.ts
function mergeChannelCounts(prev, next) {
  const merged = { ...(prev ?? {}) };
  for (const [key, value] of Object.entries(next ?? {})) {
    merged[key] = (merged[key] ?? 0) + value;
  }
  return merged;
}

// src/shared/utils/meta-graph.ts
function computeExpiresAt(expiresInSeconds) {
  return Date.now() + expiresInSeconds * 1e3;
}
function parseGraphError(raw) {
  if (raw && typeof raw === 'object') {
    const error = raw.error;
    if (error && typeof error === 'object') {
      const parts = [];
      if (typeof error.type === 'string') parts.push(error.type);
      if (typeof error.code === 'number' || typeof error.code === 'string')
        parts.push(String(error.code));
      if (typeof error.message === 'string') parts.push(error.message);
      if (parts.length > 0) return parts.join(': ');
    }
  }
  return 'Meta Graph API error';
}

// src/shared/utils/tracking.ts
var TRACKING_ID_PREFIX = BRAND.trackingPrefix;
var TRACKING_ID_SUFFIX_LENGTH = 6;
var TRACKING_ID_LENGTH = TRACKING_ID_PREFIX.length + TRACKING_ID_SUFFIX_LENGTH;
var TRACKING_ID_CHARS = '2-9A-HJ-NP-Z';
var TRACKING_ID_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

// src/shared/utils/timezone.ts
function offsetAtNoonUtc(year, monthIndex, day, timezone) {
  const candidate = new Date(Date.UTC(year, monthIndex, day, 12, 0, 0, 0));
  const tzParts = candidate.toLocaleString('sv-SE', { timeZone: timezone }).split(' ');
  const [tzHour, tzMin] = tzParts[1].split(':').map(Number);
  return ((tzHour - 12) * 3600 + tzMin * 60) * 1e3;
}
function monthStartInTimezone(year, monthIndex, timezone) {
  return new Date(
    Date.UTC(year, monthIndex, 1, 0, 0, 0, 0) - offsetAtNoonUtc(year, monthIndex, 1, timezone),
  );
}
function currentYearMonthInTimezone(timezone) {
  const now = /* @__PURE__ */ new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
  });
  const [year, month] = formatter.format(now).split('-').map(Number);
  return [year, month - 1];
}
function getMonthStartInTimezone(timezone = REGIONAL_CONFIG.timeZone) {
  const [year, monthIndex] = currentYearMonthInTimezone(timezone);
  return monthStartInTimezone(year, monthIndex, timezone);
}
function getStartOfDayInTimezone(timezone = REGIONAL_CONFIG.timeZone) {
  const now = /* @__PURE__ */ new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [year, month, day] = formatter.format(now).split('-').map(Number);
  const offsetMs = offsetAtNoonUtc(year, month - 1, day, timezone);
  return new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - offsetMs);
}
function getDayBoundsInTimezone(date, timezone = REGIONAL_CONFIG.timeZone) {
  const instant = date instanceof Date ? date : new Date(date);
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const [year, month, day] = formatter.format(instant).split('-').map(Number);
  const offsetMs = offsetAtNoonUtc(year, month - 1, day, timezone);
  return {
    start: new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0) - offsetMs),
    end: new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999) - offsetMs),
  };
}
function getDateStringInTimezone(date, timezone = REGIONAL_CONFIG.timeZone) {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}
function getRetentionCutoff(retentionMonths, timezone = REGIONAL_CONFIG.timeZone) {
  const [year, monthIndex] = currentYearMonthInTimezone(timezone);
  const totalMonths = year * 12 + monthIndex - retentionMonths;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonthIndex = totalMonths - targetYear * 12;
  return monthStartInTimezone(targetYear, targetMonthIndex, timezone);
}

export {
  formatDeliveryStatus,
  formatEnumToTitleCase,
  ENUM_CATALOG,
  buildBrandConfig,
  BRAND,
  ALLOWED_STATUS_TRANSITIONS,
  DEFAULT_PRICING_SCHEMES,
  CLIENT_CONFIG,
  VALID_DATA_TYPES,
  MONTH_REQUIRED_TYPES,
  LIFETIME_BUCKET_START,
  METRICS_RETENTION,
  METRICS_FOLD_CHAIN,
  METRIC_DOMAIN_MAPPINGS,
  granularityForWindowDays,
  SECURITY_CONFIG,
  SESSION_CONFIG,
  haversineDistanceMeters,
  haversineDistanceKm,
  mergeChannelCounts,
  computeExpiresAt,
  parseGraphError,
  TRACKING_ID_PREFIX,
  TRACKING_ID_SUFFIX_LENGTH,
  TRACKING_ID_LENGTH,
  TRACKING_ID_CHARS,
  TRACKING_ID_ALPHABET,
  getMonthStartInTimezone,
  getStartOfDayInTimezone,
  getDayBoundsInTimezone,
  getDateStringInTimezone,
  getRetentionCutoff,
};
