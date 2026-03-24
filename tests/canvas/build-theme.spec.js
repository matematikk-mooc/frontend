import { describe } from 'node:test';
import { test } from '@playwright/test';

import {
  useDesktopViewport,
  getBasicAuth,
  getEnv,
  getAppVersion,
  getThemeFiles,
} from '../utils/shared';
import { routeToBasicAuth, routeToAuthThemeEditor } from '../utils/routes';
import { loginWithBasicAuth } from '../utils/auth';

describe('Canvas: Theme', async () => {
  const themeName = `theme-kursp-${getEnv()}-${getAppVersion()}`;
  useDesktopViewport();

  test('1: Build Theme', async ({ page }) => {
    test.setTimeout(600_000);
    const { jsFile, cssFile } = await getThemeFiles();

    await test.step('1.1 Login to Canvas', async () => {
      await routeToBasicAuth(page);
      await loginWithBasicAuth(page, getBasicAuth());
    });

    await test.step('1.2 Route to theme editor', async () => {
      await routeToAuthThemeEditor(page);

      const isVisible = await page
        .locator('.ic-ThemeCard-container__Main')
        .locator('[data-testid="themecard-name-button-name"]')
        .filter({ hasText: themeName })
        .first()
        .isVisible()
        .catch(() => false);
      if (isVisible)
        test.skip(true, 'Theme already exists, skip uploading theme');

      await page.locator('button[data-testid="new-theme-button"]').click();
      await page.waitForSelector('div[role="menu"]', { state: 'visible' });
      await page.locator('span[role="menuitemradio"]').first().click();

      await page.waitForURL('**/accounts/1/theme_editor');
    });

    await test.step('1.3 Upload JS and CSS files', async () => {
      await page.locator('div[role="tab"]').nth(1).click();
      await page
        .locator('.Theme__editor-upload-overrides')
        .first()
        .waitFor({ state: 'visible' });

      const cssFileInput = page
        .locator('.ThemeEditorFileUpload')
        .filter({ has: page.locator('input[accept=".css"]') })
        .first()
        .locator('input[type="file"]');
      const jsFileInput = page
        .locator('.ThemeEditorFileUpload')
        .filter({ has: page.locator('input[accept=".js"]') })
        .first()
        .locator('input[type="file"]');

      await cssFileInput.setInputFiles(cssFile);
      await jsFileInput.setInputFiles(jsFile);
    });

    await test.step('1.4 Preview changes', async () => {
      await page.locator('.Theme__preview').waitFor({ state: 'visible' });
      await page.locator('.Theme__preview button[type="submit"]').click();

      await page
        .locator('.Theme__preview-overlay')
        .waitFor({ state: 'hidden', timeout: 60_000 });
    });

    await test.step('1.5 Save theme', async () => {
      await page
        .locator(
          '.Theme__header-secondary button[aria-label="Save theme"], .Theme__header-secondary button[aria-label="Lagre tema"]',
        )
        .click();
      await page.locator('form[role="dialog"]').waitFor({ state: 'visible' });

      await page
        .locator('form[role="dialog"] input[name="name"]')
        .fill(themeName);
      await page.locator('form[role="dialog"] button[type="submit"]').click();
      await page
        .locator('form[role="dialog"]')
        .waitFor({ state: 'hidden', timeout: 30_000 });
    });

    await test.step('1.6 Apply theme', async () => {
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

    await test.step('1.7 Verify theme is active', async () => {
      const activeThemeName = await page
        .locator(
          '.ic-ThemeCard--is-active-theme [data-testid="themecard-name-button-name"]',
        )
        .textContent();
      test.expect(activeThemeName?.trim()).toBe(themeName);
    });
  });
});
