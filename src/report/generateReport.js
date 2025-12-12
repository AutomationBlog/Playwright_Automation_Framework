const { generate } = require("multiple-cucumber-html-reporter");
const path = require("path");

const jsonReport = path.join(process.cwd(), "reports", "cucumber_report.json");
const reportDir = path.join(process.cwd(), "reports", "html-report");

generate({
  jsonDir: path.dirname(jsonReport),
  jsonFiles: [path.basename(jsonReport)],
  reportPath: reportDir,
  displayDuration: true,
  customData: {
    title: "Playwright Cucumber Report",
    data: [
      { label: "Project", value: "Playwright-Cucumber-TS" },
      { label: "Execution Start", value: new Date().toISOString() },
    ],
  },
});
