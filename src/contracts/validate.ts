#!/usr/bin/env npx tsx
/**
 * Cross-repo contract validator (moved from the backend into core-ts).
 *
 * Validates each consumer's pre-extracted `contracts.json` artifact against
 * core-ts's own contract — the GraphQL schema (typeDefs) and the wire enums.
 * The backend's REST-route scan is backend-coupled (it walks the backend
 * `src/` tree for registered routes); it is NOT part of the core-ts contract
 * surface and is therefore not replicated here. Callers may pass an optional
 * `backendRoutes` list (e.g. the backend's own route inventory) to re-enable
 * REST-route cross-checking.
 *
 * Exit 0 = all checks pass, exit 1 = failures.
 */

import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { baseTypeDefs, publicTypeDefs, adminTypeDefs } from './typeDefs/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gql = createRequire(import.meta.url)('graphql') as typeof import('graphql');
const { parse, validate } = gql;

/* ── in-package paths (resolved relative to this file) ───────────────── */

const CORE_TS_ENUMS = path.resolve(__dirname, '../shared/enums/enums.ts');

/* ── schema (typeDefs only — the contract; no backend resolvers) ─────── */

const adminSchema = makeExecutableSchema({
  typeDefs: [baseTypeDefs, publicTypeDefs, adminTypeDefs],
});

/* ── artifact loaders ────────────────────────────────────────────────── */

export interface ContractDocument {
  name: string;
  operationType: string;
  rawSource?: string;
  variableDefinitions?: Array<{ name: string; type: string; optional?: boolean }>;
  selectionSet?: string[];
  fragmentSpreads?: string[];
  source?: string;
}

export interface ContractRestRoute {
  method: string;
  path: string;
  source?: string;
}

export interface ContractSsePayload {
  innerPath?: string;
  fields?: string[];
}

export interface ContractsJson {
  repo: string;
  extractedAt: string;
  documents: ContractDocument[];
  restRoutes: ContractRestRoute[];
  sseContracts: {
    eventTypes: string[];
    payloadKeys: Record<string, ContractSsePayload>;
  };
  wireEnums?: Array<{
    name: string;
    members: Record<string, string>;
    appOnly?: string[];
    source?: string;
  }>;
}

function loadArtifacts(label: string, artifactPath: string): ContractsJson | null {
  if (artifactPath && fs.existsSync(artifactPath)) {
    console.log(`  ✓ Loading ${label} from ${path.relative(__dirname, artifactPath)}`);
    return JSON.parse(fs.readFileSync(artifactPath, 'utf-8')) as ContractsJson;
  }
  console.log(`  ○ ${label} artifact not found at ${artifactPath} — skipped`);
  return null;
}

/* ── Task 3: GraphQL validation ──────────────────────────────────────── */

function validateGraphQLDocs(docs: ContractDocument[], repoName: string): string[] {
  const failures: string[] = [];

  for (const doc of docs) {
    let raw: string;

    if (doc.rawSource) {
      raw = doc.rawSource.replace(/\\"/g, '"').replace(/\\n/g, '\n');
    } else if (doc.operationType === 'fragment') {
      raw = `fragment ${doc.name} on __Unknown { ${(doc.selectionSet ?? []).join(' ')} }`;
    } else {
      const vars = (doc.variableDefinitions ?? []).map((v) => `$${v.name}: ${v.type}`).join(', ');
      const varBlock = vars ? `(${vars})` : '';
      raw = `${doc.operationType} ${doc.name}${varBlock} { ${(doc.selectionSet ?? []).join(' ')} }`;
    }

    raw = raw.replace(/\$\{[^}]+\}/g, '__INTERPOLATION__');

    let ast;
    try {
      ast = parse(raw);
    } catch (e) {
      failures.push(
        `  [${repoName}] ${doc.name}: parse error: ${e instanceof Error ? e.message : String(e)}`,
      );
      continue;
    }

    const errors = validate(adminSchema, ast).filter((e) => {
      const msg = e.message;
      if (msg.includes('__INTERPOLATION__')) return false;
      if (/unknown (type|enum|input|scalar|interface|union|directive)/i.test(msg)) return false;
      if (msg.includes('is never used') || msg.includes('is never defined')) return false;
      return true;
    });

    if (errors.length > 0) {
      failures.push(
        `  [${repoName}] ${doc.name} (${doc.source ?? 'unknown'}):\n    ${errors.map((e) => e.message).join('\n    ')}`,
      );
    }
  }

  return failures;
}

