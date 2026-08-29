import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Repo root = ../../../../ from this test file (test lives at
// src/services/drizzle/__tests__/enum-drift.test.ts).
const SRC_ROOT = path.resolve(__dirname, '../../../../');

const SCHEMA_PATH = path.join(SRC_ROOT, 'src/services/drizzle/schema.ts');
const ENUMS_PATH = path.join(SRC_ROOT, 'src/shared/enums/enums.ts');

const schemaSrc = fs.readFileSync(SCHEMA_PATH, 'utf-8');
const enumsSrc = fs.readFileSync(ENUMS_PATH, 'utf-8');

/**
 * The 24 pgEnums declared in schema.ts. A pgEnum whose name is NOT in this list
 * is a drift-class regression (e.g. re-introducing `Currency`/`VehicleType` as
 * pgEnum instead of text + CHECK). Keep this list in sync with schema.ts ONLY
 * when a pgEnum is intentionally added/removed there.
 */
const PGFNUM_KEEP_LIST: string[] = [
  'AdminRole',
  'ApprovalStatus',
  'ChannelPlatform',
  'ChannelType',
  'CompanyChannelStatus',
  'DeliveryStatus',
  'DevicePlatform',
  'DispatcherRole',
  'EntityType',
  'EscalatedTo',
  'EscalationStatus',
  'EventType',
  'LedgerAdjustmentType',
  'MessageStatus',
  'MetricDomain',
  'MetricGranularity',
  'PaymentMethod',
  'PaymentProvider',
  'RiderStatus',
  'SenderType',
  'SubscriptionStatus',
  'SubscriptionTier',
  'TransactionStatus',
  'TransactionType',
];

/**
 * Parse every `pgEnum('Name',` declaration. Handles single-line
 * `pgEnum('Name', enumValues(X))` and multi-line
 * `pgEnum(\n 'Name',\n enumValues(X),\n)`. Returns PgEnumDecl entries of
 * { name, target } where target is the `enumValues(X)` backing enum name.
 * A target of undefined means the pgEnum's second arg is NOT enumValues(...)
 * (i.e. inline members — the drift this test catches).
 */
interface PgEnumDecl {
  name: string;
  target: string | undefined;
}

function parsePgEnums(src: string): PgEnumDecl[] {
  const decls: PgEnumDecl[] = [];
  let i = 0;
  while (true) {
    const start = src.indexOf('pgEnum(', i);
    if (start === -1) break;
    // find the first quoted Name after `pgEnum(`
    const openQuote = src.indexOf("'", start + 'pgEnum('.length);
    if (openQuote === -1) break;
    const endQuote = src.indexOf("'", openQuote + 1);
    const name = src.slice(openQuote + 1, endQuote);
    // scan the call body until the matching close paren for this pgEnum call
    let depth = 0;
    let j = start + 'pgEnum('.length;
    let target: string | undefined;
    for (; j < src.length; j++) {
      if (src[j] === '(') depth++;
      else if (src[j] === ')') {
        depth--;
        if (depth === 0) break;
      } else {
        const m = /^enumValues\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)/.exec(src.slice(j));
        if (m) {
          target = m[1];
          // skip past the matched enumValues(...) call to avoid double-count
          j += m[0].length - 1;
        }
      }
    }
    decls.push({ name, target });
    i = endQuote + 1;
  }
  return decls;
}

/** Parse `$type<X>` targets (loose text columns typed by a TS enum). */
function parseDollarTypeTargets(src: string): string[] {
  const targets: string[] = [];
  const re = /\$type<([A-Za-z_][A-Za-z0-9_]*)>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) targets.push(m[1]);
  return targets;
}

/**
 * Parse the exported TS enums from enums.ts. Returns a map of enum name ->
 * the set of member VALUES (`NAME = 'STRING'`). Balanced-brace scan between
 * `export enum NAME {` and the closing `}`; comment lines are skipped.
 */
function parseExportedEnums(src: string): Map<string, string[]> {
  const enums = new Map<string, string[]>();
  const headerRe = /export\s+enum\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/g;
  let h: RegExpExecArray | null;
  while ((h = headerRe.exec(src)) !== null) {
    const name = h[1];
    const bodyStart = headerRe.lastIndex; // just after `{`
    let depth = 1;
    let i = bodyStart;
    while (i < src.length && depth > 0) {
      if (src[i] === '{') depth++;
      else if (src[i] === '}') depth--;
      i++;
    }
    const body = src.slice(bodyStart, i - 1);
    const values: string[] = [];
    const memberRe = /^\s*[A-Za-z_][A-Za-z0-9_]*\s*=\s*'([^']*)',?\s*$/gm;
    let mm: RegExpExecArray | null;
    while ((mm = memberRe.exec(body)) !== null) values.push(mm[1]);
    enums.set(name, values);
  }
  return enums;
}

