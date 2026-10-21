import { expect, type Locator, type Page } from '@playwright/test';
import { appConfig } from './config';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;
  readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByRole('textbox', { name: 'Email' });
    this.password = page.getByLabel('Password');
    this.submit = page.getByRole('button', { name: 'Log in' });
    this.message = page.getByRole('alert');
  }

  async open(): Promise<void> {
    await this.page.goto(appConfig.loginPath);
    await expect(this.submit).toBeVisible();
  }

  async fill(email: string, password: string): Promise<void> {
    await this.email.fill(email);
    await this.password.fill(password);
  }

  async submitForm(): Promise<void> {
    await this.submit.click();
  }

  async expectCredentialsNotInUrl(email: string, password: string): Promise<void> {
    const currentUrl = new URL(this.page.url());
    expect(currentUrl.searchParams.has('email')).toBe(false);
    expect(currentUrl.searchParams.has('password')).toBe(false);
    expect(decodeURIComponent(currentUrl.href)).not.toContain(email);
    expect(decodeURIComponent(currentUrl.href)).not.toContain(password);
  }
}
