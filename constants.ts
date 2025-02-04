import * as path from "node:path";

const allureResultsDirName = "allure-results";
const allureReportDirName = "allure-report";
const allureHistoryDirName = "history";
const allureResultsDir = path.resolve(allureResultsDirName);
const allureResultsHistoryDir = path.resolve(
  allureResultsDirName,
  allureHistoryDirName
);
const allureReportDir = path.resolve(allureReportDirName);
const allureReportHistoryDir = path.resolve(
  allureReportDirName,
  allureHistoryDirName
);
const playwrightResultsDir = path.resolve("test-results");
const playwrightStateDir = path.resolve("playwright", "state");
const testsSetupDir = path.resolve("setup");
const testsDir = path.resolve("tests");

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
