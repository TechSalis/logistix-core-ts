import { buildSystemConfig } from '../config.js';
import { ContactCategory } from '../enums.js';

const SYSTEM_CONFIG = buildSystemConfig({ domain: process.env.DOMAIN ?? '' });

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const style = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background: #f5f5f5; }
  .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
  .card { background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
  .header { padding: 32px 32px 0; }
  .logo { width: 32px; height: 32px; background: #7c3aed; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; }
  .logo-text { color: #fff; font-size: 16px; font-weight: 800; letter-spacing: -0.5px; }
  .brand { font-size: 18px; font-weight: 700; color: #0f172a; margin-left: 8px; }
  .body-content { padding: 24px 32px 32px; }
  .label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .value { font-size: 15px; color: #0f172a; margin-bottom: 20px; }
  .message-box { background: #f8fafc; border-radius: 8px; padding: 16px; font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 24px; }
  .divider { height: 1px; background: #e2e8f0; margin: 24px 0; }
  .footer { padding: 0 32px 32px; text-align: center; }
  .footer-text { font-size: 12px; color: #94a3b8; }
  .highlight { color: #7c3aed; font-weight: 600; }
  .check { display: inline-block; width: 48px; height: 48px; background: #ecfdf5; border-radius: 50%; line-height: 48px; text-align: center; font-size: 24px; margin-bottom: 16px; }
`;

export function submitterAckTemplate(
  name: string,
  category: ContactCategory,
  message: string,
): string {
  const enc = (s: string) => escapeHtml(s);
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${style}</style></head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <table><tr>
          <td><div class="logo"><span class="logo-text">L</span></div></td>
          <td><span class="brand">Logistix</span></td>
        </tr></table>
      </div>
      <div class="body-content">
        <div class="check">✓</div>
        <h2 style="margin:0 0 4px;font-size:20px;color:#0f172a;">We received your request</h2>
        <p style="margin:0 0 24px;font-size:14px;color:#64748b;">Thanks for reaching out, ${enc(name)}. Here's what we got:</p>

        <div class="label">Category</div>
        <div class="value">${enc(category)}</div>

        <div class="label">Your message</div>
        <div class="message-box">${enc(message).replace(/\n/g, '<br>')}</div>

        <p style="font-size:14px;color:#64748b;">Our team will review your request and get back to you shortly.</p>

        <div class="divider"></div>
        <p style="font-size:13px;color:#64748b;margin:0;">In the meantime, visit our <a href="https://${SYSTEM_CONFIG.domain}" style="color:#7c3aed;text-decoration:none;font-weight:600;">help center</a> for answers to common questions.</p>
      </div>
    </div>
    <div class="footer">
      <p class="footer-text">Logistix Inc. &bull; Lagos, Nigeria</p>
    </div>
  </div>
</body></html>`;
}
