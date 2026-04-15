import { describe } from 'node:test';
import { test } from '@playwright/test';

import {
  useDesktopViewport,
  getBasicAuth,
  getEnv,
  getAppVersion,
} from '../utils/shared';
import { routeToBasicAuth, routeToAuthThemeEditor } from '../utils/routes';
import { loginWithBasicAuth } from '../utils/auth';

describe('Canvas: Theme', async () => {
  const themeName = `theme-kursp-${getEnv()}-${getAppVersion()}`;
  useDesktopViewport();

  test('2: Deploy Theme', async ({ page }) => {
    test.setTimeout(600_000);

    await test.step('2.1 Login to Canvas', async () => {
      await routeToBasicAuth(page);
      await loginWithBasicAuth(page, getBasicAuth());
    });

    await test.step('2.2 Make sure theme exists', async () => {
      await routeToAuthThemeEditor(page);

      await page
        .locator('.ic-ThemeCard-container__Main')
        .locator('[data-testid="themecard-name-button-name"]')
        .filter({ hasText: themeName })
        .first()
        .waitFor({ state: 'visible' });
    });

    await test.step('2.3 Open theme in editor', async () => {
      await page
        .locator('.ic-ThemeCard-container__Main')
        .locator('[data-testid="themecard-name-button-name"]')
        .filter({ hasText: themeName })
        .first()
        .click();
      await page.waitForURL('**/accounts/1/theme_editor');
    });

    await test.step('2.4 Activate theme', async () => {
      const isActive = await page
        .locator('header.Theme__header--is-active-theme')
        .isVisible()
        .catch(() => false);
      if (isActive)
        test.skip(true, 'Theme already active, skip activating theme');

      await page
        .locator('.Theme__header-primary button:not([disabled])')
        .click();

      await page
        .locator('button[data-testid="apply-theme-proceed-button"]')
        .click();

      await page
        .locator('[role="progressbar"]')
        .first()
        .waitFor({ state: 'visible', timeout: 30_000 })
        .catch(() => {});
      await page
        .locator('[role="progressbar"]')
        .first()
        .waitFor({ state: 'hidden', timeout: 300_000 })
        .catch(() => {});

      await page.waitForURL('**/accounts/1/brand_configs', {
        timeout: 300_000,
      });
    });

    await test.step('2.5 Verify theme is active', async () => {
      await page
        .locator(
          '.ic-ThemeCard--is-active-theme [data-testid="themecard-name-button-name"]',
        )
        .filter({ hasText: themeName })
        .waitFor({ state: 'visible' });
    });
  });
});
