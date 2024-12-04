const { resolve, dirname } = require('path');
const { existsSync, writeFileSync, mkdirSync } = require('fs');
const { test, expect } = require('@playwright/test');

export const useDesktopViewport = () => {
  test.use({
    viewport: {
      height: 1080,
      width: 1920,
    },
  });
};

export const getEnv = () => {
  const env = process.env.APP_ENV;
  expect(env).toBeDefined();

  return env;
};

export const getAppVersion = () => {
  const version = process.env.APP_VERSION;
  expect(version).toBeDefined();

  return version;
};

export const getThemeFiles = async () => {
  let jsFile =
    process.env.THEME_JS_FILE ||
    resolve(__dirname, '../../dist/theme-udirdesign.js');
  let cssFile =
    process.env.THEME_CSS_FILE ||
    resolve(__dirname, '../../dist/theme-udirdesign.css');

  if (jsFile.startsWith('http')) {
    const jsFileRes = await fetch(jsFile);
    expect(jsFileRes.ok).toBe(true);

    const jsFileBuffer = Buffer.from(await jsFileRes.arrayBuffer());
    const jsFileOutput = resolve(__dirname, '../../dist/theme-udirdesign.js');
    ensureDirectoryExists(jsFileOutput);
    writeFileSync(jsFileOutput, jsFileBuffer);

    jsFile = resolve(__dirname, '../../dist/theme-udirdesign.js');
  }

  if (cssFile.startsWith('http')) {
    const cssFileRes = await fetch(cssFile);
    expect(cssFileRes.ok).toBe(true);

    const cssFileBuffer = Buffer.from(await cssFileRes.arrayBuffer());
    const cssFileOutput = resolve(__dirname, '../../dist/theme-udirdesign.css');
    ensureDirectoryExists(cssFileOutput);
    writeFileSync(cssFileOutput, cssFileBuffer);

    cssFile = resolve(__dirname, '../../dist/theme-udirdesign.css');
  }

  expect(existsSync(jsFile)).toBe(true);
  expect(existsSync(cssFile)).toBe(true);

  return { jsFile, cssFile };
};

export const getCanvasBaseUrl = () => {
  return getEnv() === 'stage'
    ? 'https://bibsys.test.instructure.com'
    : 'https://bibsys.instructure.com';
};

export const getBasicAuth = () => {
  const username = process.env.BASIC_AUTH_USERNAME;
  const password = process.env.BASIC_AUTH_PASSWORD;

  expect(username).toBeDefined();
  expect(password).toBeDefined();

  return { username, password };
};

const ensureDirectoryExists = (filePath) => {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};
