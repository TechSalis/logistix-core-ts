-- Promote delivery metadata fields and rider phoneNumber to top-level columns.
-- delivery: dropOffState (pool routing), vehicleType (pricing)
-- rider: phoneNumber (admin search, tracking)

-- ── deliveries ────────────────────────────────────────────────────────────────
ALTER TABLE "deliveries" ADD COLUMN "drop_off_state" text;
ALTER TABLE "deliveries" ADD COLUMN "vehicle_type" text NOT NULL DEFAULT 'BIKE';

UPDATE "deliveries"
SET
  "drop_off_state" = "metadata" ->> 'dropOffState',
  "vehicle_type" = COALESCE("metadata" ->> 'vehicleType', 'BIKE')
WHERE "metadata" IS NOT NULL;

-- ── riders ────────────────────────────────────────────────────────────────────
ALTER TABLE "riders" ADD COLUMN "phone_number" text;

UPDATE "riders"
SET "phone_number" = "metadata" ->> 'phoneNumber'
WHERE "metadata" IS NOT NULL;
