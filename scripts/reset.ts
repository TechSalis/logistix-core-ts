import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[reset] FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

async function run() {
  const url = new URL(DATABASE_URL);
  const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  const connection = postgres(DATABASE_URL, {
    max: 1,
    connect_timeout: 30,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });
  const db = drizzle(connection);

  console.log('[reset] Dropping all tables...');

  // Drop in dependency order (children first, then parents, then types)
  await db.execute(`DROP TABLE IF EXISTS "rider_location_logs" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "delivery_allocations" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "payment_transactions" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "ledger_transactions" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "export_requests" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "event_logs" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "escalations" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "messages" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "conversations" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "deliveries" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "dispatchers" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "riders" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "blocked_ips" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "admins" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "pricing_schemes" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "company_integrations" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "company_daily_metrics" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "company_settings" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "companies" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "__drizzle_migrations" CASCADE`);
  await db.execute(`DROP TABLE IF EXISTS "__drizzle_migrations_lock" CASCADE`);

  // Drop enum types
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
    'PermitStatus',
    'RiderStatus',
    'SenderType',
    'SubscriptionStatus',
    'SubscriptionTier',
    'TransactionStatus',
    'TransactionType',
    'VehicleType',
  ];
  for (const type of types) {
    await db.execute(`DROP TYPE IF EXISTS "${type}" CASCADE`);
  }

  console.log('[reset] All tables and types dropped');
  await connection.end();

  // Run migration
  console.log('[reset] Running migration...');
  const { execSync } = await import('node:child_process');
  execSync('npx tsx scripts/migrate.ts', {
    env: { ...process.env, DATABASE_URL },
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  // Run seed
  console.log('[reset] Running seed...');
  execSync('npx tsx scripts/seed.ts', {
    env: { ...process.env, DATABASE_URL },
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  console.log('[reset] Database reset complete');
}

run().catch((err) => {
  console.error('[reset] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
