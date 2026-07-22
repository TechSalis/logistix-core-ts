-- Promote cac and nipostLicenseNumber from metadata JSONB to top-level columns
-- on the companies table for proper indexing, type safety, and query performance.

-- Add columns (nullable initially for data backfill)
ALTER TABLE "companies" ADD COLUMN "cac" text;
ALTER TABLE "companies" ADD COLUMN "nipost_license_number" text;

-- Backfill from metadata JSONB
UPDATE "companies"
SET
  "cac" = "metadata" ->> 'cac',
  "nipost_license_number" = "metadata" ->> 'nipostLicenseNumber'
WHERE "metadata" IS NOT NULL;

-- Add unique index on cac (NULLs are allowed — only non-null values must be unique)
CREATE UNIQUE INDEX "companies_cac_key" ON "companies" ("cac");
