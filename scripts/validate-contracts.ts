#!/usr/bin/env npx tsx
/**
 * Thin CLI wrapper around the in-package contract validator.
 *
 * Usage: npx tsx scripts/validate-contracts.ts --web <path> --flutter <path>
 */
import { validateAll } from '../src/contracts/validate.js';

function parseArgs(argv: string[]) {
  const out: { web: string; flutter: string } = { web: '', flutter: '' };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--web' && argv[i + 1]) out.web = argv[i + 1];
    if (argv[i] === '--flutter' && argv[i + 1]) out.flutter = argv[i + 1];
  }
  return out;
}

const args = parseArgs(process.argv.slice(2));
const result = validateAll(args);
for (const f of result.failures) console.log(f);
console.log(
  result.pass ? '✓ All contract validations passed' : `✗ ${result.failures.length} failure(s)`,
);
process.exit(result.pass ? 0 : 1);
