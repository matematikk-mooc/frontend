const puppeteer = require('puppeteer');

describe('login', () => {
  it('matches the snapshot', async () => {
    let loginBrowser;

    loginBrowser = await puppeteer.launch({
      headless: IS_HEADLESS,
      ignoreHTTPSErrors: true
    });

    const page = await loginBrowser.newPage();
    await page.setViewport(VIEWPORT_SIZE);

    await page.goto(URL);

    await page.waitForSelector('.ic-app-main-content', {
      visible: true,
      timeout: PUPPETEER_TIMEOUT
    });
    await page.evaluate(() => {
      document.querySelector('#flash_message_holder').style.display = 'none';
    });

    const login = await page.screenshot();

    expect(login).toMatchImageSnapshot({
      ...JEST_IMAGE_CONFIG
    });

    await loginBrowser.close();
  });
});
