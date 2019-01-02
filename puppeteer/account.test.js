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

describe('account', () => {
  it('account home screen matches the snapshot', async () => {
    await page.waitForSelector('.ic-app-main-content', {
      visible: true
    });
    await page.goto(`${URL}/accounts/1`, {
      waitUntil: 'networkidle0'
    });
    page.setViewport(VIEWPORT_SIZE);
    await page.evaluate(() => {
      document.querySelector('#flash_message_holder').style.display = 'none';
    });

    const account = await page.screenshot({ fullPage: true });

    expect(account).toMatchImageSnapshot({
      ...JEST_IMAGE_CONFIG
    });
  });
});

const screens = [
  { name: 'accoutUsers', path: 'accounts/1/users' },
  { name: 'accountStatistics', path: 'accounts/1/statistics' },
  { name: 'accountPermissions', path: 'accounts/1/permissions' },
  { name: 'accountOutcomes', path: 'accounts/1/outcomes' },
  { name: 'accountRubrics', path: 'accounts/1/rubrics' },
  { name: 'accountsGrading', path: 'accounts/1/grading_standards' },
  { name: 'accountQuestionBank', path: 'accounts/1/grading_standards' },
  { name: 'accountSubAccounts', path: 'accounts/1/sub_accounts' },
  { name: 'accountTerms', path: 'accounts/1/terms' }
];

screens.forEach(screen => {
  describe(screen.name, () => {
    it('matches the snapshot', async () => {
      await page.goto(`${URL}/${screen.path}`, {
        waitUntil: 'networkidle0'
      });
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
