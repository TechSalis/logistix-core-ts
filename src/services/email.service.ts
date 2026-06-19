export interface SendEmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

export class EmailService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('EmailService requires a valid API key');
    }
    this.apiKey = apiKey;
  }

  async sendEmail(options: SendEmailOptions) {
    const res = await fetch('https://api.resend.com/emails', {
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
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Failed to send email: ${res.statusText} - ${JSON.stringify(errorData)}`);
    }

    return res.json();
  }
}
