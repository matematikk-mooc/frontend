const { getCanvasBaseUrl } = require('./shared');

export const routeToBasicAuth = async (page) => {
  const canvasBaseUrl = getCanvasBaseUrl();

  await page.goto(`${canvasBaseUrl}/login/canvas?normalLogin=1`);
  await page.waitForSelector('form#login_form', { state: 'visible' });
};

export const routeToAuthThemeEditor = async (page) => {
  const canvasBaseUrl = getCanvasBaseUrl();

  await page.goto(`${canvasBaseUrl}/accounts/1/brand_configs`);
  await page.waitForSelector('h1:has-text("Tema")', { state: 'visible' });
};
