import { EmailService } from './services/email.service';
import { ContactCategory, LEAD_CATEGORIES } from './enums';
import { submitterAckTemplate } from './templates/contact-email';

export interface ContactSubmission {
  email: string;
  name: string;
  category: string;
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
  const { resendApiKey, googleLeadsUrl, fromEmail = 'contact@logistix.team' } = options;

  const emailService = new EmailService(resendApiKey);

  await emailService.sendEmail({
    from: fromEmail,
    to: email,
    subject: 'We received your request',
    html: submitterAckTemplate(name, category, message),
  });

  if (googleLeadsUrl && LEAD_CATEGORIES.has(category as ContactCategory)) {
    await fetch(googleLeadsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        fullName: name,
        data: JSON.stringify({ category, message, type: 'contact_form' }),
        action: 'contact_request',
      }),
    });
  }
}
