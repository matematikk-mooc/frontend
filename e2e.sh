#!/bin/bash
set -e

ROOT_DIR=$(pwd)
CLONE_DIR="./.tests_playwright"
REPO_URL="https://github.com/matematikk-mooc/frontend-react.git"
DEV_SERVER_URL="${DEV_SERVER_URL:-http://localhost:9000}"
DEV_SERVER_PORT="${DEV_SERVER_URL##*:}"
DEV_SERVER_PORT="${DEV_SERVER_PORT%%/*}"

# Validate required environment variables
MISSING=()
[ -z "$APP_ENV" ] && MISSING+=("APP_ENV")
[ -z "$TEST_CANVAS_CHROMIUM_USERNAME" ] && MISSING+=("TEST_CANVAS_CHROMIUM_USERNAME")
[ -z "$TEST_CANVAS_CHROMIUM_PASSWORD" ] && MISSING+=("TEST_CANVAS_CHROMIUM_PASSWORD")

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "✗ Missing required environment variables:"
  for var in "${MISSING[@]}"; do
    echo "  - $var"
  done
  exit 1
fi

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

# ── Setup (local only — CI handles these via actions) ──
if [ -z "$CI" ]; then
  # Validate required commands
  for cmd in node pnpm git curl; do
    command -v "$cmd" > /dev/null 2>&1 || { echo "✗ Required command not found: $cmd"; exit 1; }
  done

  echo "Repository: $REPO_URL"
  echo ""

  # Clone repo if needed
  if [ -d "$CLONE_DIR" ]; then
    echo "✓ Test directory exists, skipping clone"
  else
    echo "Cloning repository..."
    git clone "$REPO_URL" "$CLONE_DIR"
  fi

  # Install main project dependencies
  echo "Installing main project dependencies..."
  pnpm install

  # Setup test project
  cd "$CLONE_DIR"

  # Check Node version
  NODE_VERSION=$(node -v)
  [[ $NODE_VERSION =~ ^v22\. ]] || { echo "✗ Node.js v22 required (found $NODE_VERSION)"; exit 1; }
  echo "✓ Node.js $NODE_VERSION"

  # Install test dependencies if needed
  if [ -d "node_modules" ]; then
    echo "✓ Test dependencies already installed"
  else
    echo "Installing test dependencies..."
    pnpm install
  fi

  # Install Playwright browsers
  pnpm exec playwright install

  cd "$ROOT_DIR"
fi

# ── Setup .env.test ──
if [ ! -f "$CLONE_DIR/.env.test" ]; then
  cat > "$CLONE_DIR/.env.test" << EOF
APP_ENV=${APP_ENV}
TEST_CANVAS_LOCAL_THEME=${TEST_CANVAS_LOCAL_THEME:-true}
TEST_CANVAS_CHROMIUM_USERNAME="${TEST_CANVAS_CHROMIUM_USERNAME}"
TEST_CANVAS_CHROMIUM_PASSWORD="${TEST_CANVAS_CHROMIUM_PASSWORD}"
EOF
  echo "✓ Created .env.test"
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
fi

# ── Run tests ──
echo ""
echo "=== Running Playwright Tests ==="
cd "$CLONE_DIR"
pnpm run test:canvas:chromium
