import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import postgres from 'postgres';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');
const PROJECT_DIR = resolve(__dirname, '..');
const MIGRATIONS_FOLDER = resolve(PROJECT_DIR, 'drizzle');

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[reset] FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

async function run() {
  const url = new URL(DATABASE_URL);
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const sql = postgres(DATABASE_URL, {
    max: 1,
    connect_timeout: 30,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });

  console.log('[reset] Dropping all tables...');

  await sql.unsafe(`DROP TABLE IF EXISTS "rider_location_logs" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "delivery_allocations" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "payment_transactions" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "ledger_transactions" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "export_requests" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "event_logs" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "escalations" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "messages" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "conversations" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "deliveries" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "dispatchers" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "riders" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "blocked_ips" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "admins" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "pricing_schemes" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "company_integrations" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "company_daily_metrics" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "company_settings" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "companies" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE`);
  await sql.unsafe(`DROP TABLE IF EXISTS "__drizzle_migrations_lock" CASCADE`);

  const types = [
    'ChannelType',
    'DeliveryStatus',
    'EscalatedTo',
    'EscalationStatus',
    'ExportRequestStatus',
    'LedgerAdjustmentType',
    'MappingPlatform',
    'MessageStatus',
    'PaymentMethod',
    'PaymentProvider',
    'ApprovalStatus',
    'RiderStatus',
    'SenderType',
    'SubscriptionStatus',
    'SubscriptionTier',
    'TransactionStatus',
    'TransactionType',
    'VehicleType',
  ];
  for (const type of types) {
    await sql.unsafe(`DROP TYPE IF EXISTS "${type}" CASCADE`);
  }

  console.log('[reset] All tables and types dropped');

  // Apply migration SQL directly (bypasses drizzle migrate() which has PgBouncer issues)
  console.log('[reset] Applying 0000_initial.sql...');
  const sqlPath = resolve(MIGRATIONS_FOLDER, '0000_initial.sql');
  const migrationSql = readFileSync(sqlPath, 'utf-8');
  await sql.unsafe(migrationSql);

  // Seed the drizzle tracking table so future migrate() calls see it as applied
  console.log('[reset] Seeding tracking table...');
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
      id SERIAL PRIMARY KEY,
      hash TEXT NOT NULL,
      created_at BIGINT
    )
  `);
  await sql.unsafe(`DELETE FROM "__drizzle_migrations"`);
  const hash = createHash('sha256').update(readFileSync(sqlPath)).digest('hex');
  await sql.unsafe(`INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`, [
    hash,
    Date.now(),
  ]);

  console.log('[reset] Migration applied');

  // Run seed
  await sql.end();

  console.log('[reset] Running seed...');
  const { execSync } = await import('node:child_process');
  execSync('npx tsx scripts/seed.ts', {
    env: { ...process.env, DATABASE_URL },
    cwd: PROJECT_DIR,
    stdio: 'inherit',
  });

  console.log('[reset] Database reset complete');
}

run().catch((err) => {
  console.error('[reset] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
