import { eq } from 'drizzle-orm';
import {
  BRAND_NAME,
  EmailService,
  EntityType,
  EventType,
  SubscriptionStatus,
  companies,
  companySettings,
  dispatchers,
  eventLogs,
} from './index.js';
import type { SystemConfig } from './config.js';
import {
  maintenanceEmailTemplate,
  breachEmailTemplate,
  getSeverityLabel,
  formatDuration,
} from './templates/notification-emails.js';

// ─── Shared Types ─────────────────────────────────────────────────────────────

export type BreachSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface CompanyRecipient {
  company_id: string;
  company_name: string;
  contact_email: string;
}

export interface MaintenanceWindow {
  startTime: Date;
  endTime: Date;
  description: string;
}

export interface BreachIncident {
  id: string;
  description: string;
  severity: BreachSeverity;
  detectedAt: Date;
  affectedDataTypes: string[];
}

// Re-export template helpers for consumers that need them
export { getSeverityLabel, formatDuration } from './templates/notification-emails.js';

/**
 * Minimal Drizzle database interface used by notification queries.
 * Compatible with both `drizzle-orm/node-postgres` and `drizzle-orm/postgres-js`.
 */
 
type DrizzleDB = { select: any; insert: any };

// ─── DB Queries ───────────────────────────────────────────────────────────────

/**
 * Fetch all active companies with their owner dispatcher email.
 * Shared by both workers (with batching) and backend (single-shot).
 */
export async function fetchActiveCompanyRecipients(
  db: DrizzleDB,
  limit?: number,
): Promise<CompanyRecipient[]> {
  const query = db
    .select({
      company_id: companySettings.companyId,
      company_name: companies.name,
      contact_email: dispatchers.email,
    })
    .from(companySettings)
    .innerJoin(companies, eq(companies.id, companySettings.companyId))
    .leftJoin(dispatchers, eq(dispatchers.companyId, companySettings.companyId))
    .where(eq(companySettings.subscriptionStatus, SubscriptionStatus.ACTIVE));

  const result = limit ? await query.limit(limit) : await query;
  return result as unknown as CompanyRecipient[];
}

// ─── Maintenance Notifications ────────────────────────────────────────────────

export async function sendMaintenanceNotification(
  emailService: EmailService,
  config: SystemConfig,
  recipient: CompanyRecipient,
  window: MaintenanceWindow,
): Promise<void> {
  const startStr = window.startTime.toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const startTimeStr = window.startTime.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
  const endTimeStr = window.endTime.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  await emailService.sendEmail({
    from: `${BRAND_NAME} Team <${config.supportEmail}>`,
    to: [recipient.contact_email],
    subject: `Scheduled Maintenance — ${BRAND_NAME}`,
    html: maintenanceEmailTemplate(
      recipient.company_name,
      startStr,
      startTimeStr,
      endTimeStr,
      formatDuration(window.startTime, window.endTime),
      window.description,
    ),
  });
}

// ─── Breach Notifications ─────────────────────────────────────────────────────

export async function logBreachIncident(db: DrizzleDB, incident: BreachIncident): Promise<void> {
  await db.insert(eventLogs).values({
    entityType: EntityType.COMPANY,
    entityId: incident.id,
    eventType: EventType.SECURITY_INCIDENT,
    payload: {
      breach_id: incident.id,
      description: incident.description,
      severity: incident.severity,
      detected_at: incident.detectedAt.toISOString(),
      affected_data_types: incident.affectedDataTypes,
      notification_sent: true,
      notification_sent_at: new Date().toISOString(),
    },
  });
}

export async function sendBreachNotification(
  emailService: EmailService,
  config: SystemConfig,
  recipient: CompanyRecipient,
  incident: BreachIncident,
): Promise<void> {
  const severityLabel = getSeverityLabel(incident.severity);
  const detectedStr = incident.detectedAt.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const detectedTimeStr = incident.detectedAt.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  await emailService.sendEmail({
    from: `${BRAND_NAME} Team <${config.supportEmail}>`,
    to: [recipient.contact_email],
    subject: `Security Incident Notification — ${BRAND_NAME}`,
    html: breachEmailTemplate(
      recipient.company_name,
      incident.id,
      severityLabel,
      detectedStr,
      detectedTimeStr,
      incident.affectedDataTypes,
      incident.description,
      config.supportEmail,
    ),
  });
}
