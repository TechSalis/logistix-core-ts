import { fetchWithTimeout } from '../fetch-with-timeout.js';

export interface EmailAttachment {
  filename: string;
  content: string;
}

export interface SendEmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  attachments?: EmailAttachment[];
}

const RESEND_API_URL = 'https://api.resend.com/emails';

export interface SendEmailResult {
  id: string;
}

export class EmailService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('EmailService requires a valid API key');
    }
    this.apiKey = apiKey;
  }

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const res = await fetchWithTimeout(RESEND_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Failed to send email: ${res.statusText} - ${JSON.stringify(errorData)}`);
    }

    return res.json() as Promise<SendEmailResult>;
  }
}
