-- Backstop for the initiateSubscription double-submit race: at most one
-- PENDING subscription transaction per company. The FOR UPDATE guard in
-- initiateSubscription cannot lock rows that don't exist yet, so two concurrent
-- first-time subscriptions could both insert a PENDING row; this partial unique
-- index makes the loser conflict, which onConflictDoNothing swallows.
CREATE UNIQUE INDEX "subscription_transactions_one_pending_company"
  ON "subscription_transactions" ("company_id")
  WHERE "status" = 'PENDING';