/* ── SSE event shape validation (core-ts-owned SseEventType) ─────────── */

function sseEventTypeContract(): { memberNames: string[]; wireValues: string[] } {
  const coreEnums = parseCoreTsEnums();
  const sse = coreEnums['SseEventType'];
  if (!sse) return { memberNames: [], wireValues: [] };
  return { memberNames: Object.keys(sse), wireValues: Object.values(sse) };
}

function validateSseContracts(
  sseContracts: ContractsJson['sseContracts'],
  repoName: string,
): string[] {
  const failures: string[] = [];
  const backendSse = sseEventTypeContract();

  if (backendSse.memberNames.length === 0) {
    console.log('  ⚠ Could not parse SseEventType — skipping SSE event type validation');
  } else {
    const accepted = new Set([
      ...backendSse.memberNames.map((v) => v.toLowerCase()),
      ...backendSse.wireValues,
    ]);
    for (const eventType of sseContracts.eventTypes) {
      if (!accepted.has(eventType.toLowerCase()) && !accepted.has(eventType)) {
        failures.push(
          `  [${repoName}] SSE event type '${eventType}' not in SseEventType (accepted: ${[...accepted].join(', ')})`,
        );
      }
    }
  }

  const KNOWN_ENVELOPE_KEYS = new Set([
    'deliveryUpdated',
    'riderUpdated',
    'channelsSubscription',
    'subscriptionUpdated',
    'companyUpdated',
    'typingUpdate',
    'riderAssignmentUpdated',
  ]);

  for (const key of Object.keys(sseContracts.payloadKeys)) {
    if (!KNOWN_ENVELOPE_KEYS.has(key)) {
      failures.push(
        `  [${repoName}] Unknown SSE payload key '${key}' — not in known envelope keys`,
      );
    }
  }

  return failures;
}

/* ── Wire enum sync (core-ts-owned enums) ────────────────────────────── */

function parseCoreTsEnums(): Record<string, Record<string, string>> {
  if (!fs.existsSync(CORE_TS_ENUMS)) return {};
  const source = fs.readFileSync(CORE_TS_ENUMS, 'utf-8');
  const enums: Record<string, Record<string, string>> = {};

  const enumRe = /export enum (\w+)\s*\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = enumRe.exec(source)) !== null) {
    const name = m[1];
    const body = m[2];
    const members: Record<string, string> = {};
    const memberRe = /(\w+)\s*=\s*['"]([^'"]+)['"]/g;
    let mm: RegExpExecArray | null;
    while ((mm = memberRe.exec(body)) !== null) {
      members[mm[1]] = mm[2];
    }
    enums[name] = members;
  }

  return enums;
}

