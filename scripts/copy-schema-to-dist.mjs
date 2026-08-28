import { copyFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const src = join(__dirname, '../src/contracts/schema.graphql');
const outDir = join(__dirname, '../dist/contracts');
mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, 'schema.graphql'));
