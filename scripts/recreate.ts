/**
 * Full schema recreation — destructive, deterministic, reproducible.
 *
 * Usage:
 *   LOGISTIX_RECREATE=yes npm run db:recreate
 *   # or
 *   npm run db:recreate -- --yes
 *
 * Uses postgres-js (same driver as the app) — avoids drizzle-kit's
 * built-in pg driver which has SSL/connectivity issues with Supabase.
 *
 * Steps:
 *   1. DROP SCHEMA public CASCADE
 *   2. Apply drizzle/0000_initial.sql (generated schema + APPENDIX sentinel)
 *   3. Apply sql/appendix.sql (hand-owned: pg_cron, pgmq, functions, RLS)
 *   4. Seed drizzle migration tracking table (so `npm run db:migrate` is a no-op)
 *
 * ⚠️  DESTROYS ALL DATA in the `public` schema. Staging/prod: run against
 *     a fresh DB only. Dev: run freely.
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import postgres from 'postgres';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const GENERATED_SQL = resolve(ROOT, 'drizzle', '0000_initial.sql');
const APPENDIX_SQL = resolve(ROOT, 'sql', 'appendix.sql');
const JOURNAL_PATH = resolve(ROOT, 'drizzle', 'meta', '_journal.json');
const sql = String.raw;

// ── Gate ──────────────────────────────────────────────────────────────────────
const confirmed = process.env.LOGISTIX_RECREATE === 'yes' || process.argv.includes('--yes');

if (!confirmed) {
  console.error('[recreate] FATAL: This will DESTROY all data in the public schema.');
  console.error('[recreate] Re-run with LOGISTIX_RECREATE=yes or --yes to confirm.');
  process.exit(1);
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[recreate] FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

// ── Run ───────────────────────────────────────────────────────────────────────
async function run() {
  const url = new URL(DATABASE_URL);
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const connection = postgres(DATABASE_URL, {
    max: 1,
    connect_timeout: 30,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });

  // Step 1: Drop and recreate public schema
  console.log('[recreate] Step 1: DROP SCHEMA public CASCADE ...');
  await connection.unsafe('DROP SCHEMA IF EXISTS public CASCADE');
  await connection.unsafe('CREATE SCHEMA public');

  // Step 2: Apply generated schema (0000_initial.sql)
  console.log('[recreate] Step 2: Applying drizzle/0000_initial.sql ...');
  await applySqlFile(connection, GENERATED_SQL);

  // Step 3: Apply hand appendix (sql/appendix.sql)
  console.log('[recreate] Step 3: Applying sql/appendix.sql ...');
  await applySqlFile(connection, APPENDIX_SQL);

  // Step 4: Seed drizzle migration tracking table
  console.log('[recreate] Step 4: Seeding migration tracking table ...');
  await seedTrackingTable(connection);

  console.log('[recreate] Done. Schema fully recreated.');
  await connection.end();
}

// ── SQL file executor ─────────────────────────────────────────────────────────
// postgres-js `connection.unsafe()` doesn't support multiple statements in one
// call. Split on semicolons outside of dollar-quoted blocks, execute each
// statement individually. Suppresses NOTICE-level warnings (e.g. auth.users)
// that would otherwise abort the script via Node stderr.
async function applySqlFile(connection: postgres.Sql, filePath: string) {
  const raw = readFileSync(filePath, 'utf-8');

  // Suppress PG NOTICE messages (e.g. "role ... does not exist")
  await connection.unsafe('SET client_min_messages = WARNING');

  const statements = splitStatements(raw);
  let applied = 0;

  for (const stmt of statements) {
    const trimmed = stmt.trim();
    if (!trimmed || trimmed.startsWith('--')) continue;

    try {
      await connection.unsafe(trimmed);
      applied++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      // Suppress auth.users WARNING-level errors (expected: Supabase owns
      // that table; the core-ts migration creates it idempotently)
      if (msg.includes('relation "auth.users"') || msg.includes('must be owner')) {
        continue;
      }
      console.error(`[recreate] Statement failed:\n${trimmed.slice(0, 200)}...`);
      throw err;
    }
  }

  console.log(`[recreate]   ${applied} statements applied from ${filePath.split('/').pop()}`);
}

/**
 * Split SQL on semicolons, respecting dollar-quoted function bodies
 * (CREATE FUNCTION $$ ... $$; must NOT be split at the inner semicolons).
 */
function splitStatements(sql: string): string[] {
  const statements: string[] = [];
  let current = '';
  let inDollarQuote = false;
  let tag = '';

  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];

    if (!inDollarQuote) {
      // Check for opening dollar tag: $$ or $tag$
      if (ch === '$') {
        let j = i + 1;
        let t = '';
        while (j < sql.length && sql[j] !== '$') {
          t += sql[j];
          j++;
        }
        if (j < sql.length) {
          // Found matching closing $
          inDollarQuote = true;
          tag = t;
          current += sql.slice(i, j + 1);
          i = j;
          continue;
        }
      }

      if (ch === ';') {
        statements.push(current);
        current = '';
        continue;
      }
    } else {
      // Inside dollar-quoted block — check for closing tag
      if (ch === '$') {
        let j = i + 1;
        let t = '';
        while (j < sql.length && sql[j] !== '$') {
          t += sql[j];
          j++;
        }
        if (j < sql.length && t === tag) {
          current += sql.slice(i, j + 1);
          i = j;
          inDollarQuote = false;
          tag = '';
          continue;
        }
      }
    }

    current += ch;
  }

  if (current.trim()) {
    statements.push(current);
  }

  return statements;
}

// ── Journal seeder (reused from migrate.ts) ───────────────────────────────────
async function seedTrackingTable(connection: postgres.Sql) {
  const journalRaw = readFileSync(JOURNAL_PATH, 'utf-8');
  const journal = JSON.parse(journalRaw) as { entries: { tag: string }[] };

  await connection.unsafe(`CREATE SCHEMA IF NOT EXISTS "drizzle"`);
  await connection.unsafe(`
    CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
      id SERIAL PRIMARY KEY,
      hash TEXT NOT NULL,
      created_at BIGINT
    )
  `);

  await connection.unsafe(`DELETE FROM "drizzle"."__drizzle_migrations"`);

  for (const entry of journal.entries) {
    const sqlPath = resolve(ROOT, 'drizzle', `${entry.tag}.sql`);
    const hash = createHash('sha256').update(readFileSync(sqlPath)).digest('hex');

    await connection.unsafe(
      `INSERT INTO "drizzle"."__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
      [hash, Date.now()],
    );
  }

  console.log(`[recreate]   Seeded ${journal.entries.length} journal entries.`);
}

run().catch((err) => {
  console.error('[recreate] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
