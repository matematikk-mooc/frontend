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
    await test.step('2.1 Login to Canvas', async () => {
      await routeToBasicAuth(page);
      await loginWithBasicAuth(page, getBasicAuth());
    });

    await test.step('2.2 Make sure theme exists', async () => {
      await routeToAuthThemeEditor(page);

      await page
        .locator('.ic-ThemeCard-container__Main')
        .locator(
          '.ic-ThemeCard-main__name span:has-text("' + themeName + '")',
        )
        .waitFor({ state: 'visible' });
    });

    await test.step('2.3 Open theme in editor', async () => {
      await page
        .locator('.ic-ThemeCard-container__Main')
        .locator(
          '.ic-ThemeCard-main__name button:has-text("' + themeName + '")',
        )
        .click();
      await page.waitForURL('**/accounts/1/theme_editor');
    });

    await test.step('2.4 Activate theme', async () => {
      const isVisable = await page
        .locator('header.Theme__header--is-active-theme')
        .isVisible();
      if (isVisable)
        test.skip(true, 'Theme already active, skip activating theme');

      page
        .locator('.Theme__header-primary button:has-text("Bruk tema")')
        .click();

      page.on('dialog', async (dialog) => {
        await dialog.accept();
      });

      await page
        .locator('h2:has-text("Legg til nye stiler til underkontoer")')
        .waitFor({ state: 'visible' });

      test.setTimeout(5 * 60 * 1000);
      await page.waitForURL('**/accounts/1/brand_configs?theme_applied=1', {
        timeout: 5 * 60 * 1000,
      });
    });
  });
});
