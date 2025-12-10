/**
 * Cucumber.js configuration
 */
module.exports = {
  default: {
    require: ["features/step_definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "json:reports/cucumber-report.json",
      "html:reports/cucumber-report.html",
    ],
    formatOptions: {
      snippetInterface: "async-await",
    },
    parallel: 1,
    strict: true,
    dryRun: false,
    failFast: false,
    timeout: 60000,
  },
  irctc: {
    require: ["features/step_definitions/**/*.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "json:reports/irctc-cucumber-report.json",
      "html:reports/irctc-cucumber-report.html",
    ],
    formatOptions: {
      snippetInterface: "async-await",
    },
    parallel: 1,
    strict: true,
    dryRun: false,
    failFast: false,
    timeout: 120000,
  },
};
