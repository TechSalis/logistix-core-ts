import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { randomUUID } from 'node:crypto';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[seed] FATAL: DATABASE_URL environment variable is required');
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

  // Check if seed already applied (check if any companies exist)
  const [{ count }] = await db.execute<{ count: number }>(
    'SELECT COUNT(*)::int AS count FROM companies',
  );
  if (count > 0) {
    console.log('[seed] Data already exists, skipping seed');
    await connection.end();
    return;
  }

  console.log('[seed] Seeding development data...');

  // Create a sample company
  const companyId = randomUUID();
  await db.execute(
    `INSERT INTO companies (id, name, contact_phone, interstate_deliveries, verification_status, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())`,
    [companyId, 'Demo Logistics Ltd', '+2348000000001', true, 'APPROVED'],
  );

  // Create company settings with default pricing
  await db.execute(
    `INSERT INTO company_settings (id, company_id, tier, subscription_status, period_start, period_end, ledger_balance, created_at)
     VALUES ($1, $2, $3, $4, NOW(), NOW() + INTERVAL '30 days', 0, NOW())`,
    [randomUUID(), companyId, 'PROFESSIONAL', 'ACTIVE'],
  );

  // Seed default pricing schemes
  const vehicles = ['BIKE', 'CAR', 'VAN', 'TRUCK'];
  const schemes = [
    { baseFare: 1500, perKmRate: 200, minFare: 1500 },
    { baseFare: 3000, perKmRate: 400, minFare: 3000 },
    { baseFare: 5000, perKmRate: 600, minFare: 5000 },
    { baseFare: 8000, perKmRate: 900, minFare: 8000 },
  ];
  for (let i = 0; i < vehicles.length; i++) {
    await db.execute(
      `INSERT INTO pricing_schemes (id, company_id, vehicle_type, base_fare, per_km_rate, min_fare, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
      [
        randomUUID(),
        companyId,
        vehicles[i],
        schemes[i].baseFare,
        schemes[i].perKmRate,
        schemes[i].minFare,
      ],
    );
  }

  // Create a sample dispatcher
  await db.execute(
    `INSERT INTO dispatchers (id, user_id, email, full_name, company_id, is_owner, approval_status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
    [
      randomUUID(),
      randomUUID(),
      'dispatcher@demo.com',
      'Demo Dispatcher',
      companyId,
      true,
      'APPROVED',
    ],
  );

  // Create a sample rider
  await db.execute(
    `INSERT INTO riders (id, user_id, email, full_name, phone_number, vehicle_type, approval_status, status, company_id, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())`,
    [
      randomUUID(),
      randomUUID(),
      'rider@demo.com',
      'Demo Rider',
      '+2348000000002',
      'BIKE',
      'APPROVED',
      'ONLINE',
      companyId,
    ],
  );

  console.log('[seed] Development data seeded successfully');
  await connection.end();
}

run().catch((err) => {
  console.error('[seed] Failed:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
