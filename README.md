# Playwright Automation Framework

## Overview

This repository is a Playwright + Cucumber (Gherkin) E2E framework using TypeScript.

Files have been organized at repository root for simplicity. Key folders:

- `features/` — Gherkin `.feature` files (examples under `features/`).
- `features/step_definitions/` — TypeScript step definitions (`Given/When/Then`).
- `pages/` — Page object classes (HomePage, ProductPage, etc.).
- `support/` — Cucumber `world` and `hooks` for setup/teardown.
- `report/` — Report generation script (`generateReport.js`).
- `reports/` — Generated reports and artifacts (JSON, HTML, screenshots, logs).
- `utils/` — Helper utilities (logger, json/excel utils).

## Prerequisites

Node.js (14+) and npm

Install dependencies:

```bash
npm install
npm run install-playwright
```

## Run tests

Run the test suite and generate reports:

```bash
npm run test
```

Current `test` script (example) loads TypeScript step defs and runs the report generator:

```bash
cucumber-js --require-module ts-node/register/transpile-only \
  --require support/world.ts --require support/hooks.ts \
  --require features/step_definitions/**/*.ts \
  --format json:reports/cucumber_report.json features/**/*.feature && node report/generateReport.js
```

Notes:
- The test runner now cleans previous logs and screenshots at startup. See `support/hooks.ts` and `utils/logger.ts` for implementation details.
- Reports (JSON + HTML) are written to `reports/`; open `reports/html-report/index.html` to view the HTML report.

## How step definitions are loaded

Step definitions are loaded from `features/step_definitions/**/*.ts`. If Cucumber reports an "Undefined step":

- Verify the Gherkin text exactly matches a `Given`/`When`/`Then` pattern in a step file.
- Ensure the test script requires the correct step definition path (see `package.json` `test` script above).
- If `ts-node` setup is problematic, a quick JS fallback can be added under `features/step_definitions/` (e.g. `amazonSteps.js`) so Cucumber can load the step directly.

## Custom World (`support/world.ts`) notes

The `CustomWorld` exposes optional properties that are created by hooks:

```ts
browser?: Browser;
context?: BrowserContext;
page?: Page;
```

Guard access to these properties in steps (e.g., `if (!this.page) throw new Error('Page not initialized')`).

## Housekeeping behavior

- `utils/logger.ts` ensures `reports/logs` exists and removes previous `test.log` and `exceptions.log` at startup so each run begins with fresh logs.
- `support/hooks.ts` clears `reports/screenshots` at `BeforeAll` so screenshots are from the current run only.

## Extending the framework

- Add feature files to `features/` and implement steps in `features/step_definitions/`.
- Create page objects in `pages/` and reuse them in step definitions.

## Troubleshooting

- If steps are still undefined, run the `cucumber-js` command shown above locally to see which files are being loaded.
- Check relative imports in step definition files after moving files — they may need `../../` adjustments.

If you want, I can also add a short CONTRIBUTING section or CI integration next.
