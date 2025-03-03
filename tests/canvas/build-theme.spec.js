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
    const { jsFile, cssFile } = await getThemeFiles();

    await test.step('1.1 Login to Canvas', async () => {
      await routeToBasicAuth(page);
      await loginWithBasicAuth(page, getBasicAuth());
    });

    await test.step('1.2 Route to theme editor', async () => {
      await routeToAuthThemeEditor(page);

      const isVisable = await page
        .locator('.ic-ThemeCard-container__Main')
        .locator(
          '.ic-ThemeCard-main__name button:has-text("' + themeName + '")',
        )
        .first()
        .isVisible();
      if (isVisable)
        test.skip(true, 'Theme already exists, skip uploading theme');

      await page.locator('button[data-testid="new-theme-button"]').click();
      await page.waitForSelector('ul[role="menu"]', { state: 'visible' });
      await page
        .locator('span[role="menuitemradio"]:has-text("Standardmal")')
        .click();

      await page.waitForURL('**/accounts/1/theme_editor');
    });

    await test.step('1.3 Upload JS and CSS files', async () => {
      await page.locator('div[role="tab"]:has-text("Last opp")').click();
      await page
        .locator('.Theme__editor-upload-overrides')
        .first()
        .waitFor({ state: 'visible' });

      const themeParentContainer =
        '.Theme__editor-upload-overrides:has-text("Filen(e) blir inkludert på alle sidene i Canvas PC-app")';
      const cssFileInput = page
        .locator(themeParentContainer)
        .locator('div.ThemeEditorFileUpload__label:has-text("CSS-fil")')
        .locator('..')
        .locator('label input[type="file"][accept=".css"]');
      const jsFileInput = page
        .locator(themeParentContainer)
        .locator('div.ThemeEditorFileUpload__label:has-text("JavaScript-fil")')
        .locator('..')
        .locator('label input[type="file"][accept=".js"]');

      await cssFileInput.setInputFiles(cssFile);
      await jsFileInput.setInputFiles(jsFile);
    });

    await test.step('1.4 Preview and save theme', async () => {
      await page.locator('.Theme__preview').waitFor({ state: 'visible' });
      await page.locator('.Theme__preview button[type="submit"]').click();

      await page
        .locator(
          'span[role="dialog"] h2:has-text("Genererer forhåndsvisning…")',
        )
        .waitFor({ state: 'hidden', timeout: 30 * 1000 });
    });

    await test.step('1.5 Save theme', async () => {
      await page
        .locator('.Theme__header-secondary button:has-text("Lagre tema")')
        .click();
      await page
        .locator('form[aria-label="Lagre temadialog"]')
        .waitFor({ state: 'visible' });

      await page
        .locator('form[aria-label="Lagre temadialog"] input[name="name"]')
        .fill(themeName);
      await page
        .locator(
          'form[aria-label="Lagre temadialog"] button:has-text("Lagre tema")',
        )
        .click();
      await page
        .locator('form[aria-label="Lagre temadialog"]')
        .waitFor({ state: 'hidden' });
    });

    await test.step('1.6 Close theme editor', async () => {
      await page.locator('.Theme__header button:has-text("Avslutt")').click();
      await page.waitForURL('**/accounts/1/brand_configs');
    });
  });
});
