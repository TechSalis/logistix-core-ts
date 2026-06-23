import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { companies, companySettings, pricingSchemes } from '../src/drizzle/schema';
import { buildSystemConfig } from '../src/config';
import { SubscriptionTier, VehicleType } from '../src/enums';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('[seed] FATAL: DATABASE_URL environment variable is required');
  process.exit(1);
}

export async function seedSystem() {
  console.log('🌱 Seeding System Configuration...');

  const connection = postgres(DATABASE_URL, { max: 1, ssl: { rejectUnauthorized: false } });
  const db = drizzle(connection);

  const SYSTEM_CONFIG = buildSystemConfig(process.env as Record<string, string | undefined>);
  const handle = SYSTEM_CONFIG.systemHubHandle;
  const brandName = SYSTEM_CONFIG.brandName;

  // 1. Ensure the Central Hub Company exists
  const [company] = await db
    .insert(companies)
    .values({
      name: brandName,
      businessHandle: handle,
      interstateDeliveries: true,
    })
    .onConflictDoUpdate({
      target: companies.businessHandle,
      set: {
        name: brandName,
        interstateDeliveries: true,
      },
    })
    .returning();

  console.log(`✅ Central Hub Company: [${company.id}] ${company.name}`);

  // 2. Ensure Central Hub has Settings
  const [settings] = await db
    .insert(companySettings)
    .values({
      companyId: company.id,
      tier: SubscriptionTier.PROFESSIONAL,
      workingHours: SYSTEM_CONFIG.workingHours as Record<string, unknown>,
    })
    .onConflictDoUpdate({
      target: companySettings.companyId,
      set: {
        tier: SubscriptionTier.PROFESSIONAL,
        workingHours: SYSTEM_CONFIG.workingHours as Record<string, unknown>,
      },
    })
    .returning();

  console.log(`✅ Central Hub Billing Tier: ${settings.tier}`);

  // 3. Default Pricing Schemes
  const defaultPricing = [
    { vehicleType: VehicleType.BIKE, baseFare: 1000, perKmRate: 150, minFare: 1000 },
  ];

  for (const scheme of defaultPricing) {
    await db
      .insert(pricingSchemes)
      .values({
        companyId: company.id,
        vehicleType: scheme.vehicleType,
        baseFare: scheme.baseFare,
        perKmRate: scheme.perKmRate,
        minFare: scheme.minFare,
      })
      .onConflictDoNothing({
        target: [pricingSchemes.companyId, pricingSchemes.vehicleType],
      });
  }

  console.log(`✅ System configuration initialized.`);
  await connection.end();
}

// Allow direct execution
if (require.main === module || process.argv[1].endsWith('seed.ts')) {
  seedSystem().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
}
