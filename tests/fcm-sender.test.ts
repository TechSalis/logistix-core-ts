import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const mockCredentials = {
  projectId: 'test-project',
  clientEmail: 'test@test-project.iam.gserviceaccount.com',
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+O/U=\n-----END PRIVATE KEY-----',
};

describe('FcmService', () => {
  let FcmService: typeof import('../src/services/fcm.js').FcmService;
  let service: InstanceType<typeof FcmService>;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    mockFetch = vi.fn();
    vi.stubGlobal('fetch', mockFetch);

    const subtle = {
      importKey: vi.fn().mockResolvedValue('mock-key'),
      sign: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3]).buffer),
    };
    vi.stubGlobal('crypto', { subtle });

    vi.stubGlobal('btoa', (s: string) => Buffer.from(s).toString('base64'));

    const mod = await import('../src/services/fcm.js');
    FcmService = mod.FcmService;
    service = new FcmService(mockCredentials);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  describe('send', () => {
    it('returns success when FCM responds with name', async () => {
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({ name: 'projects/test-project/messages/msg1' }),
      });

      const result = await service.send({ token: 'tok1', title: 'Test', body: 'Body' });
      expect(result.success).toBe(true);
      expect(result.messageId).toBe('projects/test-project/messages/msg1');
    });

    it('returns failure when FCM responds with error', async () => {
      mockFetch.mockResolvedValue({
        json: () =>
          Promise.resolve({ error: { message: 'Invalid registration', status: 'UNREGISTERED' } }),
      });

      const result = await service.send({ token: 'bad-token', title: 'Test', body: 'Body' });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid registration');
      expect(result.errorCode).toBe('UNREGISTERED');
    });

    it('returns failure response on network error', async () => {
      mockFetch.mockRejectedValue(new Error('Network failure'));

      const result = await service.send({ token: 'tok1', title: 'Test', body: 'Body' });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network failure');
    });
  });

  describe('sendBatch', () => {
    it('sends to all tokens and returns results', async () => {
      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ name: 'msg1' }) })
        .mockResolvedValueOnce({ json: () => Promise.resolve({ name: 'msg2' }) });

      const results = await service.sendBatch([
        { token: 'tok1', title: 'A', body: 'Body A' },
        { token: 'tok2', title: 'B', body: 'Body B' },
      ]);
      expect(results).toHaveLength(2);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(true);
    });

    it('handles mixed results', async () => {
      mockFetch
        .mockResolvedValueOnce({ json: () => Promise.resolve({ name: 'msg1' }) })
        .mockRejectedValueOnce(new Error('fail'));

      const results = await service.sendBatch([
        { token: 'tok1', title: 'A', body: 'Body A' },
        { token: 'tok2', title: 'B', body: 'Body B' },
      ]);
      expect(results[0].success).toBe(true);
      expect(results[1].success).toBe(false);
    });
  });

  describe('sendToTopic', () => {
    it('sends to topic successfully', async () => {
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({ name: 'projects/test-project/messages/topic-msg' }),
      });

      const result = await service.sendToTopic('news', 'Title', 'Body');
      expect(result.success).toBe(true);
    });

    it('returns failure on topic error', async () => {
      mockFetch.mockResolvedValue({
        json: () => Promise.resolve({ error: { message: 'Topic not found', status: 'NOT_FOUND' } }),
      });

      const result = await service.sendToTopic('unknown', 'Title', 'Body');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Topic not found');
    });
  });

  describe('subscribeToTopic', () => {
    it('subscribes successfully', async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const result = await service.subscribeToTopic('token', 'news');
      expect(result.success).toBe(true);
    });

    it('returns failure on HTTP error', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 400,
        text: () => Promise.resolve('Bad request'),
      });

      const result = await service.subscribeToTopic('token', 'news');
      expect(result.success).toBe(false);
      expect(result.error).toContain('HTTP 400');
    });
  });

  describe('unsubscribeFromTopic', () => {
    it('unsubscribes successfully', async () => {
      mockFetch.mockResolvedValue({ ok: true });

      const result = await service.unsubscribeFromTopic('token', 'news');
      expect(result.success).toBe(true);
    });
  });
});
