import { withRetry, RETRYABLE_NETWORK_ERROR_CODES } from '../shared/utils/retry.js';

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

const DEFAULT_SMTP_PORT = 1025;

interface SendEmailResult {
  id: string;
}

export interface SmtpConfig {
  host: string;
  port: number;
  user?: string;
  pass?: string;
}

export interface SmtpEnvVars {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
}

export function buildSmtpConfig(env: SmtpEnvVars): SmtpConfig | null {
  if (!env.SMTP_HOST) return null;
  const port = env.SMTP_PORT ? parseInt(env.SMTP_PORT, 10) : DEFAULT_SMTP_PORT;
  return {
    host: env.SMTP_HOST,
    port,
    user: env.SMTP_USER || undefined,
    pass: env.SMTP_PASS || undefined,
  };
}

function getSmtpConfig(): SmtpConfig | null {
  return typeof process !== 'undefined' ? buildSmtpConfig(process.env) : null;
}

async function sendViaSmtp(smtp: SmtpConfig, options: SendEmailOptions): Promise<SendEmailResult> {
  const nodemailer = await import('nodemailer');
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
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

function isRetryableEmailError(error: unknown): boolean {
  if (error && typeof error === 'object') {
    const err = error as { code?: string; message?: string };
    const code = err.code ?? '';
    const msg = (err.message ?? '').toLowerCase();
    if (RETRYABLE_NETWORK_ERROR_CODES.has(code)) return true;
    if (msg.includes('timeout') || msg.includes('network')) return true;
  }
  return false;
}

export class EmailService {
  constructor(private readonly smtp?: SmtpConfig | null) {}

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    const smtp = this.smtp !== undefined ? this.smtp : getSmtpConfig();
    if (!smtp) throw new Error('EmailService: no SMTP configured — email not sent');

    return withRetry(() => sendViaSmtp(smtp, options), {
      maxRetries: 2,
      baseMs: 1_000,
      isRetryable: isRetryableEmailError,
      label: 'email.sendEmail',
    });
  }
}
