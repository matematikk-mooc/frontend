#!/bin/bash
# E2E test runner: Utdanningsdirektoratet/dit-e2e-playwright
#
# Modes (selected by APP_ENV):
#   development  → start local webpack-dev-server, run tests against bibsys.test.instructure.com with the use_localhost_theme cookie injected.
#   stage        → run tests against bibsys.test.instructure.com (deployed theme).
#   production   → run tests against bibsys.instructure.com (deployed theme).
#
# Required env vars (always):
#   APP_ENV
#   TEST_CANVAS_CHROMIUM_USERNAME
#   TEST_CANVAS_CHROMIUM_PASSWORD

set -e

ROOT_DIR=$(pwd)
CLONE_DIR="./.tests_playwright"
REPO_URL="https://github.com/Utdanningsdirektoratet/dit-e2e-playwright.git"
DEV_SERVER_URL="${DEV_SERVER_URL:-http://localhost:9000}"
DEV_SERVER_PORT="${DEV_SERVER_URL##*:}"
DEV_SERVER_PORT="${DEV_SERVER_PORT%%/*}"

# Backwards compatibility
: "${TEST_KOMP_CHROMIUM_USERNAME:=${TEST_CANVAS_CHROMIUM_USERNAME:-}}"
: "${TEST_KOMP_CHROMIUM_PASSWORD:=${TEST_CANVAS_CHROMIUM_PASSWORD:-}}"
export TEST_KOMP_CHROMIUM_USERNAME TEST_KOMP_CHROMIUM_PASSWORD

MISSING=()
[ -z "$APP_ENV" ] && MISSING+=("APP_ENV")
[ -z "$TEST_KOMP_CHROMIUM_USERNAME" ] && MISSING+=("TEST_KOMP_CHROMIUM_USERNAME")
[ -z "$TEST_KOMP_CHROMIUM_PASSWORD" ] && MISSING+=("TEST_KOMP_CHROMIUM_PASSWORD")

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "✗ Missing required environment variables:"
  for var in "${MISSING[@]}"; do
    echo "  - $var"
  done
  exit 1
fi

case "$APP_ENV" in
  development) TEST_ENV=local ;;
  stage)       TEST_ENV=stage ;;
  production)  TEST_ENV=production ;;
  *) echo "✗ Unknown APP_ENV: $APP_ENV (expected: development | stage | production)"; exit 1 ;;
esac
export TEST_ENV

cleanup() {
  if [ -n "$DEV_SERVER_PID" ]; then
   # Kill the parent process
    kill "$DEV_SERVER_PID" 2>/dev/null || true
    
    # Kill any remaining processes still listening on the dev server port
    # This catches orphaned child processes (e.g. webpack-dev-server)
    if command -v lsof > /dev/null 2>&1; then
      lsof -ti:"$DEV_SERVER_PORT" | xargs kill 2>/dev/null || true
    fi

    wait "$DEV_SERVER_PID" 2>/dev/null || true
    echo "✓ Dev server stopped"
  fi
}
trap cleanup EXIT

echo "=== Playwright Test Runner ==="
echo "  APP_ENV  = $APP_ENV"
echo "  TEST_ENV = $TEST_ENV"

# ── Setup (local only — CI handles these via actions) ──
if [ -z "$CI" ]; then
  for cmd in node pnpm git curl make; do
    command -v "$cmd" > /dev/null 2>&1 || { echo "✗ Required command not found: $cmd"; exit 1; }
  done

  echo "Repository: $REPO_URL"
  echo ""

  # Clone repo if needed
  if [ -d "$CLONE_DIR" ]; then
    echo "✓ Test directory exists, pulling latest"
    git -C "$CLONE_DIR" pull --ff-only --depth=1 || true
  else
    echo "Cloning repository..."
    git clone --depth 1 "$REPO_URL" "$CLONE_DIR"
  fi

  # Install main project dependencies
  echo "Installing main project dependencies..."
  pnpm install

  # Setup test project
  cd "$CLONE_DIR"

  # Install test dependencies if needed
  if [ -d "node_modules" ]; then
    echo "✓ Test dependencies already installed"
  else
    echo "Installing test dependencies + Playwright browsers..."
    make install
  fi
  cd "$ROOT_DIR"
fi

# ── Start dev server (development only) ──
if [ "$APP_ENV" = "development" ]; then
  # Fail fast if port is already in use
  if command -v lsof > /dev/null 2>&1 && lsof -ti:"$DEV_SERVER_PORT" > /dev/null 2>&1; then
    echo "✗ Port $DEV_SERVER_PORT is already in use"
    exit 1
  fi

  pnpm watch &
  DEV_SERVER_PID=$!
  echo "✓ Dev server started (PID $DEV_SERVER_PID)"

  # ── Wait for dev server ──
  echo "Waiting for dev server at $DEV_SERVER_URL..."
  for i in $(seq 1 30); do
    if curl -s --max-time 5 "$DEV_SERVER_URL" > /dev/null 2>&1; then
      break
    fi

    if ! kill -0 $DEV_SERVER_PID 2>/dev/null; then
      echo "✗ Dev server process died"
      exit 1
    fi

    [ $i -eq 30 ] && { echo "✗ Dev server timeout"; exit 1; }
    sleep 2
  done
  echo "✓ Dev server ready"

  export TEST_CANVAS_LOCAL_THEME=true
fi

# ── Run tests ──
echo ""
echo "=== Running Playwright Tests ==="
cd "$CLONE_DIR"
make test FILTER='komp-frontend-canvas-*' TEST_ENV="$TEST_ENV"
