import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { baseTypeDefs, publicTypeDefs, adminTypeDefs } from '../src/contracts/typeDefs/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

function normalize(sdl: string): string {
  return sdl
    .split('\n')
    .map((line) => line.replace(/^ {2}/, ''))
    .join('\n')
    .replace(/^\n+/, '')
    .replace(/\s+$/, '\n');
}

async function main() {
  const sdl = [baseTypeDefs, publicTypeDefs, adminTypeDefs].join('\n\n');
  const header =
    '# Auto-generated from logistix-core-ts typeDefs — do not edit manually\n# Regenerate via: npm run schema:generate (core-ts)\n\n';
  const combined = `${header}${normalize(sdl)}`;
  const outPath = join(ROOT, 'src/contracts/schema.graphql');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, combined);
  console.log(`Generated ${outPath} (${Buffer.byteLength(combined)} bytes)`);
}

main().catch((e) => {
  console.error('Failed to generate schema:', e);
  process.exit(1);
});
