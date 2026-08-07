import { z } from 'zod';

/**
 * Client-facing configuration served to business web + Flutter via the
 * `clientConfig` GraphQL query and the SSE `companyUpdated` payload.
 *
 * Values here are the SSOT; the backend `client-rules.service.ts` reads from
 * this module (and other core-ts configs) to build the served payload.
 * Clients keep the same defaults for offline / pre-server startup, but treat
 * the served values as authoritative once received.
 */
export interface ClientConfig {
  readonly pollIntervals: {
    readonly normalMs: number;
    readonly degradedMs: number;
  };
}

export interface PollIntervalsConfig {
  readonly normalMs: number;
  readonly degradedMs: number;
}

const clientConfigSchema = z.object({
  pollIntervals: z.object({
    normalMs: z.number(),
    degradedMs: z.number(),
  }),
});

const rawClientConfig = {
  pollIntervals: {
    normalMs: 3_600_000, // 60 min — business web dispatcher sync cadence
    degradedMs: 900_000, // 15 min — degraded (rate-limited / offline) cadence
  },
} as const;

// Runtime validation guard — keeps config in sync with schema
export const CLIENT_CONFIG: ClientConfig = clientConfigSchema.parse(rawClientConfig);
