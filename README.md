# Toolshop Playwright Framework

![Playwright Tests](https://github.com/km-gupta/toolshop-playwright-framework/actions/workflows/playwright.yml/badge.svg)

End-to-end test automation framework built with **Playwright** and **TypeScript**. It covers UI, API, and hybrid tests, and runs in CI on **GitHub Actions** and **Jenkins**.

## Tech Stack

| Area           | Tools                          |
| -------------- | ------------------------------ |
| Test framework | Playwright, TypeScript         |
| Reporting      | Playwright HTML report, Allure |
| Code quality   | ESLint, Prettier, `tsc`        |
| CI/CD          | GitHub Actions, Jenkins        |
| Containers     | Docker (Playwright image)      |

## Application Under Test

[Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com), a demo web shop built for test automation practice.

- UI: https://practicesoftwaretesting.com
- API: https://api.practicesoftwaretesting.com

## What It Covers

- **UI tests:** home page, sign-in page, invalid login.
- **API tests:** product list, login, user registration.
- **Hybrid tests:** log in through the API, then verify the logged-in state in the UI. This skips the slow login screen.

## Project Structure

```
.
├── .github/workflows/   GitHub Actions pipeline
├── src/
│   ├── api/             API clients (ProductsApi, UsersApi)
│   ├── config/          Environment settings
│   ├── data/            Test data builders (unique user per run)
│   ├── fixtures/        Custom Playwright fixtures
│   └── pages/           Page objects (HomePage, LoginPage)
├── tests/
│   ├── api/             API tests
│   ├── hybrid/          API + UI tests
│   └── ui/              UI tests
├── Jenkinsfile          Jenkins pipeline
├── playwright.config.ts Playwright settings
└── .env.example         Environment variable template
```

## Setup

**Requirements:** Node.js 22 or newer. Java is needed only to generate the Allure report.

```bash
git clone https://github.com/km-gupta/toolshop-playwright-framework.git
cd toolshop-playwright-framework
npm ci
npx playwright install chromium
cp .env.example .env
```

On Windows PowerShell, use `copy .env.example .env`.

## Running Tests

| Command               | What it does                       |
| --------------------- | ---------------------------------- |
| `npm test`            | Run all tests                      |
| `npm run test:smoke`  | Run tests tagged `@smoke`          |
| `npm run test:api`    | Run tests tagged `@api`            |
| `npm run test:headed` | Run all tests in a visible browser |

Tags in use: `@smoke`, `@regression`, `@ui`, `@api`, `@hybrid`.

## Code Quality

```bash
npm run lint           # ESLint, including no-floating-promises
npm run format:check   # Prettier
npx tsc --noEmit       # TypeScript type check
```

CI runs all three before the tests.

## Reports

**Playwright HTML report**

```bash
npx playwright show-report
```

**Allure report** (requires Java)

```bash
npm run allure:generate
npm run allure:open
```

## CI/CD

- **GitHub Actions** (`.github/workflows/playwright.yml`): runs on every push and pull request to `main`. Steps: install, lint, format check, type check, tests. Reports are uploaded as artifacts.
- **Jenkins** (`Jenkinsfile`): runs the same stages inside the official Playwright Docker image. It needs the Docker Pipeline plugin and a Jenkins agent with Docker access.

## Design Choices

- **Page Object Model:** locators and page actions live in `src/pages`, so tests stay short and readable.
- **Custom fixtures:** page objects and API clients are injected into tests. No manual setup in test files.
- **API clients:** tests never hold raw URLs. Endpoints live in one place.
- **Fresh user per test:** the `registeredUser` fixture registers a unique user through the API. Tests do not share accounts, so they can run in parallel.
- **Tags:** run a quick smoke suite on demand and the full regression in CI.
- **Environment variables:** base URLs come from `.env`, so the same tests can target other environments.
- **Quality gate:** ESLint, Prettier, and `tsc` run before the tests, and a missing `await` fails the build.
