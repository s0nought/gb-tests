import * as path from "node:path";

const allureResultsDirName = "allure-results";
const allureReportDirName = "allure-report";
const allureHistoryDirName = "history";
const allureResultsDir = path.resolve(__dirname, allureResultsDirName);
const allureResultsHistoryDir = path.resolve(
  __dirname,
  allureResultsDirName,
  allureHistoryDirName,
);
const allureReportDir = path.resolve(__dirname, allureReportDirName);
const allureReportHistoryDir = path.resolve(
  __dirname,
  allureReportDirName,
  allureHistoryDirName,
);
const playwrightResultsDir = path.resolve(__dirname, "test-results");
const playwrightStateDir = path.resolve(__dirname, "playwright", "state");
const testsSetupDir = path.resolve(__dirname, "setup");
const testsDir = path.resolve(__dirname, "tests");

export {
  allureResultsDirName,
  allureReportDirName,
  allureHistoryDirName,
  allureResultsDir,
  allureResultsHistoryDir,
  allureReportDir,
  allureReportHistoryDir,
  playwrightResultsDir,
  playwrightStateDir,
  testsSetupDir,
  testsDir,
};
