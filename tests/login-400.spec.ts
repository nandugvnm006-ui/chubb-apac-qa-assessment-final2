import { test, expect } from '@playwright/test';
import { appConfig } from './support/config';

test('login-400: API rejects a request with missing credentials', async ({ request }) => {
  const response = await request.post(appConfig.loginApiPath, {
    data: { email: '', password: '' }
  });

  expect(response.status()).toBe(400);
  expect(await response.json()).toMatchObject({ message: 'Email and password are required.' });
});
