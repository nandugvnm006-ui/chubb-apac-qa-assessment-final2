# Before Uploading to GitHub

- [ ] Read `README.md` and understand that `src/` is a local demo app, not original Chubb source.
- [ ] Install Node.js 20+ and npm.
- [ ] Run `npm install`.
- [ ] Run `npx playwright install chromium`.
- [ ] Run `npm run typecheck` and resolve any reported type errors.
- [ ] Run `npm run lint` and review all errors/warnings.
- [ ] Run `npm test`; inspect the actual report rather than assuming green status.
- [ ] Add your own verification entries to `docs/AI-WORKING-JOURNAL.md`.
- [ ] Verify the original assessment application, route names, locators, status codes and business rules before adapting these tests to it.
- [ ] For the Chubb assessment, add required Angular component tests and Spring Boot unit/integration tests against the actual supplied source.
- [ ] Never commit `.env`, real credentials, tokens or sensitive production data.
- [ ] Create meaningful Git commits after reviewing each group of changes.
