import { test, expect } from './support/fixtures';

test('login-validation: required fields prevent an empty form submission', async ({ page, loginPage }) => {
  await loginPage.open();
  await loginPage.submitForm();

  await expect(loginPage.email).toBeVisible();
  await expect(loginPage.password).toBeVisible();
  expect(await loginPage.email.evaluate((element) => (element as HTMLInputElement).validity.valueMissing)).toBe(true);
  expect(await loginPage.password.evaluate((element) => (element as HTMLInputElement).validity.valueMissing)).toBe(true);
  await expect(page).toHaveURL(/\/login$/);
});
