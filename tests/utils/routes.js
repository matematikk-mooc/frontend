const { getCanvasBaseUrl } = require('./shared');

export const routeToBasicAuth = async (page) => {
  const canvasBaseUrl = getCanvasBaseUrl();

  await page.goto(`${canvasBaseUrl}/login/canvas`);
  await page.getByTestId("login-button").waitFor({ state: "visible" });
};

export const routeToAuthThemeEditor = async (page) => {
  const canvasBaseUrl = getCanvasBaseUrl();

  await page.goto(`${canvasBaseUrl}/accounts/1/brand_configs`);
  await page.waitForSelector('button[data-testid="new-theme-button"]', {
    state: 'visible',
  });
};
