import { test, expect } from './support/fixtures';
import { invalidCredentials } from './support/credentials';
import { appConfig } from './support/config';

test('login-invalid: wrong credentials are rejected and an error is shown', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.fill(invalidCredentials.email, invalidCredentials.password);

  const responsePromise = page.waitForResponse((response) =>
    response.request().method() === 'POST' && new URL(response.url()).pathname === appConfig.loginApiPath
  );
  await loginPage.submitForm();
  const response = await responsePromise;

  expect(response.status()).toBe(401);
  await expect(loginPage.message).toHaveText('Invalid email or password.');
  await expect(page).toHaveURL(/\/login$/);
  await loginPage.expectCredentialsNotInUrl(invalidCredentials.email, invalidCredentials.password);
});
