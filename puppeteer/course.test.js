const puppeteer = require('puppeteer');

let courseBrowser;
let page;

beforeAll(async () => {
  courseBrowser = await puppeteer.launch({
    headless: IS_HEADLESS,
    ignoreHTTPSErrors: true
  });
  page = await courseBrowser.newPage();
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
      customDiffConfig: JEST_IMAGE_CONFIG
    });
  });
});

const screens = [
  { name: 'course', path: 'courses/1' },
  { name: 'courseAnnouncements', path: 'courses/1/announcements' },
  { name: 'courseAssignments', path: 'courses/1/assignments' },
  { name: 'courseDiscussions', path: 'courses/1/discussion_topics' },
  { name: 'courseGrades', path: 'courses/1/gradebook' },
  { name: 'coursePeople', path: 'courses/1/users' },
  { name: 'coursePages', path: 'courses/1/pages' },
  { name: 'courseFiles', path: 'courses/1/files' }
];

screens.forEach(screen => {
  describe(screen.name, () => {
    it('matches the snapshot', async () => {
      await page.goto(`${URL}/${screen.path}`, {
        waitUntil: 'networkidle0'
      });
      page.setViewport(VIEWPORT_SIZE);
      await page.waitForSelector(
        screen.selector ? `${screen.selector}` : '.ic-app-main-content',
        {
          visible: true,
          timeout: PUPPETEER_TIMEOUT
        }
      );
      await page.evaluate(() => {
        document.querySelector('#flash_message_holder').style.display = 'none';
      });

      const screenshot = {
        [screen.name]: await page.screenshot({ fullPage: true })
      };

      expect(screenshot[screen.name]).toMatchImageSnapshot({
        ...JEST_IMAGE_CONFIG
      });
    });
  });
});

afterAll(async () => {
  await courseBrowser.close();
});
