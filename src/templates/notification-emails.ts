import { BRAND_NAME } from '../config.js';

type BreachSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

const FOOTER_STYLE = 'margin-top: 16px; color: #6b7280; font-size: 12px;';
const CARD_STYLE = 'background: #f3f4f6; border-radius: 8px; padding: 16px; margin: 16px 0;';

export function maintenanceEmailTemplate(
  companyName: string,
  startStr: string,
  startTimeStr: string,
  endTimeStr: string,
  duration: string,
  description: string,
): string {
  return `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
    <h2 style="color: #2563eb;">Scheduled Maintenance</h2>
    <p>Hi <b>${companyName}</b>,</p>
    <p>We wanted to let you know about upcoming scheduled maintenance for the ${BRAND_NAME} platform.</p>
    <div style="${CARD_STYLE}">
      <p style="margin: 0 0 8px;"><b>Date:</b> ${startStr}</p>
      <p style="margin: 0 0 8px;"><b>Time:</b> ${startTimeStr} — ${endTimeStr}</p>
      <p style="margin: 0;"><b>Expected Duration:</b> ${duration}</p>
    </div>
    <p><b>What to expect:</b></p>
    <ul>
      <li>The platform may be temporarily unavailable during the maintenance window</li>
      <li>Your existing deliveries and data will not be affected</li>
      <li>Mobile app offline mode will continue to work normally</li>
    </ul>
    <p><b>What's being done:</b></p>
    <p>${description}</p>
    <p style="${FOOTER_STYLE}">
      We recommend completing any urgent deliveries before the maintenance window begins.
      We'll send a confirmation once maintenance is complete.
    </p>
    <p style="${FOOTER_STYLE}">${BRAND_NAME} Team</p>
  </div>`;
}

export function breachEmailTemplate(
  companyName: string,
  breachId: string,
  severityLabel: string,
  detectedStr: string,
  detectedTimeStr: string,
  affectedDataTypes: string[],
  description: string,
  supportEmail: string,
): string {
  return `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
    <h2 style="color: #dc2626;">Security Incident Notification</h2>
    <p>Hi <b>${companyName}</b>,</p>
    <p>We are writing to inform you of a security incident that may have affected your data on the ${BRAND_NAME} platform.</p>
    <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="margin: 0 0 8px;"><b>Incident ID:</b> ${breachId}</p>
      <p style="margin: 0 0 8px;"><b>Severity:</b> ${severityLabel}</p>
      <p style="margin: 0 0 8px;"><b>Detected:</b> ${detectedStr} at ${detectedTimeStr}</p>
      <p style="margin: 0;"><b>Affected Data:</b> ${affectedDataTypes.join(', ') || 'Under investigation'}</p>
    </div>
    <p><b>What happened:</b></p>
    <p>${description}</p>
    <p><b>What we're doing:</b></p>
    <ul>
      <li>We have contained the incident and are conducting a thorough investigation</li>
      <li>We are implementing additional security measures to prevent recurrence</li>
      <li>We will provide updates as our investigation progresses</li>
    </ul>
    <p><b>What you can do:</b></p>
    <ul>
      <li>Review your account activity for any unauthorized changes</li>
      <li>Update your password if you haven't recently</li>
      <li>Contact us immediately if you notice any suspicious activity</li>
    </ul>
    <p style="margin-top: 24px;">
      <a href="mailto:${supportEmail}" style="background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Contact Support</a>
    </p>
    <p style="margin-top: 16px; color: #6b7280; font-size: 12px;">
      We take the security of your data very seriously and sincerely apologize for any inconvenience.
      ${BRAND_NAME} Team
    </p>
  </div>`;
}

export function getSeverityLabel(severity: BreachSeverity): string {
  switch (severity) {
    case 'CRITICAL':
      return 'Critical — Immediate Action Required';
    case 'HIGH':
      return 'High';
    case 'MEDIUM':
      return 'Medium';
    case 'LOW':
      return 'Low';
    default:
      return severity;
  }
}

export function formatDuration(start: Date, end: Date): string {
  const diffMs = end.getTime() - start.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) return `${minutes} minutes`;
  if (minutes === 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  return `${hours} hour${hours > 1 ? 's' : ''} and ${minutes} minutes`;
}
