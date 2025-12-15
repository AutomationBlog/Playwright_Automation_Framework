import { generate } from "multiple-cucumber-html-reporter";
import path from "path";
import fs from "fs";
import os from "os";
import child from "child_process";
import { report } from "process";

const jsonReport = path.join(process.cwd(), "reports", "cucumber_report.json");
const reportDir = path.join(process.cwd(), "reports", "html-report");

// try to read the logger file and include in report custom data
let logContents = null;
try {
  const logPath = path.join(process.cwd(), "reports", "logs", "test.log");
  if (fs.existsSync(logPath)) {
    logContents = fs.readFileSync(logPath, { encoding: "utf8" });
  }
} catch (err) {
  // ignore read errors
}

// collect environment and git metadata
let gitBranch = "unknown";
let gitCommit = "unknown";
try {
  gitBranch = String(child.execSync("git rev-parse --abbrev-ref HEAD")).trim();
  gitCommit = String(child.execSync("git rev-parse --short HEAD")).trim();
} catch (e) {
  // ignore if git not available
}

const nodeVersion = process.version;
const platform = `${os.type()} ${os.release()} (${os.arch()})`;
const deviceType = os.hostname();
const user =
  (os.userInfo && os.userInfo().username) ||
  process.env.USER ||
  process.env.USERNAME ||
  "unknown";

const customData = {
  title: "Playwright Cucumber Report",
  data: [
    { label: "Project", value: "Playwright-Cucumber-TS" },
    { label: "Execution Start", value: new Date().toISOString() },
    { label: "User", value: user },
    { label: "Platform", value: platform },
    { label: "Node", value: nodeVersion },
    { label: "Git Branch", value: gitBranch },
    { label: "Git Commit", value: gitCommit },
  ],
};

// if (logContents) {
//   // include a reasonable tail of the log to keep report compact
//   const maxLen = 50000;
//   const value =
//     logContents.length > maxLen ? logContents.slice(-maxLen) : logContents;
//   customData.data.push({ label: "Execution Log (tail)", value });
// }

generate({
  jsonDir: path.dirname(jsonReport),
  jsonFiles: [path.basename(jsonReport)],
  reportPath: reportDir,
  displayDuration: true,
  customData,
  openReportInBrowser: true,
  metadata: {
    browser: {
      name: "Chrome",
      version: "Latest",
    },
    device: deviceType,
    platform: {
      name: os.type(),
      version: os.release(),
    },
  },
  reportName: "Playwright Cucumber Test Report",
  pageTitle: "Playwright Cucumber Test Report",
  reportPageTitle: "Playwright Cucumber Test Report",
});
