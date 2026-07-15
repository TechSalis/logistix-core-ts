ALTER TABLE "company_daily_metrics" ALTER COLUMN "date" SET DATA TYPE timestamp(3) with time zone USING "date"::timestamp(3) with time zone;