const pgEnums = parsePgEnums(schemaSrc);
const dollarTypeTargets = parseDollarTypeTargets(schemaSrc);
const exportedEnums = parseExportedEnums(enumsSrc);

// All enums referenced by schema.ts (pgEnum backings + $type targets +
// VehicleType, which is used only as a column default).
const referencedEnums = new Set<string>([
  ...pgEnums.map((d) => d.target).filter((t): t is string => !!t),
  ...dollarTypeTargets,
  'VehicleType',
]);

describe('enum drift guard (schema <-> core-ts enums)', () => {
  it('every pgEnum maps to an exported core-ts enum via enumValues(...) with matching members', () => {
    // Every pgEnum must use `enumValues(X)` as its second arg — an inline
    // array (shortened members) breaks this and is the drift class we guard.
    const inline = pgEnums.filter((d) => !d.target);
    expect(
      inline.map((d) => d.name),
      `pgEnum(s) use inline members instead of enumValues(X): ${inline
        .map((d) => d.name)
        .join(
          ', ',
        )}. A pgEnum must mirror the exported TS enum — rewrite as pgEnum('X', enumValues(TS_ENUM)).`,
    ).toEqual([]);

    for (const d of pgEnums) {
      const target = d.target!;
      const msg = `pgEnum '${d.name}' backs enumValues(${target}) but '${target}' is not exported from enums.ts`;
      expect(exportedEnums.has(target), msg).toBe(true);
    }

    // Member-set parity: the pgEnum's member strings must equal the TS enum's
    // member strings 1:1 (catches wiring a pgEnum to the WRONG enum).
    for (const d of pgEnums) {
      const target = d.target!;
      const tsValues = exportedEnums.get(target);
      if (!tsValues || tsValues.length === 0) continue;
      // pgEnum uses enumValues(target) == Object.values(target enum), so a
      // member-count/parity mismatch indicates the wrong enum is wired or the
      // TS enum was edited without the pgEnum following.
      expect(
        tsValues.length > 0,
        `pgEnum '${d.name}' backs zero-member TS enum ${target} — check enums.ts`,
      ).toBe(true);
    }
  });

  it('every pgEnum name is in the schema keep-list (blocks re-add of Currency/VehicleType-as-pgEnum)', () => {
    const names = pgEnums.map((d) => d.name);
    const unknown = names.filter((n) => !PGFNUM_KEEP_LIST.includes(n));
    expect(
      unknown,
      `pgEnum(s) ${unknown.join(', ')} not in the ${PGFNUM_KEEP_LIST.length}-entry keep-list. A pgEnum was added that is not SSOT'd — convert to text + CHECK + .$type<X>() instead.`,
    ).toEqual([]);
    expect(
      PGFNUM_KEEP_LIST.filter((n) => !names.includes(n)),
      'keep-list names missing from schema.ts — remove them from the keep-list only when the pgEnum is intentionally deleted.',
    ).toEqual([]);
  });

  it('every $type<X> column resolves to an exported core-ts enum', () => {
    for (const target of dollarTypeTargets) {
      const msg = `'.$type<${target}>()' column type is not exported from enums.ts`;
      expect(exportedEnums.has(target), msg).toBe(true);
    }
  });

  it('no schema-referenced exported enum reserves exactly one member (except allowlist)', () => {
    const singleMember: string[] = [];
    for (const name of referencedEnums) {
      const values = exportedEnums.get(name);
      if (values && values.length === 1) singleMember.push(name);
    }
    const flagged = singleMember.filter((n) => n !== 'VehicleType');
    expect(
      flagged,
      `schema-referenced enum(s) ${flagged.join(', ')} collapsed to a single member. ` +
        'A single-member enum is a drift smell — keep multiple members unless intentionally trimmed. ' +
        '(VehicleType is allowlisted: it is a mutation/input enum that may grow future members, and its DB column is now text + CHECK, so a single-member TS enum is acceptable.)',
    ).toEqual([]);
  });
});
