#!/usr/bin/env bash
# Smoke tests for hooks/pre-commit-open-code-review.
#
# Covers what syntax/lint cannot: the skip fast-paths and the Perl deadline
# wrapper (which must fire, report a timeout, exit 0 as advisory, and leave no
# orphaned children).  Runs offline against a stubbed `ocr`; no token or
# network access required.
set -uo pipefail

HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK="${1:-$HOOK_DIR/pre-commit-open-code-review}"
if [ ! -f "$HOOK" ]; then
  echo "hook not found: $HOOK" >&2
  exit 1
fi

fail=0
pass() { printf 'ok   - %s\n' "$1"; }
bad()  { printf 'FAIL - %s\n' "$1" >&2; fail=1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Stubbed `ocr` that outlives every deadline used below.  `exec` keeps it to a
# single process so the orphan check is unambiguous.
mkdir -p "$TMP/bin"
cat > "$TMP/bin/ocr" <<'STUB'
#!/bin/sh
exec sleep 47
STUB
chmod +x "$TMP/bin/ocr"

mk_repo() {
  mkdir -p "$1" && cd "$1" || exit 1
  git init -q
  git config user.email t@example.com
  git config user.name t
  echo a > a.txt
  git add a.txt
  git commit -q -m init
}

# 1. OCR_SKIP_REVIEW=1 is a no-op.
cd "$TMP" && mk_repo skip
out="$(OCR_SKIP_REVIEW=1 PATH="$TMP/bin:$PATH" bash "$HOOK" 2>&1)"; rc=$?
if [ "$rc" -eq 0 ] && printf '%s' "$out" | grep -q 'skipping review'; then
  pass 'OCR_SKIP_REVIEW=1 → exit 0, skips'
else
  bad "OCR_SKIP_REVIEW=1 (rc=$rc)"
fi

# 2. No staged changes → skip.
cd "$TMP" && mk_repo clean
out="$(PATH="$TMP/bin:$PATH" OCR_LLM_TOKEN=dummy bash "$HOOK" 2>&1)"; rc=$?
if [ "$rc" -eq 0 ] && printf '%s' "$out" | grep -q 'No staged changes'; then
  pass 'no staged changes → exit 0'
else
  bad "no staged changes (rc=$rc): $out"
fi

# 3. Deadline fires: reported as a timeout, exit stays 0 (advisory).
cd "$TMP/clean"
printf 'b   \n' > a.txt && git add a.txt
out="$(PATH="$TMP/bin:$PATH" OCR_LLM_TOKEN=dummy OCR_REVIEW_TIMEOUT_SECONDS=2 bash "$HOOK" 2>&1)"; rc=$?
if [ "$rc" -eq 0 ]; then
  pass 'timeout → exit 0 (advisory, never blocks)'
else
  bad "timeout run exited $rc (want 0)"
fi
if printf '%s' "$out" | grep -q 'timed out'; then
  pass 'timeout is reported to the user'
else
  bad "timeout not reported: $out"
fi

# 4. No orphaned subtree survives the deadline.
sleep 1
if pgrep -f 'sleep 47' >/dev/null 2>&1; then
  bad 'orphaned ocr subtree survived the deadline'
  pkill -f 'sleep 47' 2>/dev/null
else
  pass 'no orphaned children after the deadline'
fi

if [ "$fail" -eq 0 ]; then
  echo 'all hook smoke tests passed'
else
  echo 'hook smoke tests FAILED' >&2
fi
exit "$fail"
