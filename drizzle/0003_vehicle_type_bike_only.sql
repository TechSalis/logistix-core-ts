ALTER TABLE "deliveries" ALTER COLUMN "vehicle_type" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "riders" ALTER COLUMN "vehicle_type" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "vehicle_type" TYPE text USING "vehicle_type"::text;--> statement-breakpoint
ALTER TABLE "riders" ALTER COLUMN "vehicle_type" TYPE text USING "vehicle_type"::text;--> statement-breakpoint
DROP TYPE "public"."VehicleType";--> statement-breakpoint
CREATE TYPE "public"."VehicleType" AS ENUM('BIKE');--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "vehicle_type" TYPE "public"."VehicleType" USING 'BIKE'::"public"."VehicleType";--> statement-breakpoint
ALTER TABLE "riders" ALTER COLUMN "vehicle_type" TYPE "public"."VehicleType" USING 'BIKE'::"public"."VehicleType";--> statement-breakpoint
ALTER TABLE "deliveries" ALTER COLUMN "vehicle_type" SET DEFAULT 'BIKE'::"public"."VehicleType";--> statement-breakpoint
ALTER TABLE "riders" ALTER COLUMN "vehicle_type" SET DEFAULT 'BIKE'::"public"."VehicleType";--> statement-breakpoint
