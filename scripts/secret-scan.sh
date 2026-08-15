#!/usr/bin/env bash
# F17 secret-scan gate. Pinned gitleaks (no licensed action needed).
# Scans the working tree; `.gitleaks.toml` at the repo root holds the allowlist.
set -euo pipefail

GITLEAKS_VERSION="${GITLEAKS_VERSION:-8.30.1}"
PLATFORM="$(uname -s)-$(uname -m)"
case "${PLATFORM}" in
  Linux-x86_64) ASSET="linux_x64" ;;
  Linux-arm64) ASSET="linux_arm64" ;;
  Darwin-arm64) ASSET="darwin_arm64" ;;
  *) echo "::error::unsupported platform ${PLATFORM}" >&2; exit 1 ;;
esac

CACHE_DIR="${RUNNER_TEMP:-/tmp}/gitleaks-${GITLEAKS_VERSION}"
BIN="${CACHE_DIR}/gitleaks"
if [ ! -x "${BIN}" ]; then
  mkdir -p "${CACHE_DIR}"
  ARCHIVE="gitleaks_${GITLEAKS_VERSION}_${ASSET}.tar.gz"
  curl -fsSL "https://github.com/gitleaks/gitleaks/releases/download/v${GITLEAKS_VERSION}/${ARCHIVE}" -o "${CACHE_DIR}/${ARCHIVE}"
  tar -xzf "${CACHE_DIR}/${ARCHIVE}" -C "${CACHE_DIR}"
  chmod +x "${BIN}"
fi

exec "${BIN}" dir . --no-banner --redact
