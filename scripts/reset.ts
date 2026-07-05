/**
 * Reset the database by dropping and recreating the public schema,
 * then applying all migrations from scratch.
 *
 * Usage:
 *   DATABASE_URL=postgresql://... npx tsx scripts/reset.ts
 */
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[reset] FATAL: DATABASE_URL environment variable is required');
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

  console.log('[reset] Dropping public schema (all tables, enums, and data)...');
  await connection.unsafe('DROP SCHEMA IF EXISTS public CASCADE');
  await connection.unsafe('CREATE SCHEMA public');
  console.log('[reset] Public schema recreated.');

  const db = drizzle(connection);

  console.log(`[reset] Applying migrations from ${MIGRATIONS_FOLDER} ...`);
  await migrate(db, { migrationsFolder: MIGRATIONS_FOLDER });
  console.log('[reset] All migrations applied successfully.');

  await connection.end();
}

run().catch((err) => {
  console.error('[reset] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
