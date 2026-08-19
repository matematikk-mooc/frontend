// Local-only: dumps the real markup of the Canvas login page so the test
// selectors can be matched against what Canvas actually renders today.
import { test } from '@playwright/test';

import { getCanvasBaseUrl } from '../tests/utils/shared';

test('dump login page structure', async ({ page }) => {
  await page.goto(`${getCanvasBaseUrl()}/login/canvas`);
  await page.waitForTimeout(6000);

  const dump = await page.evaluate(() => {
    const attrs = (el) =>
      Object.fromEntries(
        [...el.attributes]
          .filter((a) =>
            [
              'id',
              'name',
              'type',
              'value',
              'class',
              'data-testid',
              'placeholder',
              'aria-label',
              'action',
              'method',
              'href',
            ].includes(a.name),
          )
          .map((a) => [a.name, a.value]),
      );

    return {
      title: document.title,
      forms: [...document.querySelectorAll('form')].map(attrs),
      inputs: [...document.querySelectorAll('input')].map(attrs),
      buttons: [...document.querySelectorAll('button')].map((el) => ({
        ...attrs(el),
        text: el.innerText.trim().slice(0, 40),
      })),
      labels: [...document.querySelectorAll('label')].map((el) =>
        el.innerText.trim().slice(0, 40),
      ),
      allTestIds: [...document.querySelectorAll('[data-testid]')].map((el) =>
        el.getAttribute('data-testid'),
      ),
      themeLoaded: typeof window.udirDesignLoaded !== 'undefined',
    };
  });

  console.log('\n===== LOGIN PAGE DOM =====');
  console.log(JSON.stringify(dump, null, 2));
  console.log('===== END =====\n');
});
