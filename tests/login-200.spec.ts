import { test, expect } from './support/fixtures';
import { validCredentials } from './support/credentials';
import { appConfig } from './support/config';

test('login-200: valid credentials open the claims dashboard without exposing secrets in the URL', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.fill(validCredentials.email, validCredentials.password);

  const responsePromise = page.waitForResponse((response) =>
    response.request().method() === 'POST' && new URL(response.url()).pathname === appConfig.loginApiPath
  );
  await loginPage.submitForm();
  const response = await responsePromise;

  expect(response.status()).toBe(200);
  const requestUrl = new URL(response.url());
  expect(requestUrl.searchParams.has('email')).toBe(false);
  expect(requestUrl.searchParams.has('password')).toBe(false);
  expect(response.request().postDataJSON()).toMatchObject({
    email: validCredentials.email,
    password: validCredentials.password
  });
  await expect(page).toHaveURL(new RegExp(`${appConfig.claimsPath.replace('/', '\\/')}$`));
  await expect(page.getByRole('heading', { name: 'Claims dashboard' })).toBeVisible();
  await loginPage.expectCredentialsNotInUrl(validCredentials.email, validCredentials.password);
});