function validateWireEnums(flutterEnums: ContractsJson['wireEnums'] = []): string[] {
  const failures: string[] = [];
  const coreEnums = parseCoreTsEnums();

  if (Object.keys(coreEnums).length === 0) {
    console.log('  ⚠ Could not parse core-ts enums — skipping wire enum validation');
    return failures;
  }

  const SKIP_SYNC = new Set(['NodeType']);

  for (const flutterEnum of flutterEnums) {
    if (SKIP_SYNC.has(flutterEnum.name)) continue;
    if (!flutterEnum.members || Object.keys(flutterEnum.members).length === 0) continue;

    const coreEnum = coreEnums[flutterEnum.name];
    if (!coreEnum) continue;

    const coreValues = new Set(Object.values(coreEnum));

    const FLUTTER_APP_ONLY = new Set([
      'SenderType.unknown',
      'SenderType.aiAgent',
      'RiderStatus.unknown',
      'TransactionStatus.unknown',
      'ApprovalStatus.unknown',
      'ApprovalStatus.pendingReview',
      'UserRole.unknown',
      'DispatcherRole.unknown',
      'SubscriptionStatus.unknown',
      'MessageStatus.unknown',
      'MessageStatus.pending',
      'LedgerAdjustmentType.unknown',
      'SubscriptionEventType.unknown',
      'SubscriptionEventType.locationUpdated',
      'TransactionType.unknown',
      'SubscriptionHealth.unknown',
      'DeliveryStatus.unknown',
      'PaymentMethod.unknown',
      'VehicleType.unknown',
    ]);

    for (const [dartName, wireValue] of Object.entries(flutterEnum.members)) {
      if (!coreValues.has(wireValue)) {
        if (FLUTTER_APP_ONLY.has(`${flutterEnum.name}.${dartName}`)) continue;
        failures.push(
          `  Enum ${flutterEnum.name}.${dartName}: apiValue '${wireValue}' not found in core-ts enum values`,
        );
      }
    }

    for (const [coreKey, coreValue] of Object.entries(coreEnum)) {
      const inFlutter = Object.values(flutterEnum.members).includes(coreValue);
      const inAppOnly = flutterEnum.appOnly?.includes(coreKey) ?? false;
      if (!inFlutter && !inAppOnly) {
        if (Object.keys(flutterEnum.members).length > 0) {
          failures.push(
            `  Enum ${flutterEnum.name}: core-ts member '${coreKey}' = '${coreValue}' not in Flutter apiValue or appOnly`,
          );
        }
      }
    }
  }

  return failures;
}

/* ── REST route validation (optional; backend passes its own routes) ─── */

function validateRestRoutes(clientRoutes: ContractRestRoute[], backendRoutes: string[]): string[] {
  const failures: string[] = [];
  const backendRouteSet = new Set(backendRoutes);

  for (const route of clientRoutes) {
    const normalized = route.path.replace(/:[^/]+/g, '([^/]+)');
    const regex = new RegExp(`^${normalized}$`);
    const found = [...backendRouteSet].some((br) => regex.test(br));
    if (!found) {
      failures.push(
        `  Route ${route.method} ${route.path} not found in backend (${route.source ?? 'unknown'})`,
      );
    }
  }

  return failures;
}

/* ── public entry ────────────────────────────────────────────────────── */

export function validateAll(args: { web: string; flutter: string; backendRoutes?: string[] }): {
  pass: boolean;
  failures: string[];
} {
  const allFailures: string[] = [];

  const webContracts = loadArtifacts('web', args.web);
  const flutterContracts = loadArtifacts('flutter', args.flutter);

  if (webContracts?.documents) {
    const webDocs = webContracts.documents.filter(
      (d) =>
        d.operationType === 'query' ||
        d.operationType === 'mutation' ||
        d.operationType === 'fragment',
    );
    allFailures.push(...validateGraphQLDocs(webDocs, 'web'));
  }
  if (flutterContracts?.documents) {
    const flutterDocs = flutterContracts.documents.filter(
      (d) =>
        d.operationType === 'query' ||
        d.operationType === 'mutation' ||
        d.operationType === 'fragment',
    );
    allFailures.push(...validateGraphQLDocs(flutterDocs, 'flutter'));
  }

  if (webContracts?.sseContracts) {
    allFailures.push(...validateSseContracts(webContracts.sseContracts, 'web'));
  }
  if (flutterContracts?.sseContracts) {
    allFailures.push(...validateSseContracts(flutterContracts.sseContracts, 'flutter'));
  }

  if (flutterContracts?.wireEnums) {
    allFailures.push(...validateWireEnums(flutterContracts.wireEnums));
  }

  if (args.backendRoutes && args.backendRoutes.length > 0) {
    const allRestRoutes = [
      ...(webContracts?.restRoutes ?? []),
      ...(flutterContracts?.restRoutes ?? []),
    ];
    if (allRestRoutes.length > 0) {
      allFailures.push(...validateRestRoutes(allRestRoutes, args.backendRoutes));
    }
  }

  return { pass: allFailures.length === 0, failures: allFailures };
}
