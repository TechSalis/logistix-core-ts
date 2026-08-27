-- Owner-initiated cancellation with access-through-periodEnd.
-- ADD VALUE cannot run in a tx and is irreversible; apply before any row uses CANCELLING.
ALTER TYPE "SubscriptionStatus" ADD VALUE IF NOT EXISTS 'CANCELLING';
