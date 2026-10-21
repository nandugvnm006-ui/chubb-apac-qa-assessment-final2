import { test as base, expect } from '@playwright/test';
import { LoginPage } from './login-page';

type AssessmentFixtures = {
  loginPage: LoginPage;
};

export const test = base.extend<AssessmentFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

export { expect };
