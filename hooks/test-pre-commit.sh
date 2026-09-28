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

# Stubbed `ocr` that outlives every deadline used below.  It records its PID so
# the orphan check can test exactly that process — no pgrep globbing, which
# could match (or kill) unrelated processes on the host.
mkdir -p "$TMP/bin"
cat > "$TMP/bin/ocr" <<STUB
#!/bin/sh
echo \$\$ > "$TMP/ocr.pid"
exec sleep 47
STUB
chmod +x "$TMP/bin/ocr"

# A `timeout` shim that rejects every invocation, emulating an implementation
# without GNU --kill-after/--foreground (busybox-style).  With it first on PATH
# the hook's probe fails and TIMEOUT_MODE falls back to the Perl wrapper — CI
# runners ship GNU timeout, so without this the Perl deadline path would never
# be exercised there.
mkdir -p "$TMP/bin-plain-timeout"
cat > "$TMP/bin-plain-timeout/timeout" <<'SHIM'
#!/bin/sh
exit 125
SHIM
chmod +x "$TMP/bin-plain-timeout/timeout"

mk_repo() {
  mkdir -p "$1" && cd "$1" || exit 1
  git init -q
  git config user.email t@example.com
  git config user.name t
  echo a > a.txt
  git add a.txt
  git commit -q -m init
}

# 1. OCR_SKIP_REVIEW=1 is a no-op (a token is supplied so that "skipping
#    review" can only come from the skip flag, not the missing-token path).
cd "$TMP" && mk_repo skip
out="$(OCR_SKIP_REVIEW=1 OCR_LLM_TOKEN=dummy PATH="$TMP/bin:$PATH" bash "$HOOK" 2>&1)"; rc=$?
if [ "$rc" -eq 0 ] && printf '%s' "$out" | grep -q 'OCR_SKIP_REVIEW=1 — skipping review'; then
  pass 'OCR_SKIP_REVIEW=1 → exit 0, skips'
else
  bad "OCR_SKIP_REVIEW=1 (rc=$rc): $out"
fi

# 2. No staged changes → skip.
cd "$TMP" && mk_repo clean
out="$(PATH="$TMP/bin:$PATH" OCR_LLM_TOKEN=dummy bash "$HOOK" 2>&1)"; rc=$?
if [ "$rc" -eq 0 ] && printf '%s' "$out" | grep -q 'No staged changes'; then
  pass 'no staged changes → exit 0'
else
  bad "no staged changes (rc=$rc): $out"
fi

# 3. Deadline behaviour, per timeout backend.  Each case must report a timeout,
#    exit 0 (advisory, never blocks), and leave no orphaned child behind.
deadline_case() {
  label="$1"; path_prefix="$2"
  rm -f "$TMP/ocr.pid"
  cd "$TMP/clean" || return 1
  printf 'b   \n' > a.txt && git add a.txt
  out="$(PATH="$path_prefix:$TMP/bin:$PATH" OCR_LLM_TOKEN=dummy \
          OCR_REVIEW_TIMEOUT_SECONDS=2 bash "$HOOK" 2>&1)"; rc=$?
  if [ "$rc" -eq 0 ]; then
    pass "$label → exit 0 (advisory, never blocks)"
  else
    bad "$label exited $rc (want 0)"
  fi
  if printf '%s' "$out" | grep -q 'timed out'; then
    pass "$label → timeout reported"
  else
    bad "$label → timeout not reported: $out"
  fi
  sleep 1
  if [ -f "$TMP/ocr.pid" ] && kill -0 "$(cat "$TMP/ocr.pid")" 2>/dev/null; then
    bad "$label → orphaned ocr subtree survived the deadline"
    kill "$(cat "$TMP/ocr.pid")" 2>/dev/null
  else
    pass "$label → no orphaned children after the deadline"
  fi
}

# Perl wrapper: forced by the shim above (the path macOS uses natively).
deadline_case 'perl-wrapper deadline' "$TMP/bin-plain-timeout"

# GNU timeout, when the host has a real implementation (the CI runner path).
if timeout --kill-after=1 --foreground 1 true 2>/dev/null; then
  deadline_case 'gnu-timeout deadline' "$TMP/bin"
else
  echo 'skip - no GNU timeout on this host; gnu-timeout path not exercised'
fi

if [ "$fail" -eq 0 ]; then
  echo 'all hook smoke tests passed'
else
  echo 'hook smoke tests FAILED' >&2
fi
exit "$fail"
