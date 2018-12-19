const puppeteer = require('puppeteer');

let coursesBrowser;
let page;

beforeAll(async () => {
  coursesBrowser = await puppeteer.launch({
    headless: IS_HEADLESS,
    ignoreHTTPSErrors: true
  });
  page = await coursesBrowser.newPage();
  await page.goto(URL, { waitUntil: 'networkidle0' });
  page.setViewport(VIEWPORT_SIZE);

  await page.click(SELECTORS.USERNAME_SELECTOR);
  await page.keyboard.type(EMAIL);
  await page.click(SELECTORS.PASSWORD_SELECTOR);
  await page.keyboard.type(PASSWORD);
  await page.click(SELECTORS.CHECKBOX_SELECTOR);
  await page.click(SELECTORS.BUTTON_SELECTOR);
});

describe('courses', () => {
  it('courses screen matches the snapshot', async () => {
    await page.waitForSelector('.mmooc-course-list-item', {
      visible: true
    });
    await page.evaluate(() => {
      document.querySelector('#flash_message_holder').style.display = 'none';
    });

    const courses = await page.screenshot({ fullPage: true });

    expect(courses).toMatchImageSnapshot({
      ...JEST_IMAGE_CONFIG
    });
  });

  it('all courses screen matches the snapshot', async () => {
    await page.goto(`${URL}/search/all_courses`, {
      waitUntil: 'networkidle0'
    });
    await page.waitForSelector('.mmooc-accordion-header', {
      visible: true,
      timeout: PUPPETEER_TIMEOUT
    });
    await page.evaluate(() => {
      document.querySelector('#flash_message_holder').style.display = 'none';
    });

    const allCourses = await page.screenshot({ fullPage: true });

    expect(allCourses).toMatchImageSnapshot({
      ...JEST_IMAGE_CONFIG
    });
  });
});

afterAll(async () => {
  await coursesBrowser.close();
});
