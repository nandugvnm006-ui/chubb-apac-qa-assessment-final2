# Test Strategy

## Purpose and scope

This repository is a self-contained demonstration of login-focused end-to-end testing. The screenshots supplied show Playwright login specs and a possible credential-in-URL issue. The original application code was not supplied, so this repository includes a small safe demo app under `src/` so the tests can be executed and reviewed locally.

The six-page Chubb assessment brief describes a different and larger target: Angular + Java/Spring Boot + Kafka/WebSocket Claims Management Application. This repository does not claim to test that original application.

## Risk priorities demonstrated here

1. **Credential confidentiality:** email and password must be sent in a POST body, not URL query parameters.
2. **Authentication correctness:** valid credentials are accepted; invalid credentials and empty payloads are rejected.
3. **Session/access control:** claims screen requires a session, and logout clears the session.
4. **User feedback:** invalid credentials produce a useful error, and required fields prevent an empty submission.

## Coverage selected

- Browser-level functional tests for login success, invalid credentials, empty form validation and logout.
- API-level integration assertions for response status and input validation.
- Reusable page-object/fixtures to reduce duplicated selectors and setup.

## Deliberate exclusions

- No Angular component tests because this demo app is plain HTML/JavaScript, not Angular.
- No Java/Spring Boot unit tests, Kafka consumer/producer tests or WebSocket tests because the original code and interfaces were not supplied.
- No real identity provider, database, authorization roles, CSRF handling, rate limiting or production session management. The in-memory cookie is only a local learning demonstration.
- No load or visual regression tests; optional bonus work should follow required coverage.

## Test environment and expected commands

`npm install`, `npx playwright install chromium`, `npm run typecheck`, `npm run lint`, and `npm test`. Playwright configuration starts the local demo through its `webServer` setting. Record actual outputs after running; do not claim pass results before doing so.

## Gaps before using this for Chubb

Obtain the actual source repository and Docker Compose stack. Re-run code review against the real business rules. Then add Testing Library tests for user-visible Angular behaviour, isolated JUnit/Mockito tests for actual service/business logic, and integration tests for the actual UI/API/Kafka/WebSocket flow. Document any test exclusions and findings with evidence.
