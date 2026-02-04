#!/bin/bash
set -e

ROOT_DIR=$(pwd)
REPO_URL="https://github.com/matematikk-mooc/frontend-react.git"
CLONE_DIR="./.tests_playwright"
DEV_SERVER_URL="${DEV_SERVER_URL:-http://localhost:9000}"

cleanup() {
    [ -n "$DEV_SERVER_PID" ] && kill $DEV_SERVER_PID 2>/dev/null && echo "✓ Dev server stopped"
}
trap cleanup EXIT

echo "=== Playwright Test Runner ==="
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

echo "Installing test dependencies..."
pnpm install
pnpm exec playwright install

# Setup .env.test if needed
if [ ! -f ".env.test" ]; then
    cat > .env.test << EOF
APP_ENV=${APP_ENV}
TEST_CANVAS_LOCAL_THEME=true
TEST_CANVAS_CHROMIUM_USERNAME="${TEST_CANVAS_CHROMIUM_USERNAME}"
TEST_CANVAS_CHROMIUM_PASSWORD="${TEST_CANVAS_CHROMIUM_PASSWORD}"
TEST_CANVAS_FIREFOX_USERNAME="${TEST_CANVAS_FIREFOX_USERNAME}"
TEST_CANVAS_FIREFOX_PASSWORD="${TEST_CANVAS_FIREFOX_PASSWORD}"
TEST_CANVAS_WEBKIT_USERNAME="${TEST_CANVAS_WEBKIT_USERNAME}"
TEST_CANVAS_WEBKIT_PASSWORD="${TEST_CANVAS_WEBKIT_PASSWORD}"
EOF
    echo "✓ Created .env.test"
fi

# Start dev server
cd "$ROOT_DIR"
pnpm watch &
DEV_SERVER_PID=$!
echo "✓ Dev server started (PID $DEV_SERVER_PID)"

# Wait for server
echo "Waiting for dev server..."
for i in $(seq 1 30); do
    curl -s "$DEV_SERVER_URL" > /dev/null 2>&1 && break
    [ $i -eq 30 ] && { echo "✗ Dev server timeout"; exit 1; }
    sleep 2
done
echo "✓ Dev server ready"

# Run tests
echo ""
echo "=== Running Playwright Tests ==="
cd "$CLONE_DIR"
pnpm run test:canvas:chromium
