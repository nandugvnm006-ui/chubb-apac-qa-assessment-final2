# Assessment — Login QA repository with `src/`

This folder now contains both **a small source application** and its **Playwright end-to-end tests**. It follows the folder pattern from your screenshot, including `docs/AI-WORKING-JOURNAL.md`, `tests/support/`, the five login/logout specs, and a root `README.md`.

> **Important scope note:** the Chubb six-page brief describes a real Claims Management Application built with Angular, Java/Spring Boot and Kafka/WebSocket. That original application's source code was not included in the files you shared. Therefore, `src/` here is a small, self-contained **learning/demo app** that lets you run and understand the login tests. It is not Chubb's original application, and this login-only project does not by itself satisfy the brief's mandatory Angular component and Spring Boot unit/integration test requirements. Do not describe it as the original Chubb app.

## Folder structure

```text
assessment/
├── docs/
│   └── AI-WORKING-JOURNAL.md
├── src/                         # source app that the tests run against
│   ├── server.mjs                # local HTTP server and demo authentication API
│   └── public/
│       ├── login.html            # sign-in page; submits credentials in POST body
│       └── claims.html           # sample claims dashboard and logout control
├── tests/
│   ├── support/
│   │   ├── config.ts             # shared routes/endpoints
│   │   ├── credentials.ts        # demo/test credentials
│   │   ├── fixtures.ts           # reusable Playwright fixture
│   │   └── login-page.ts         # page-object helpers
│   ├── login-200.spec.ts
│   ├── login-400.spec.ts
│   ├── login-invalid.spec.ts
│   ├── login-validation.spec.ts
│   ├── logout.spec.ts
│   └── setup.ts                  # compatibility/re-export entry point
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── test-strategy.md
├── defects.md
└── CHECKLIST_BEFORE_UPLOAD.md
```

## What does `src/` mean?

`src` means source code: the application being tested. `tests/` contains scripts that check whether that application behaves correctly. In this repository, `src/server.mjs` serves the login page and API, and Playwright starts the demo automatically before running tests.

## Prerequisites

Install Node.js 20+ and npm. A real Chubb repository may also require Docker/Podman, Java, Angular and Kafka; this self-contained demo does not.

## Run the local demo

1. Extract this ZIP and open a terminal inside the `assessment` folder.
2. Install dependencies:

   ```bash
   npm install
   npx playwright install chromium
   ```

3. Optionally copy `.env.example` to `.env`. The committed defaults are fake local demo credentials only; do not place real passwords in committed files.
4. Run the end-to-end suite. Playwright starts `src/server.mjs` automatically:

   ```bash
   npm test
   ```

5. Run static checks:

   ```bash
   npm run typecheck
   npm run lint
   ```

6. Open the HTML report after a run:

   ```bash
   npm run report
   ```

For manual inspection, run `npm run start:test-app`, then open `http://127.0.0.1:3001/login`. The local demo credentials are `admin@example.com` / `DemoPass123!` unless overridden in `.env`.

## What the tests check

| Test file | Behaviour checked |
| --- | --- |
| `login-200.spec.ts` | Valid credentials return HTTP 200 and open the claims dashboard. Email/password must not appear in the browser URL. |
| `login-400.spec.ts` | Empty credentials sent to the API are rejected with HTTP 400. |
| `login-invalid.spec.ts` | Wrong credentials are rejected with HTTP 401 and a user-facing error. |
| `login-validation.spec.ts` | Browser-required email/password fields prevent an empty form submission. |
| `logout.spec.ts` | A user can log out; visiting the protected claims page afterwards returns to login. |

## Relationship to the six-page assessment brief

The brief explicitly requires: (1) risk/test strategy, (2) component tests, (3) isolated unit tests, (4) integration tests across application boundaries, (5) meaningful Git history, (6) a working suite against the provided Docker Compose stack, and (7) an AI working journal. This ZIP documents the gap honestly: it is a runnable **login demo + Playwright integration/E2E example**, not the full Angular/Spring/Kafka Chubb submission. To create a real Chubb submission, replace this demo `src/` with the supplied application source and add tests for the actual Angular components and backend code.

## Findings and security note

The screenshot shows a URL containing `email` and `password`, which is a **candidate security defect to reproduce in the real target application**. The included demo is intentionally implemented safely: it sends credentials in a JSON POST body and checks that the browser URL stays free of them. No defect in Chubb's real application is claimed as verified from these screenshots alone.

## Before you upload to GitHub

Read `CHECKLIST_BEFORE_UPLOAD.md` and `VALIDATION_STATUS.md`, run the commands above, inspect failed tests, and update `docs/AI-WORKING-JOURNAL.md` with your own decisions. Do not upload `.env`, real credentials, or test results you have not actually obtained.
