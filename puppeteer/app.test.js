const puppeteer = require('puppeteer');

const TIMEOUT_LENGTH = 25000;

const SELECTORS = {
  USERNAME_SELECTOR: '#pseudonym_session_unique_id',
  PASSWORD_SELECTOR: '#pseudonym_session_password',
  CHECKBOX_SELECTOR: '#pseudonym_session_remember_me',
  BUTTON_SELECTOR: '.Button--login'
};

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    ignoreHTTPSErrors: true
  });
  page = await browser.newPage();
  await page.goto('http://127.0.0.1', { waitUntil: 'networkidle0' });
  page.setViewport({ width: 1440, height: 900 });

  await page.click(SELECTORS.USERNAME_SELECTOR);
  await page.keyboard.type(EMAIL);
  await page.click(SELECTORS.PASSWORD_SELECTOR);
  await page.keyboard.type(PASSWORD);
  await page.click(SELECTORS.CHECKBOX_SELECTOR);
  await page.click(SELECTORS.BUTTON_SELECTOR);
});

describe('courses', () => {
  it('matches the snapshot', async () => {
    await timeout(TIMEOUT_LENGTH);
    const courses = await page.screenshot({ fullPage: true });

    expect(courses).toMatchImageSnapshot();
  });
});

const screens = [
  { name: 'allCourses', path: 'search/all_courses' },
  { name: 'course', path: 'courses/1' },
  { name: 'courseSyllabus', path: 'courses/1/assignments/syllabus' },
  { name: 'coursePages', path: 'courses/1/pages' },
  { name: 'courseQuizzes', path: 'courses/1/quizzes' },
  { name: 'courseModules', path: 'courses/1/modules' },
  { name: 'accounts', path: 'accounts' },
  { name: 'userAccount', path: 'accounts/1' },
  { name: 'calendar', path: 'calendar' },
  { name: 'conversations', path: 'conversations' },
  { name: 'settings', path: 'profile/settings' }
];

screens.forEach(screen => {
  describe(screen.name, () => {
    it('matches the snapshot', async () => {
      await page.goto(`http://127.0.0.1/${screen.path}`, {
        waitUntil: 'networkidle0'
      });
      await timeout(TIMEOUT_LENGTH);
      const screenshot = {
        [screen.name]: await page.screenshot({ fullPage: true })
      };

      expect(screenshot[screen.name]).toMatchImageSnapshot();
    });
  });
});

afterAll(async () => {
  await browser.close();
});
