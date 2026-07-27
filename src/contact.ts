import { EmailService } from './services/email.service.js';
import { ContactCategory, LEAD_CATEGORIES } from './enums.js';
import { submitterAckTemplate } from './templates/contact-email.js';
import { SHARED_SYSTEM_CONFIG } from './config.js';
import { fetchWithTimeout } from './fetch-with-timeout.js';

const CONTACT_FORM_TYPE = 'contact_form';
const CONTACT_REQUEST_ACTION = 'contact_request';

export interface ContactSubmission {
  email: string;
  name: string;
  category: ContactCategory;
  message: string;
}

export interface ContactNotifierOptions {
  googleLeadsUrl?: string;
  fromEmail?: string;
}

export async function sendContactSubmissionAck(
  submission: ContactSubmission,
  options: ContactNotifierOptions,
): Promise<void> {
  const { email, name, category, message } = submission;
  const { googleLeadsUrl, fromEmail = SHARED_SYSTEM_CONFIG.supportEmail } = options;

  const emailService = new EmailService();

  try {
    await emailService.sendEmail({
      from: fromEmail,
      to: email,
      subject: 'We received your request',
      html: submitterAckTemplate(name, category, message),
    });
  } catch {
    // Fire-and-forget: contact ack email failure should not block the user
  }

  if (googleLeadsUrl && LEAD_CATEGORIES.has(category)) {
    try {
      await fetchWithTimeout(googleLeadsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName: name,
          data: JSON.stringify({ category, message, type: CONTACT_FORM_TYPE }),
          action: CONTACT_REQUEST_ACTION,
        }),
      });
    } catch {
      // Non-blocking: Google Leads submission failure is expected when URL is invalid or network issues.
    }
  }
}
