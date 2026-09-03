/**
 * Client-facing configuration served to business web + Flutter via the
 * `remoteConfig` GraphQL query and the SSE `companyUpdated` payload.
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

const rawClientConfig = {
  pollIntervals: {
    // Normal: lazy background sync cadence. SSE carries live updates, so a
    // coarse 60-min poll is the safety net, not the live path.
    normalMs: 3_600_000, // 60 min — business web dispatcher sync cadence
    // Degraded: FASTER retry when syncs fail (SSE down / repeated errors), so
    // the client recovers sooner once the connection is back.
    degradedMs: 900_000, // 15 min — failure-recovery retry cadence
  },
} as const;

export const CLIENT_CONFIG: ClientConfig = rawClientConfig;
