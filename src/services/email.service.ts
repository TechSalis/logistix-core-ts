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
const DEFAULT_SMTP_PORT = 1025;
const EMAIL_RETRY_MAX = 1;
const EMAIL_RETRY_BASE_MS = 1_000;

export interface SendEmailResult {
  id: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  user?: string;
  pass?: string;
}

function getSmtpConfig(): SmtpConfig | null {
  const host = typeof process !== 'undefined' && process.env?.SMTP_HOST;
  if (!host) return null;
  const port =
    typeof process !== 'undefined' && process.env?.SMTP_PORT
      ? parseInt(process.env.SMTP_PORT, 10)
      : DEFAULT_SMTP_PORT;
  const user = (typeof process !== 'undefined' && process.env?.SMTP_USER) || undefined;
  const pass = (typeof process !== 'undefined' && process.env?.SMTP_PASS) || undefined;
  return { host, port, user, pass };
}

async function sendViaSmtp(smtp: SmtpConfig, options: SendEmailOptions): Promise<SendEmailResult> {
  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
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

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableEmailError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const err = error as { code?: string; message?: string };
    const code = err.code ?? '';
    const msg = (err.message ?? '').toLowerCase();
    if (code === 'ECONNREFUSED' || code === 'ECONNRESET' || code === 'ETIMEDOUT') return true;
    if (msg.includes('timeout') || msg.includes('network')) return true;
  }
  return false;
}

export class EmailService {
  private readonly apiKey: string | null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= EMAIL_RETRY_MAX + 1; attempt++) {
      try {
        return await this.sendEmailOnce(options);
      } catch (error) {
        lastError = error;
        if (attempt > EMAIL_RETRY_MAX) break;
        if (!isRetryableEmailError(error)) break;
        const delay = EMAIL_RETRY_BASE_MS * Math.pow(2, attempt - 1);
        await sleep(delay);
      }
    }
    throw lastError;
  }

  private async sendEmailOnce(options: SendEmailOptions): Promise<SendEmailResult> {
    const smtp = getSmtpConfig();
    if (smtp) {
      return sendViaSmtp(smtp, options);
    }

    if (!this.apiKey) {
      throw new Error('EmailService: no SMTP configured and no API key set — email not sent');
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
      throw new Error(
        `EmailService: failed to send email via Resend (${res.status} ${res.statusText}): ${JSON.stringify(errorData)}`,
      );
    }

    return res.json() as Promise<SendEmailResult>;
  }
}
