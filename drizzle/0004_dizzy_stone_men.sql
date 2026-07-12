ALTER TABLE "messages" ADD COLUMN "action_type" text;--> statement-breakpoint
CREATE INDEX "messages_action_type_idx" ON "messages" USING btree ("action_type");