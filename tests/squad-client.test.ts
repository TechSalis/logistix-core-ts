import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  SquadClient,
  SquadRequestError,
  type SquadClientOptions,
  type ChargeCardParams,
} from '../src/services/squad-client.js';
import { BILLING_CONFIG, getSubscriptionPrice } from '../src/config/billing.config.js';
import { SubscriptionTier } from '../src/enums/enums.js';

function jsonResponse(status: number, body: unknown): Response {
  return { status, text: async () => JSON.stringify(body) } as unknown as Response;
}

function textResponse(status: number, text: string): Response {
  return { status, text: async () => text } as unknown as Response;
}

function makeClient(
  fetchImpl: typeof globalThis.fetch,
  overrides: Partial<SquadClientOptions> = {},
): SquadClient {
  return new SquadClient({
    baseUrl: 'https://api.squad.co/',
    secretKey: 'sk_test',
    fetchImpl,
    ...overrides,
  });
}

function baseParams(overrides: Partial<ChargeCardParams> = {}): ChargeCardParams {
  return {
    tokenId: 'token-123',
    amountKobo: getSubscriptionPrice(SubscriptionTier.STARTER),
    transactionRef: 'ref-1',
    ...overrides,
  };
}

describe('SquadClient', () => {
  let fetchImpl: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchImpl = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('chargeCard', () => {
    it('sends amount in kobo VERBATIM to /transaction/charge_card with Bearer auth and transaction_ref', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, { success: true }));
      const client = makeClient(fetchImpl);

      const result = await client.chargeCard(baseParams());

      const expectedAmount = getSubscriptionPrice(SubscriptionTier.STARTER);
      expect(expectedAmount).toBe(1_500_000);

      expect(fetchImpl).toHaveBeenCalledTimes(1);
      const [url, init] = fetchImpl.mock.calls[0] as [string, RequestInit];
      expect(url).toBe('https://api.squad.co/transaction/charge_card');
      expect(init.method).toBe('POST');
      expect(init.headers).toMatchObject({
        Authorization: 'Bearer sk_test',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      });
      const body = init.body as string;
      expect(JSON.parse(body).amount).toBe(expectedAmount);
      expect(JSON.parse(body).amount).toBe(1_500_000);
      expect(JSON.parse(body).token_id).toBe('token-123');
      expect(JSON.parse(body).transaction_ref).toBe('ref-1');
      expect(result).toEqual({ success: true, transactionRef: 'ref-1' });
    });

    it('passes currency through in the request body', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, { success: true }));
      const client = makeClient(fetchImpl);

      await client.chargeCard(baseParams({ currency: 'NGN' }));

      const init = fetchImpl.mock.calls[0][1] as RequestInit;
      expect(JSON.parse(init.body as string).currency).toBe('NGN');
    });

    it('passes metadata through in the request body', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, { success: true }));
      const client = makeClient(fetchImpl);

      await client.chargeCard(baseParams({ metadata: { companyId: 'c1' } }));

      const init = fetchImpl.mock.calls[0][1] as RequestInit;
      expect(JSON.parse(init.body as string).metadata).toEqual({ companyId: 'c1' });
    });

    it('omits metadata key when not provided', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, { success: true }));
      const client = makeClient(fetchImpl);

      await client.chargeCard(baseParams());

      const init = fetchImpl.mock.calls[0][1] as RequestInit;
      expect(JSON.parse(init.body as string).metadata).toBeUndefined();
    });

    it('returns { success: true, transactionRef } when data.success !== false', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, { success: true }));
      const client = makeClient(fetchImpl);

      const result = await client.chargeCard(baseParams());

      expect(result).toEqual({ success: true, transactionRef: 'ref-1' });
    });

    it('returns { success: false, message } when data.success === false', async () => {
      fetchImpl.mockResolvedValue(
        jsonResponse(200, { success: false, message: 'Insufficient funds' }),
      );
      const client = makeClient(fetchImpl);

      const result = await client.chargeCard(baseParams());

      expect(result).toEqual({
        success: false,
        message: 'Insufficient funds',
        transactionRef: 'ref-1',
      });
    });

    it('returns { success: false } with default message when status >= 400', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(400, { success: true }));
      const client = makeClient(fetchImpl);

      const result = await client.chargeCard(baseParams());

      expect(result).toEqual({
        success: false,
        message: 'Card charge failed',
        transactionRef: 'ref-1',
      });
    });

    it('guards empty tokenId without calling fetch', async () => {
      const client = makeClient(fetchImpl);

      const result = await client.chargeCard(baseParams({ tokenId: '' }));

      expect(result).toEqual({ success: false, message: 'No tokenized card' });
      expect(fetchImpl).not.toHaveBeenCalled();
    });

    it('guards non-positive amounts without calling fetch', async () => {
      const client = makeClient(fetchImpl);

      expect(await client.chargeCard(baseParams({ amountKobo: 0 }))).toEqual({
        success: false,
        message: 'Invalid amount',
      });
      expect(await client.chargeCard(baseParams({ amountKobo: -5 }))).toEqual({
        success: false,
        message: 'Invalid amount',
      });
      expect(fetchImpl).not.toHaveBeenCalled();
    });
  });

  describe('request', () => {
    it('returns { status, data } for 4xx without throwing', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(400, { error: 'bad request' }));
      const client = makeClient(fetchImpl);

      const result = await client.request<{ error: string }>('/charge_card', {
        method: 'POST',
        body: { amount: 100 },
      });

      expect(result).toEqual({ status: 400, data: { error: 'bad request' } });
      expect(fetchImpl).toHaveBeenCalledTimes(1);
    });

    it('throws SquadRequestError with status for 5xx', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(500, { error: 'boom' }));
      const client = makeClient(fetchImpl);

      const promise = client.request('/charge_card');

      await expect(promise).rejects.toBeInstanceOf(SquadRequestError);
      await expect(promise).rejects.toMatchObject({ status: 500, name: 'SquadRequestError' });
      await expect(promise).rejects.toThrow('Squad upstream error (HTTP 500)');
    });

    it('retries a 500 response then succeeds', async () => {
      fetchImpl
        .mockResolvedValueOnce(jsonResponse(500, { error: 'boom' }))
        .mockResolvedValueOnce(jsonResponse(200, { ok: true }));
      const client = makeClient(fetchImpl);

      const result = await client.request<{ ok: boolean }>('/charge_card');

      expect(fetchImpl).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ status: 200, data: { ok: true } });
    });

    it('retries a 429 SquadRequestError (unparseable body) then succeeds', async () => {
      fetchImpl
        .mockResolvedValueOnce(textResponse(429, '<html>rate limited</html>'))
        .mockResolvedValueOnce(jsonResponse(200, { ok: true }));
      const client = makeClient(fetchImpl);

      const result = await client.request<{ ok: boolean }>('/charge_card');

      expect(fetchImpl).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ status: 200, data: { ok: true } });
    });

    it('returns a plain 429 response as a business response without retrying', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(429, { success: false, message: 'rate limited' }));
      const client = makeClient(fetchImpl);

      const result = await client.request<{ success: boolean }>('/charge_card');

      expect(fetchImpl).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ status: 429, data: { success: false, message: 'rate limited' } });
    });

    it('does not retry a 400 response', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(400, { error: 'bad' }));
      const client = makeClient(fetchImpl);

      const result = await client.request('/charge_card');

      expect(fetchImpl).toHaveBeenCalledTimes(1);
      expect(result.status).toBe(400);
    });

    it('throws SquadRequestError with preview on parse failure', async () => {
      fetchImpl.mockResolvedValue(textResponse(200, 'not-json{'));
      const client = makeClient(fetchImpl);

      const promise = client.request('/charge_card');

      await expect(promise).rejects.toBeInstanceOf(SquadRequestError);
      await expect(promise).rejects.toMatchObject({ status: 200 });
      await expect(promise).rejects.toThrow('Failed to parse Squad response (200): not-json{');
    });

    it('truncates the parse-failure preview to 200 characters', async () => {
      const longBody = 'x'.repeat(500);
      fetchImpl.mockResolvedValue(textResponse(200, longBody));
      const client = makeClient(fetchImpl);

      const promise = client.request('/charge_card');

      await expect(promise).rejects.toThrow(
        `Failed to parse Squad response (200): ${'x'.repeat(200)}`,
      );
    });

    it('retries a transient network failure (TypeError) then rethrows', async () => {
      const networkError = Object.assign(new TypeError('fetch failed'), { code: 'ECONNRESET' });
      fetchImpl.mockRejectedValue(networkError);
      const client = makeClient(fetchImpl);

      const promise = client.request('/charge_card');

      await expect(promise).rejects.toBe(networkError);
      expect(fetchImpl).toHaveBeenCalledTimes(2);
    });

    it('retries an AbortError (timeout) then rethrows', async () => {
      const abortError = new DOMException('The operation was aborted', 'AbortError');
      fetchImpl.mockRejectedValue(abortError);
      const client = makeClient(fetchImpl);

      const promise = client.request('/charge_card');

      await expect(promise).rejects.toBe(abortError);
      expect(fetchImpl).toHaveBeenCalledTimes(2);
    });
  });

  describe('constructor', () => {
    it('strips a trailing slash from baseUrl', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, {}));
      const client = makeClient(fetchImpl);

      await client.request('/ping');

      const url = fetchImpl.mock.calls[0][0] as string;
      expect(url).toBe('https://api.squad.co/ping');
    });

    it('defaults timeout to BILLING_CONFIG.SQUAD_HTTP_TIMEOUT', async () => {
      vi.useFakeTimers();
      fetchImpl.mockImplementation(
        (_url: string, opts: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            (opts.signal as AbortSignal).addEventListener('abort', () =>
              reject(new DOMException('timed out', 'AbortError')),
            );
          }),
      );
      const client = makeClient(fetchImpl, { retry: { maxRetries: 1 } });

      const promise = client.request('/ping');
      await vi.advanceTimersByTimeAsync(BILLING_CONFIG.SQUAD_HTTP_TIMEOUT - 1);
      let settled = false;
      void promise.then(
        () => {
          settled = true;
        },
        () => {
          settled = true;
        },
      );
      await vi.advanceTimersByTimeAsync(0);
      expect(settled).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
    });

    it('honors an explicit timeoutMs override', async () => {
      vi.useFakeTimers();
      fetchImpl.mockImplementation(
        (_url: string, opts: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            (opts.signal as AbortSignal).addEventListener('abort', () =>
              reject(new DOMException('timed out', 'AbortError')),
            );
          }),
      );
      const client = makeClient(fetchImpl, { timeoutMs: 1_000, retry: { maxRetries: 1 } });

      const promise = client.request('/ping');
      await vi.advanceTimersByTimeAsync(999);
      let settled = false;
      void promise.then(
        () => {
          settled = true;
        },
        () => {
          settled = true;
        },
      );
      await vi.advanceTimersByTimeAsync(0);
      expect(settled).toBe(false);
      await vi.advanceTimersByTimeAsync(1);
      await expect(promise).rejects.toMatchObject({ name: 'AbortError' });
    });
  });

  describe('request options', () => {
    it('serializes the query string', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, {}));
      const client = makeClient(fetchImpl);

      await client.request('/ping', { query: { a: '1', b: 'two words' } });

      const url = fetchImpl.mock.calls[0][0] as string;
      expect(url).toBe('https://api.squad.co/ping?a=1&b=two+words');
    });

    it('defaults to GET when no method is provided', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, {}));
      const client = makeClient(fetchImpl);

      await client.request('/ping');

      const init = fetchImpl.mock.calls[0][1] as RequestInit;
      expect(init.method).toBe('GET');
      expect(init.body).toBeUndefined();
    });

    it('sends custom headers merged over the defaults', async () => {
      fetchImpl.mockResolvedValue(jsonResponse(200, {}));
      const client = makeClient(fetchImpl);

      await client.request('/ping', { headers: { 'X-Custom': 'yes' } });

      const init = fetchImpl.mock.calls[0][1] as RequestInit;
      expect(init.headers).toMatchObject({
        Authorization: 'Bearer sk_test',
        'X-Custom': 'yes',
      });
    });
  });
});
