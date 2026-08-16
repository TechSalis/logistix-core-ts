CREATE TYPE "public"."DevicePlatform" AS ENUM('ANDROID', 'IOS', 'WEB');

CREATE TABLE IF NOT EXISTS "device_tokens" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "device_id" text NOT NULL,
  "platform" "public"."DevicePlatform" NOT NULL,
  "fcm_token" text,
  "created_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "updated_at" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS "device_tokens_user_id_device_id_key"
  ON "device_tokens" USING btree ("user_id" text_ops, "device_id" text_ops);
CREATE UNIQUE INDEX IF NOT EXISTS "device_tokens_fcm_token_key"
  ON "device_tokens" USING btree ("fcm_token" text_ops);
CREATE INDEX IF NOT EXISTS "device_tokens_user_id_idx"
  ON "device_tokens" USING btree ("user_id" text_ops);

ALTER TABLE "refresh_sessions"
  ADD COLUMN IF NOT EXISTS "device_id" text DEFAULT 'unknown' NOT NULL;
ALTER TABLE "refresh_sessions" ALTER COLUMN "device_id" DROP DEFAULT;

ALTER TABLE "refresh_sessions"
  ADD COLUMN IF NOT EXISTS "last_active_at" timestamp(3);

ALTER TABLE "riders" DROP COLUMN IF EXISTS "fcm_token";
ALTER TABLE "dispatchers" DROP COLUMN IF EXISTS "fcm_token";
ALTER TABLE "admins" DROP COLUMN IF EXISTS "fcm_token";
