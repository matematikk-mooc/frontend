global.EMAIL = 'udir-team@netguru.co';
global.PASSWORD = '0Senhanova9';

global.IS_HEADLESS = true;
global.URL = 'http://udir.staging.devguru.co';

global.VIEWPORT_SIZE = {
  width: 1440,
  height: 900
};

global.SELECTORS = {
  USERNAME_SELECTOR: '#pseudonym_session_unique_id',
  PASSWORD_SELECTOR: '#pseudonym_session_password',
  CHECKBOX_SELECTOR: '#pseudonym_session_remember_me',
  BUTTON_SELECTOR: '.Button--login'
};

global.JEST_IMAGE_CONFIG = {
  failureThreshold: '0.05',
  failureThresholdType: 'percent'
};

global.PUPPETEER_TIMEOUT = 100000;
