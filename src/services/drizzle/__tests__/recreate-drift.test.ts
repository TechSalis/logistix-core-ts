import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../../../../');
const GENERATED_SQL = path.join(ROOT, 'drizzle', '0000_initial.sql');
const generatedSrc = fs.readFileSync(GENERATED_SQL, 'utf-8');

/**
 * Guard: the generated 0000_initial.sql must NOT contain hand-owned
 * appendices. Only drizzle-generated DDL lives here.
 */
describe('0000_initial.sql hand-marker guard', () => {
  it('does not contain hand-owned DDL markers', () => {
    const markers = [
      'CREATE EXTENSION IF NOT EXISTS',
      'cron.schedule',
      'pgmq.create',
      'CREATE OR REPLACE FUNCTION pg_cron',
      'GRANT ALL',
    ];
    for (const marker of markers) {
      expect(generatedSrc).not.toContain(marker);
    }
  });

  it('ends with the APPENDIX sentinel', () => {
    expect(generatedSrc.trimEnd()).toMatch(/APPENDIX.*sql\/appendix\.sql/);
  });

  it('contains IN_TRANSIT in DeliveryStatus enum', () => {
    expect(generatedSrc).toMatch(/CREATE TYPE "public"."DeliveryStatus" AS ENUM.*IN_TRANSIT/s);
  });

  it('contains SUSPENDED in RiderStatus enum', () => {
    expect(generatedSrc).toMatch(/CREATE TYPE "public"."RiderStatus" AS ENUM.*SUSPENDED/s);
  });
});
