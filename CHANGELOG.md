# Changelog

All notable changes to `logistix-core-ts` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-01

### Added
- Initial release as a shared TypeScript package
- Drizzle ORM schema and enums (dual ESM/CJS build)
- Config modules: billing, limits, security, pricing, service, regional, client
- Shared utilities: retry, error handling, timezone, encryption, tracking IDs
- Service clients: Squad payments, FCM, email, queue, Supabase
- Zod validation schemas
- Three subpath exports: root (full), `./shared` (browser-safe), `./services` (Node-only)
