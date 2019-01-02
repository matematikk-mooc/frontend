const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: IS_HEADLESS,
    ignoreHTTPSErrors: true
  });
  page = await browser.newPage();
  page.setViewport(VIEWPORT_SIZE);
});

describe('all courses list screen for the unauthenticated user', () => {
  it('matches the snapshot', async () => {
    await page.goto(`${URL}/search/all_courses`);
    page.setViewport(VIEWPORT_SIZE);
    await page.waitForSelector('.ic-app-main-content', {
      visible: true,
      timeout: PUPPETEER_TIMEOUT
    });
    await page.evaluate(() => {
      document.querySelector('#flash_message_holder').style.display = 'none';
    });
    const allCoursesUnauthenticated = await page.screenshot();

    expect(allCoursesUnauthenticated).toMatchImageSnapshot({
      ...JEST_IMAGE_CONFIG
    });
  });

  it('accordionexpanded matches the snapshot', async () => {
    await page.click('#mmooc-accordion-header-0');

    const accordionExpanded = await page.screenshot();

    expect(accordionExpanded).toMatchImageSnapshot({
      ...JEST_IMAGE_CONFIG
    });
  });

  it('second tab matches the snapshot', async () => {
    await page.click('#mmooc-tab-head-2');

    const secondTab = await page.screenshot();

    expect(secondTab).toMatchImageSnapshot({
      ...JEST_IMAGE_CONFIG
    });
  });
});

afterAll(async () => {
  await browser.close();
});
