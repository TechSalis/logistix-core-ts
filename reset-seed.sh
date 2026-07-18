#!/bin/bash
# Reset staging database: drop all tables/types and re-apply squashed initial migration
set -euo pipefail

DATABASE_URL="${DATABASE_URL:?DATABASE_URL required}"

echo "[reset-seed] Dropping all objects in public schema..."
psql "$DATABASE_URL" -c "
DO \$\$ DECLARE
  r RECORD;
BEGIN
  -- Drop all tables
  FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
  END LOOP;
  -- Drop all sequences
  FOR r IN (SELECT sequencename FROM pg_sequences WHERE schemaname = 'public') LOOP
    EXECUTE 'DROP SEQUENCE IF EXISTS public.' || quote_ident(r.sequencename) || ' CASCADE';
  END LOOP;
  -- Drop all enums
  FOR r IN (SELECT typname FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE n.nspname = 'public' AND t.typtype = 'e') LOOP
    EXECUTE 'DROP TYPE IF EXISTS public.' || quote_ident(r.typname) || ' CASCADE';
  END LOOP;
  -- Drop all indexes (catch any remaining)
  FOR r IN (SELECT indexname FROM pg_indexes WHERE schemaname = 'public' AND indexname LIKE 'conversations_auto_reply_disabled_idx') LOOP
    EXECUTE 'DROP INDEX IF EXISTS public.' || quote_ident(r.indexname);
  END LOOP;
END \$\$;
"

echo "[reset-seed] Applying 0000_initial.sql..."
psql "$DATABASE_URL" -f "$(dirname "$0")/drizzle/0000_initial.sql"

echo "[reset-seed] Seeding migration tracking table..."
DATABASE_URL="$DATABASE_URL" npx tsx scripts/migrate.ts

echo "[reset-seed] Done."
