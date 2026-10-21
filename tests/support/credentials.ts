/** These defaults are only for the included local demo app. Set E2E_EMAIL/E2E_PASSWORD for another test app. */
export const validCredentials = {
  email: process.env.E2E_EMAIL || 'admin@example.com',
  password: process.env.E2E_PASSWORD || 'DemoPass123!'
};

export const invalidCredentials = {
  email: 'unknown.user@example.com',
  password: 'DefinitelyWrong123!'
};
