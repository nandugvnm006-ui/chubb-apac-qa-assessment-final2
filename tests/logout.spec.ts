import { test, expect } from './support/fixtures';
import { validCredentials } from './support/credentials';
import { appConfig } from './support/config';

test('logout: signed-in user can log out and is returned to the login page', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.fill(validCredentials.email, validCredentials.password);
  await loginPage.submitForm();
  await expect(page).toHaveURL(new RegExp(`${appConfig.claimsPath.replace('/', '\\/')}$`));

  await page.getByRole('button', { name: 'Log out' }).click();
  await expect(page).toHaveURL(/\/login$/);
  await expect(loginPage.submit).toBeVisible();

  await page.goto(appConfig.claimsPath);
  await expect(page).toHaveURL(/\/login$/);
});
