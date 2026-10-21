import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:3001';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }]
  ],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ...devices['Desktop Chrome']
  },
  webServer: {
    command: 'npm run start:test-app',
    url: `${baseURL}/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 15_000
  }
});
