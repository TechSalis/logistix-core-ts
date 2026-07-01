/**
 * Apply pending database migrations using drizzle-orm's migrator.
 *
 * Uses postgres-js (same driver as the app) — avoids drizzle-kit's
 * built-in pg driver which has SSL/connectivity issues with Supabase.
 *
 * Handles two edge cases:
 *  - Fresh database: migrate applies 0000_initial.sql normally.
 *  - Existing database (previously managed by `drizzle-kit push`):
 *    tables exist but __drizzle_migrations doesn't. We create the
 *    tracking table and record all journal entries as already-applied
 *    so that only incremental migrations run from here on.
 */
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { readFileSync, existsSync } from 'fs';
import { createHash } from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[migrate] FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MIGRATIONS_FOLDER = resolve(__dirname, '..', 'drizzle');
const sql = String.raw;

async function run() {
  const url = new URL(DATABASE_URL);
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const connection = postgres(DATABASE_URL, {
    max: 1,
    connect_timeout: 30,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });
  const db = drizzle(connection);

  // Check whether __drizzle_migrations tracking table exists
  const [{ exists: trackingExists }] = await db.execute<{ exists: boolean }>(sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = '__drizzle_migrations'
    )
  `);

  if (!trackingExists) {
    // Check if any app-managed tables already exist (from a previous push)
    const [{ exists: hasAppTables }] = await db.execute<{ exists: boolean }>(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_type = 'BASE TABLE'
          AND table_name NOT IN ('__drizzle_migrations', '__drizzle_migrations_lock')
      )
    `);

    if (hasAppTables) {
      console.log('[migrate] Schema exists without migration tracking. Seeding tracking table...');
      await seedTrackingTable(connection);
      console.log('[migrate] All journal entries recorded. No incremental migrations to apply.');
      await connection.end();
      return;
    }
  }

  // Normal migration path — applies pending files
  console.log(`[migrate] Applying migrations from ${MIGRATIONS_FOLDER} ...`);
  await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
  console.log('[migrate] All migrations applied successfully');

  await connection.end();
}

async function seedTrackingTable(connection: postgres.Sql) {
  const journalPath = resolve(MIGRATIONS_FOLDER, 'meta/_journal.json');
  if (!existsSync(journalPath)) {
    console.warn('[migrate] No _journal.json found, nothing to seed');
    return;
  }

  const journal = JSON.parse(readFileSync(journalPath, 'utf-8')) as {
    entries: { tag: string }[];
  };

  await connection.unsafe(`
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
      id SERIAL PRIMARY KEY,
      hash TEXT NOT NULL,
      created_at BIGINT
    )
  `);

  for (const entry of journal.entries) {
    const sqlPath = resolve(MIGRATIONS_FOLDER, `${entry.tag}.sql`);
    const hash = existsSync(sqlPath)
      ? createHash('sha256').update(readFileSync(sqlPath)).digest('hex')
      : entry.tag;

    await connection.unsafe(
      `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
      [hash, Date.now()],
    );
  }
}

run().catch((err) => {
  console.error('[migrate] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
