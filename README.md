# Playwright Automation Framework

## Overview

This repository contains a Playwright + Cucumber (BDD) test automation framework using TypeScript.
Tests and feature files live under `src/features` and step definitions under `src/steps`.

## Prerequisites

Node.js (14+), npm

Install dependencies:

```bash
npm install
```

## Run tests

Run the full test suite and generate the JSON report:

```bash
npm run test
```

Notes:
The test script creates `reports/cucumber_report.json` and runs `src/report/generateReport.js` to produce an HTML report in `reports/html-report`.

## Project structure (important files)

- `src/features/` — Gherkin `.feature` files.
- `src/steps/` — TypeScript step definitions (`Given/When/Then`).
- `src/support/world.ts` — Custom `World` where `browser`, `context`, and `page` are stored for scenarios.
- `src/support/hooks.ts` — Cucumber hooks for setup/teardown.
- `src/report/generateReport.js` — Report generator which consumes the cucumber JSON.

## How step definitions are loaded

Step definitions are expected under `src/steps/**/*.ts` (see `.vscode/settings.json` and `package.json` test script).

If you see an "Undefined step" (for example: `I open the Amazon home page`), ensure:

- The step text in the `.feature` exactly matches a `Given/When/Then` in a step file.
- Your test runner loads TypeScript step files via `ts-node`. The test script uses:

```
--require-module ts-node/register/transpile-only
```

## Quick debugging options for "Undefined step"

1. Confirm step file exists and the step uses the exact Gherkin text.

2. Ensure the runner is requiring the step files. The `package.json` test script includes:

```bash
cucumber-js --require-module ts-node/register/transpile-only --require src/support/world.ts --require src/support/hooks.ts --require src/steps/**/*.ts features/**/*.feature
```

3. If ts-node configuration is difficult to fix quickly, add a temporary JS stub under `features/step_definitions/` that Cucumber will load directly (example):

```javascript
// features/step_definitions/amazonSteps.js
const { Given } = require('@cucumber/cucumber');
Given('I open the Amazon home page', async function () {
  if (!this.page) throw new Error('Page not initialized');
  await this.page.goto('https://www.amazon.com');
});
```

## Custom World (`src/support/world.ts`) notes

The `CustomWorld` exposes optional properties:

```ts
browser?: Browser;
context?: BrowserContext;
page?: Page;
```

The `?` indicates those properties may be `undefined` until created by hooks. Guard their use in steps (for example: `if (!this.page) throw new Error('Page not initialized')`).

## Report viewing

Generated HTML report is placed in `reports/html-report/index.html`. Open this file in a browser to view results.

## Extending the framework

- Add new feature files in `src/features/` and corresponding steps in `src/steps/`.
- Use `src/support/hooks.ts` to start/close browser or create a new context/page per scenario.

## Troubleshooting

- If step autocompletion or mapping in your editor doesn't work, check `.vscode/settings.json` (this repo config points `cucumberautocomplete.steps` to `src/steps/**/*.ts`).
- If `Undefined step` persists after verifying file locations and step text, run `npm run test` to see which files were loaded.
