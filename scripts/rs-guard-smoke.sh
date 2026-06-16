#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "==> Installing rs-guard from pinned release"
RS_GUARD_INSTALL_DIR="$(mktemp -d)"
export RS_GUARD_INSTALL_DIR
"$SCRIPT_DIR/rs-guard-install.sh"

RS_GUARD_BIN="$RS_GUARD_INSTALL_DIR/rs-guard"

echo "==> Verifying rs-guard config files"
test -f "$REPO_ROOT/.reviewer.toml"
test -f "$REPO_ROOT/.github/review-prompt.md"
test -f "$REPO_ROOT/bin/rs-guard.manifest"

echo "==> Running dry-run against fixture diff"
FIXTURE_DIFF="$SCRIPT_DIR/fixtures/rs-guard-sample.diff"
test -f "$FIXTURE_DIFF"

if [[ -n "${DEEPSEEK_API_KEY:-}" ]]; then
  DRY_RUN_BIN="$RS_GUARD_BIN"
  if [[ "$(uname -s)" != "Linux" ]]; then
    if command -v rs-guard &>/dev/null; then
      DRY_RUN_BIN="rs-guard"
    elif [[ -x "$HOME/.cargo/bin/rs-guard" ]]; then
      DRY_RUN_BIN="$HOME/.cargo/bin/rs-guard"
    else
      echo "DEEPSEEK_API_KEY is set but no local rs-guard binary found — skipping API dry-run on non-Linux host."
      echo "rs-guard smoke test passed."
      exit 0
    fi
  fi

  # Force file/local mode even when invoked from GitHub Actions.
  env -u GITHUB_ACTIONS -u GITHUB_TOKEN -u PR_NUMBER -u REPO_FULL_NAME \
    "$DRY_RUN_BIN" \
    --diff-file "$FIXTURE_DIFF" \
    --prompt-file "$REPO_ROOT/.github/review-prompt.md" \
    --dry-run
  echo "Dry-run integration test passed."
else
  echo "DEEPSEEK_API_KEY not set — skipping API dry-run (download/checksum smoke passed)."
fi

echo "rs-guard smoke test passed."
