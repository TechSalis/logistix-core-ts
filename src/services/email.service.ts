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
  const rejectUnauthorized =
    typeof process !== 'undefined' && process.env?.SMTP_REJECT_UNAUTHORIZED === 'false'
      ? false
      : true;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined,
    tls: { rejectUnauthorized },
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
  async sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= EMAIL_RETRY_MAX + 1; attempt++) {
      try {
        const smtp = getSmtpConfig();
        if (!smtp) throw new Error('EmailService: no SMTP configured — email not sent');
        return await sendViaSmtp(smtp, options);
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
}
