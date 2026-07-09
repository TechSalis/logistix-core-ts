ALTER TABLE "deliveries" ADD COLUMN "pool" boolean DEFAULT false NOT NULL;--> statement-breakpoint
CREATE INDEX "deliveries_pool_true_idx" ON "deliveries" USING btree ("pool" bool_ops) WHERE pool = true;
