/**
 * Single drizzle-orm identity for cross-repo consumers.
 *
 * Consumers that cross the core-ts boundary with drizzle objects (e.g. workers'
 * `db-helpers.ts` mixes core-ts schema columns with drizzle-orm operators) MUST
 * import drizzle from here instead of a bare `drizzle-orm` specifier. Because
 * drizzle-orm types carry private/structural members, two independently-installed
 * copies of the SAME version are never type-compatible; routing everything through
 * core-ts guarantees exactly one identity regardless of how core-ts is installed
 * (git-pin peer resolution in CI/production, or the sibling checkout in local dev).
 *
 * Import the node-postgres client factory + type from the dedicated subpath:
 *   import { drizzle, type NodePgDatabase } from 'logistix-core-ts/services/drizzle/orm/node-postgres'
 */

export { and, count, eq, inArray, isNotNull, lt, notInArray, sql } from 'drizzle-orm';
export type { SQL } from 'drizzle-orm';
