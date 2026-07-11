ALTER TYPE "public"."PermitStatus" RENAME TO "ApprovalStatus";--> statement-breakpoint
ALTER TYPE "public"."MessageStatus" ADD VALUE 'PENDING' BEFORE 'SENT';--> statement-breakpoint
ALTER TYPE "public"."SenderType" ADD VALUE 'AI_AGENT';--> statement-breakpoint
ALTER TYPE "public"."TransactionType" ADD VALUE 'TOPUP';--> statement-breakpoint
ALTER TABLE "dispatchers" RENAME COLUMN "permit_status" TO "approval_status";--> statement-breakpoint
ALTER TABLE "riders" RENAME COLUMN "permit_status" TO "approval_status";