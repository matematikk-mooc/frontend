// Local-only: verifies every locator used by tests/utils/auth.js resolves on the
// live login page. Fills dummy values but never submits, so no login attempt is
// made against Canvas.
import { test, expect } from '@playwright/test';

import { routeToBasicAuth } from '../tests/utils/routes';

test('auth.js selectors resolve on the live login page', async ({ page }) => {
  await routeToBasicAuth(page);

  const usernameField = page.getByTestId('username-input');
  const passwordField = page.getByTestId('password-input');
  const submitButton = page.getByTestId('login-button');

  // Each locator must resolve to exactly one element
  await expect(usernameField).toHaveCount(1);
  await expect(passwordField).toHaveCount(1);
  await expect(submitButton).toHaveCount(1);

  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();

  // Fields must actually accept input (fill throws if not editable)
  await usernameField.fill('dummy-username-not-submitted');
  await passwordField.fill('dummy-password-not-submitted');

  await expect(usernameField).toHaveValue('dummy-username-not-submitted');
  await expect(passwordField).toHaveValue('dummy-password-not-submitted');

  // Sanity: the button really is the form's submit control
  await expect(submitButton).toHaveAttribute('type', 'submit');

  console.log('\n✓ All auth.js locators resolved. Submit intentionally skipped.\n');
});
