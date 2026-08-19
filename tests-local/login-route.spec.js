// Local-only debugging spec. Read-only: it just loads the Canvas login page and
// inspects the DOM. It never logs in and never touches theme config.
//
// Run with:
//   APP_ENV=stage pnpm exec playwright test --config playwright.local.config.js
import { test, expect } from '@playwright/test';

import { getCanvasBaseUrl } from '../tests/utils/shared';
import { routeToBasicAuth } from '../tests/utils/routes';

// Give the theme JS time to load (it is injected via a <link onload> then $.getScript)
const THEME_SETTLE_MS = 6000;

const probe = (page) =>
  page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const visible = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        style.opacity !== '0'
      );
    };

    return {
      url: location.href,
      referrer: document.referrer || '(none)',
      'form#login_form exists': !!q('form#login_form'),
      'form#login_form visible': visible(q('form#login_form')),
      '#pseudonym_session_unique_id exists': !!q('#pseudonym_session_unique_id'),
      '.ic-Login exists': !!q('.ic-Login'),
      '.ic-Login visible': visible(q('.ic-Login')),
      '#wrapper exists': !!q('#wrapper'),
      '#application exists': !!q('#application'),
      '#f1_container exists': !!q('#f1_container'),
      'custom login mounted': !!q('#login-component, .login-direct-link'),
      '[data-testid="login-button"] count': document.querySelectorAll(
        '[data-testid="login-button"]',
      ).length,
      '.login-button (class) count':
        document.querySelectorAll('.login-button').length,
    };
  });

const report = (label, data) => {
  console.log(`\n──────── ${label} ────────`);
  for (const [key, value] of Object.entries(data)) {
    console.log(`  ${String(key).padEnd(38)} ${value}`);
  }
  console.log('─'.repeat(50 + label.length));
};

test.describe('DIT-1033: /login/canvas route', () => {
  test('A: current CI route — /login/canvas (no normalLogin)', async ({
    page,
  }) => {
    await page.goto(`${getCanvasBaseUrl()}/login/canvas`);
    await page.waitForTimeout(THEME_SETTLE_MS);
    report('A: /login/canvas', await probe(page));
  });

  test('B: previous CI route — /login/canvas?normalLogin=1', async ({
    page,
  }) => {
    await page.goto(`${getCanvasBaseUrl()}/login/canvas?normalLogin=1`);
    await page.waitForTimeout(THEME_SETTLE_MS);
    report('B: /login/canvas?normalLogin=1', await probe(page));
  });

  test('C: repro — routeToBasicAuth() exactly as committed on this branch', async ({
    page,
  }) => {
    // This is the helper the deploy-canvas job calls. Expected to fail the same
    // way CI does. Shortened timeout so we do not sit here for 30s.
    await routeToBasicAuth(page);
    await page.getByTestId("login-button").waitFor({ state: "visible" });
  });
});
