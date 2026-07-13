import postgres from 'postgres';
import { randomUUID } from 'node:crypto';
import {
  ApprovalStatus,
  SubscriptionTier,
  SubscriptionStatus,
  VehicleType,
  RiderStatus,
} from '../src/enums.js';

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

  // Check if seed already applied (check if any companies exist)
  const [row] = await connection.unsafe<{ count: number }[]>(
    'SELECT COUNT(*)::int AS count FROM companies',
  );
  if (row.count > 0) {
    console.log('[seed] Data already exists, skipping seed');
    await connection.end();
    return;
  }

  console.log('[seed] Seeding development data...');

  // Create a sample company
  const companyId = randomUUID();
  await connection.unsafe(
    `INSERT INTO companies (id, name, contact_phone, interstate_deliveries, verification_status, created_at)
     VALUES ($1, $2, $3, $4, $5::"ApprovalStatus", NOW())`,
    [companyId, 'Demo Logistics Ltd', '+2348000000001', true, ApprovalStatus.APPROVED],
  );

  // Create company settings with default pricing
  await connection.unsafe(
    `INSERT INTO company_settings (id, company_id, tier, subscription_status, period_start, period_end, ledger_balance, created_at)
     VALUES ($1, $2, $3, $4::"SubscriptionStatus", NOW(), NOW() + INTERVAL '30 days', 0, NOW())`,
    [randomUUID(), companyId, SubscriptionTier.PROFESSIONAL, SubscriptionStatus.ACTIVE],
  );

  // Seed default pricing schemes
  const vehicleTypes = [VehicleType.BIKE, VehicleType.CAR, VehicleType.VAN, VehicleType.TRUCK];
  const schemes = [
    { baseFare: 1500, perKmRate: 200, minFare: 1500 },
    { baseFare: 3000, perKmRate: 400, minFare: 3000 },
    { baseFare: 5000, perKmRate: 600, minFare: 5000 },
    { baseFare: 8000, perKmRate: 900, minFare: 8000 },
  ];
  for (let i = 0; i < vehicleTypes.length; i++) {
    await connection.unsafe(
      `INSERT INTO pricing_schemes (id, company_id, vehicle_type, base_fare, per_km_rate, min_fare, created_at)
       VALUES ($1, $2, $3::"VehicleType", $4, $5, $6, NOW())`,
      [
        randomUUID(),
        companyId,
        vehicleTypes[i],
        schemes[i].baseFare,
        schemes[i].perKmRate,
        schemes[i].minFare,
      ],
    );
  }

  // Create a sample dispatcher
  await connection.unsafe(
    `INSERT INTO dispatchers (id, user_id, email, full_name, company_id, is_owner, approval_status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7::"ApprovalStatus", NOW())`,
    [
      randomUUID(),
      randomUUID(),
      'dispatcher@demo.com',
      'Demo Dispatcher',
      companyId,
      true,
      ApprovalStatus.APPROVED,
    ],
  );

  // Create a sample rider
  await connection.unsafe(
    `INSERT INTO riders (id, user_id, email, full_name, phone_number, vehicle_type, approval_status, status, company_id, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6::"VehicleType", $7::"ApprovalStatus", $8::"RiderStatus", $9, NOW(), NOW())`,
    [
      randomUUID(),
      randomUUID(),
      'rider@demo.com',
      'Demo Rider',
      '+2348000000002',
      VehicleType.BIKE,
      ApprovalStatus.APPROVED,
      RiderStatus.ONLINE,
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
