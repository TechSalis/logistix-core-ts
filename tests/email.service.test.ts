import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockSendMail = vi.fn();
const mockCreateTransport = vi.fn();

vi.mock('nodemailer', () => ({
  default: { createTransport: mockCreateTransport },
  createTransport: mockCreateTransport,
}));

describe('EmailService', () => {
  let EmailService: typeof import('../src/services/email.js').EmailService;

  beforeEach(() => {
    mockSendMail.mockReset();
    mockCreateTransport.mockReset();
    mockCreateTransport.mockReturnValue({ sendMail: mockSendMail });
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

      const mod = await import('../src/services/email.js');
      EmailService = mod.EmailService;
    });

    it('sends via SMTP when SMTP_HOST is set', async () => {
      mockSendMail.mockResolvedValue({ messageId: 'msg-123' });
      const service = new EmailService();

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

    it('uses injected SMTP config over process.env', async () => {
      mockSendMail.mockResolvedValue({ messageId: 'msg-injected' });
      const service = new EmailService({ host: 'smtp.injected.com', port: 2525, user: 'iu', pass: 'ip' });

      const result = await service.sendEmail({
        from: 'test@example.com',
        to: 'to@example.com',
        subject: 'Test',
        html: '<p>Hi</p>',
      });

      expect(result.id).toBe('msg-injected');
      expect(mockCreateTransport).toHaveBeenCalledWith({
        host: 'smtp.injected.com',
        port: 2525,
        secure: false,
        auth: { user: 'iu', pass: 'ip' },
      });
    });

    it('null injected config wins over process.env (never falls back to env)', async () => {
      const service = new EmailService(null);

      await expect(
        service.sendEmail({
          from: 'test@example.com',
          to: 'to@example.com',
          subject: 'Test',
          html: '<p>Hi</p>',
        }),
      ).rejects.toThrow('EmailService: no SMTP configured — email not sent');

      expect(mockCreateTransport).not.toHaveBeenCalled();
    });
  });

  describe('no config path', () => {
    beforeEach(async () => {
      vi.stubGlobal('process', {
        ...process,
        env: {},
      });
      const mod = await import('../src/services/email.js');
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

  describe('buildSmtpConfig', () => {
    let buildSmtpConfig: typeof import('../src/services/email.js').buildSmtpConfig;

    beforeEach(async () => {
      const mod = await import('../src/services/email.js');
      buildSmtpConfig = mod.buildSmtpConfig;
    });

    it('returns null when no SMTP_HOST is provided', () => {
      expect(buildSmtpConfig({})).toBeNull();
    });

    it('defaults the port to 1025 when SMTP_PORT is absent', () => {
      expect(buildSmtpConfig({ SMTP_HOST: 'smtp.example.com' })).toEqual({
        host: 'smtp.example.com',
        port: 1025,
      });
    });

    it('parses SMTP_PORT as an integer and keeps user/pass', () => {
      expect(
        buildSmtpConfig({
          SMTP_HOST: 'smtp.example.com',
          SMTP_PORT: '587',
          SMTP_USER: 'user',
          SMTP_PASS: 'pass',
        }),
      ).toEqual({
        host: 'smtp.example.com',
        port: 587,
        user: 'user',
        pass: 'pass',
      });
    });
  });
});
