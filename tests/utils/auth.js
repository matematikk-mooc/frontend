export const loginWithBasicAuth = async (page, basicAuth) => {
  const { username, password } = basicAuth;

  const usernameField = page.getByTestId('username-input');
  await usernameField.waitFor({ state: 'visible' });

  await usernameField.fill(username);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-button').click();

  await page.waitForURL(/\/courses|\/search\/all_courses/);
};
