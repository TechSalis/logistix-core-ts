-- Conversation Ownership System
-- Replaces binary autoReplyEnabled with explicit handler tracking

ALTER TABLE conversations ADD COLUMN handled_by TEXT;
ALTER TABLE conversations ADD COLUMN handled_by_type TEXT DEFAULT 'ai' NOT NULL;
ALTER TABLE conversations ADD COLUMN handled_at TIMESTAMP;

-- Backfill from existing autoReplyEnabled state
UPDATE conversations SET handled_by_type = 'ai' WHERE auto_reply_enabled = true;
UPDATE conversations SET handled_by_type = 'dispatcher' WHERE auto_reply_enabled = false;

-- Drop the old partial index (replaced by handled_by_type index)
DROP INDEX IF EXISTS conversations_auto_reply_disabled_idx;

CREATE INDEX conversations_handled_by_type_idx ON conversations (handled_by_type);
