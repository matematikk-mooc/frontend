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

const screens = [
  { name: 'accountsGrading', path: 'accounts/1/grading_standards' },
  { name: 'accountQuestionBank', path: 'accounts/1/grading_standards' },
  { name: 'accountSubAccounts', path: 'accounts/1/sub_accounts' },
  { name: 'accountTerms', path: 'accounts/1/terms' },
  {
    name: 'accountAuthentication',
    path: 'accounts/1/authentication_providers'
  },
  { name: 'accountThemes', path: 'accounts/1/brand_configs' },
  {
    name: 'accountDeveloperKeys',
    path: 'http://udir.staging.devguru.co/accounts/1/developer_keys'
  },
  { name: 'accountAdminTools', path: 'accounts/1/admin_tools' }
];

screens.forEach(screen => {
  describe(screen.name, () => {
    it('matches the snapshot', async () => {
      await page.waitForSelector('.ic-app-main-content', {
        visible: true
      });
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
