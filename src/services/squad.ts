import { BILLING_CONFIG } from '../shared/config/billing.config.js';
import { fetchWithTimeout } from '../shared/utils/fetch-with-timeout.js';
import { isTransientHttpError, withRetry, type WithRetryOptions } from '../shared/utils/retry.js';

export interface SquadClientOptions {
  baseUrl: string;
  secretKey: string;
  timeoutMs?: number;
  /** Custom fetch implementation (useful for testing). Resolved per call when omitted. */
  fetchImpl?: typeof globalThis.fetch;
  /** Retry policy applied to the HTTP attempt. Defaults: maxRetries 2, Squad-aware isRetryable. */
  retry?: WithRetryOptions;
}

export class SquadRequestError extends Error {
  readonly status?: number;
  readonly body?: unknown;

  constructor(message: string, status?: number, body?: unknown) {
    super(message);
    this.name = 'SquadRequestError';
    this.status = status;
    this.body = body;
  }
}

export interface ChargeCardParams {
  tokenId: string;
  /** Amount in kobo (lowest currency unit). Passed to Squad VERBATIM — never naira. */
  amountKobo: number;
  transactionRef: string;
  currency?: string;
  email?: string;
  metadata?: Record<string, unknown>;
}

export interface ChargeCardResult {
  success: boolean;
  message?: string;
  transactionRef?: string;
}

function isSquadRetryable(error: unknown): boolean {
  if (error instanceof SquadRequestError) {
    if (error.status !== undefined && error.status >= 500) return true;
    if (error.status === 429) return true;
    return false;
  }
  if (error instanceof Error && error.name === 'AbortError') return true;
  return isTransientHttpError(error);
}

export class SquadClient {
  private readonly baseUrl: string;
  private readonly secretKey: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl?: typeof globalThis.fetch;
  private readonly retry: WithRetryOptions;

  constructor(options: SquadClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, '');
    this.secretKey = options.secretKey;
    this.timeoutMs = options.timeoutMs ?? BILLING_CONFIG.SQUAD_HTTP_TIMEOUT;
    this.fetchImpl = options.fetchImpl;
    this.retry = { maxRetries: 2, isRetryable: isSquadRetryable, ...options.retry };
  }

  async request<T>(
    path: string,
    init: {
      method?: string;
      body?: Record<string, unknown>;
      query?: Record<string, string>;
      headers?: Record<string, string>;
    } = {},
  ): Promise<{ status: number; data: T }> {
    return withRetry(() => this.attempt<T>(path, init), {
      ...this.retry,
      onRetry: (info) => {
        this.retry.onRetry?.(info);
      },
    });
  }

  private async attempt<T>(
    path: string,
    init: {
      method?: string;
      body?: Record<string, unknown>;
      query?: Record<string, string>;
      headers?: Record<string, string>;
    },
  ): Promise<{ status: number; data: T }> {
    const query = init.query ? `?${new URLSearchParams(init.query).toString()}` : '';
    const url = `${this.baseUrl}${path}${query}`;
    const response = await fetchWithTimeout(url, {
      method: init.method ?? 'GET',
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...init.headers,
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      timeoutMs: this.timeoutMs,
      fetch: this.fetchImpl,
    });

    const text = await response.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new SquadRequestError(
        `Failed to parse Squad response (${response.status}): ${text.slice(0, 200)}`,
        response.status,
      );
    }

    if (response.status >= 500) {
      throw new SquadRequestError(
        `Squad upstream error (HTTP ${response.status})`,
        response.status,
        data,
      );
    }
    return { status: response.status, data: data as T };
  }

  /**
   * Charge a tokenized card for recurring payments.
   * amountKobo is sent to Squad VERBATIM — Squad interprets `amount` in the lowest
   * currency value (kobo), and dividing here was the historic 100x undercharge bug.
   */
  async chargeCard(params: ChargeCardParams): Promise<ChargeCardResult> {
    if (!params.tokenId) return { success: false, message: 'No tokenized card' };
    if (params.amountKobo <= 0) return { success: false, message: 'Invalid amount' };

    const { status, data } = await this.request<{ success: boolean; message?: string }>(
      '/transaction/charge_card',
      {
        method: 'POST',
        body: {
          token_id: params.tokenId,
          amount: params.amountKobo,
          transaction_ref: params.transactionRef,
          currency: params.currency,
          email: params.email,
          ...(params.metadata ? { metadata: params.metadata } : {}),
        },
      },
    );

    if (status >= 400 || data.success === false) {
      return {
        success: false,
        message: data.message || 'Card charge failed',
        transactionRef: params.transactionRef,
      };
    }
    return { success: true, transactionRef: params.transactionRef };
  }
}
