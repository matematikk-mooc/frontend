// Local-only config for debugging. Not used by CI.
// Records video + trace for every test so failures can be watched back.
//   APP_ENV=stage pnpm exec playwright test --config playwright.local.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests-local',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: './playwright-report-local' }],
  ],
  outputDir: './test-results-local',

  use: {
    video: { mode: 'on', size: { width: 1600, height: 1000 } },
    trace: 'on',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
      },
    },
  ],
});
