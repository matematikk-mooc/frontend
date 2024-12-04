export const loginWithBasicAuth = async (page, basicAuth) => {
  const { username, password } = basicAuth;

  await page.waitForSelector('form#login_form', { state: 'visible' });
  await page.fill('#pseudonym_session_unique_id', username);
  await page.fill('#pseudonym_session_password', password);
  await page.click('input[type="submit"][value="Logg på"]');

  await page.waitForURL(/\/courses|\/search\/all_courses/);
};
