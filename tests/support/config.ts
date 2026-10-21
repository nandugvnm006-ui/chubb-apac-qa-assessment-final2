export const appConfig = {
  loginPath: process.env.LOGIN_PATH || '/login',
  claimsPath: process.env.CLAIMS_PATH || '/claims',
  loginApiPath: process.env.LOGIN_API_PATH || '/api/auth/login',
  logoutApiPath: process.env.LOGOUT_API_PATH || '/api/auth/logout'
} as const;
