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

interface SmtpConfig {
  host: string;
  port: number;
}

function getSmtpConfig(): SmtpConfig | null {
  const host = typeof process !== 'undefined' && process.env?.SMTP_HOST;
  const port = typeof process !== 'undefined' && process.env?.SMTP_PORT;
  if (!host) return null;
  return { host, port: port ? parseInt(port, 10) : 1025 };
}

async function sendViaSmtp(smtp: SmtpConfig, options: SendEmailOptions): Promise<SendEmailResult> {
  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: false,
    tls: { rejectUnauthorized: false },
  });

  const info = await transporter.sendMail({
    from: options.from,
    to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: Buffer.from(a.content, 'base64'),
    })),
  });

  return { id: info.messageId };
}

export class EmailService {
  private readonly apiKey: string | null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const smtp = getSmtpConfig();
    if (smtp) {
      return sendViaSmtp(smtp, options);
    }

    if (!this.apiKey) {
      throw new Error('EmailService: no SMTP configured and no RESEND_API_KEY set — email not sent');
    }

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
