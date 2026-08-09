import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockSendMail = vi.fn();

vi.mock('nodemailer', () => {
  const transporter = { sendMail: mockSendMail };
  return {
    default: { createTransport: vi.fn(() => transporter) },
    createTransport: vi.fn(() => transporter),
  };
});

describe('EmailService', () => {
  let EmailService: typeof import('../src/services/email.service.js').EmailService;

  beforeEach(() => {
    mockSendMail.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('SMTP path', () => {
    beforeEach(async () => {
      vi.stubGlobal('process', {
        ...process,
        env: {
          SMTP_HOST: 'smtp.example.com',
          SMTP_PORT: '587',
          SMTP_USER: 'user',
          SMTP_PASS: 'pass',
        },
      });

      const mod = await import('../src/services/email.service.js');
      EmailService = mod.EmailService;
    });

    it('sends via SMTP when SMTP_HOST is set', async () => {
      mockSendMail.mockResolvedValue({ messageId: 'msg-123' });
      const service = new EmailService('resend-key');

      const result = await service.sendEmail({
        from: 'test@example.com',
        to: 'to@example.com',
        subject: 'Test',
        html: '<p>Hi</p>',
      });

      expect(result.id).toBe('msg-123');
      expect(mockSendMail).toHaveBeenCalled();
    });

    it('retries on retryable errors', async () => {
      mockSendMail
        .mockRejectedValueOnce(Object.assign(new Error('ECONNREFUSED'), { code: 'ECONNREFUSED' }))
        .mockResolvedValueOnce({ messageId: 'msg-456' });
      const service = new EmailService();

      const result = await service.sendEmail({
        from: 'test@example.com',
        to: 'to@example.com',
        subject: 'Test',
        html: '<p>Hi</p>',
      });

      expect(result.id).toBe('msg-456');
      expect(mockSendMail).toHaveBeenCalledTimes(2);
    }, 10000);

    it('retries on any canonical RETRYABLE_NETWORK_ERROR_CODE', async () => {
      mockSendMail
        .mockRejectedValueOnce(Object.assign(new Error('EPIPE'), { code: 'EPIPE' }))
        .mockResolvedValueOnce({ messageId: 'msg-789' });
      const service = new EmailService();

      const result = await service.sendEmail({
        from: 'test@example.com',
        to: 'to@example.com',
        subject: 'Test',
        html: '<p>Hi</p>',
      });

      expect(result.id).toBe('msg-789');
      expect(mockSendMail).toHaveBeenCalledTimes(2);
    }, 10000);

    it('throws on non-retryable error', async () => {
      mockSendMail.mockRejectedValue(new Error('Invalid template'));
      const service = new EmailService();

      await expect(
        service.sendEmail({
          from: 'test@example.com',
          to: 'to@example.com',
          subject: 'Test',
          html: '<p>Hi</p>',
        }),
      ).rejects.toThrow('Invalid template');

      expect(mockSendMail).toHaveBeenCalledTimes(1);
    });
  });

  describe('no config path', () => {
    beforeEach(async () => {
      vi.stubGlobal('process', {
        ...process,
        env: {},
      });
      const mod = await import('../src/services/email.service.js');
      EmailService = mod.EmailService;
    });

    it('throws when no SMTP configured', async () => {
      const service = new EmailService();

      await expect(
        service.sendEmail({
          from: 'test@example.com',
          to: 'to@example.com',
          subject: 'Test',
          html: '<p>Hi</p>',
        }),
      ).rejects.toThrow('EmailService: no SMTP configured — email not sent');
    });
  });
});
