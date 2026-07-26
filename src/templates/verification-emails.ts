import { BRAND_NAME } from '../config.js';
import { HQ_LOCATION } from '../regional.js';

const FOOTER_STYLE = 'margin-top: 16px; color: #6b7280; font-size: 12px;';
const CARD_STYLE = 'background: #f3f4f6; border-radius: 8px; padding: 16px; margin: 16px 0;';

export function verificationApprovedTemplate(companyName: string): string {
  return `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
    <h2 style="color: #16a34a;">Verification Approved</h2>
    <p>Hi <b>${companyName}</b>,</p>
    <p>Great news! Your company has been verified on the ${BRAND_NAME} platform.</p>
    <div style="${CARD_STYLE}">
      <p style="margin: 0 0 8px;"><b>Status:</b> Verified</p>
      <p style="margin: 0 0 8px;"><b>Trial:</b> 14-day free trial has started</p>
      <p style="margin: 0;"><b>What's next:</b> Full access to all platform features</p>
    </div>
    <p>Your 14-day free trial has begun. During this period you can explore all features of the platform. You can upgrade or cancel at any time from your dashboard.</p>
    <p style="${FOOTER_STYLE}">
      If you have any questions, feel free to reach out to our support team.
    </p>
    <p style="${FOOTER_STYLE}">${BRAND_NAME} Team<br/>${HQ_LOCATION}</p>
  </div>`;
}

export function verificationRejectedTemplate(companyName: string, reason?: string): string {
  const reasonSection = reason
    ? `<div style="${CARD_STYLE}">
      <p style="margin: 0 0 4px;"><b>Reason:</b></p>
      <p style="margin: 0;">${reason}</p>
    </div>`
    : '';

  return `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
    <h2 style="color: #dc2626;">Verification Rejected</h2>
    <p>Hi <b>${companyName}</b>,</p>
    <p>We regret to inform you that your company verification on the ${BRAND_NAME} platform was not approved.</p>
    ${reasonSection}
    <p>If you believe this was an error or have additional information to support your verification, please contact our support team. You may reapply once you have addressed the issues raised.</p>
    <p style="${FOOTER_STYLE}">
      We appreciate your understanding.
    </p>
    <p style="${FOOTER_STYLE}">${BRAND_NAME} Team<br/>${HQ_LOCATION}</p>
  </div>`;
}

export function verificationSuspendedTemplate(companyName: string): string {
  return `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
    <h2 style="color: #dc2626;">Account Suspended</h2>
    <p>Hi <b>${companyName}</b>,</p>
    <p>Your company account on the ${BRAND_NAME} platform has been suspended.</p>
    <div style="${CARD_STYLE}">
      <p style="margin: 0 0 8px;"><b>Status:</b> Suspended</p>
      <p style="margin: 0;"><b>Effect:</b> Platform access has been temporarily restricted</p>
    </div>
    <p>During the suspension period, your account will be limited. Please contact our support team to resolve this issue and reinstate your account.</p>
    <p style="${FOOTER_STYLE}">
      If you have any questions about this suspension, please reach out to our support team.
    </p>
    <p style="${FOOTER_STYLE}">${BRAND_NAME} Team<br/>${HQ_LOCATION}</p>
  </div>`;
}
