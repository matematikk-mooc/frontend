const puppeteer = require('puppeteer');

describe('login', () => {
  it('matches the snapshot', async () => {
    let browser;

    browser = await puppeteer.launch({
      headless: true,
      ignoreHTTPSErrors: true
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1440,
      height: 900
    });

    await page.goto('http://127.0.0.1');
    const login = await page.screenshot();

    expect(login).toMatchImageSnapshot();

    await browser.close();
  });
});
