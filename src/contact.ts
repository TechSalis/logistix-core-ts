import { EmailService } from './services/email.service.js';
import { ContactCategory, LEAD_CATEGORIES } from './enums.js';
import { submitterAckTemplate } from './templates/contact-email.js';
import { SYSTEM_CONFIG } from './config.js';
import { fetchWithTimeout } from './fetchWithTimeout.js';

export interface ContactSubmission {
  email: string;
  name: string;
  category: ContactCategory;
  message: string;
}

export interface ContactNotifierOptions {
  resendApiKey: string;
  googleLeadsUrl?: string;
  fromEmail?: string;
}

export async function sendContactSubmissionAck(
  submission: ContactSubmission,
  options: ContactNotifierOptions,
): Promise<void> {
  const { email, name, category, message } = submission;
  const { resendApiKey, googleLeadsUrl, fromEmail = SYSTEM_CONFIG.supportEmail } = options;

  const emailService = new EmailService(resendApiKey);

  await emailService.sendEmail({
    from: fromEmail,
    to: email,
    subject: 'We received your request',
    html: submitterAckTemplate(name, category, message),
  });

  if (googleLeadsUrl && LEAD_CATEGORIES.has(category)) {
    try {
      await fetchWithTimeout(googleLeadsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName: name,
          data: JSON.stringify({ category, message, type: 'contact_form' }),
          action: 'contact_request',
        }),
      });
    } catch {
      // Google Leads is a best-effort downstream — failure must not block the acknowledgement email
    }
  }
}
