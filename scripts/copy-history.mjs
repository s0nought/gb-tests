import path from "node:path";
import { cpSync, existsSync } from "node:fs";

const allureHistoryDirName = "history";
const allureReportDirName = process.argv[2] ?? "allure-report";
const allureReportHistoryDir = path.resolve(
  allureReportDirName,
  allureHistoryDirName
);
const allureResultsDirName = process.argv[3] ?? "allure-results";
const allureResultsHistoryDir = path.resolve(
  allureResultsDirName,
  allureHistoryDirName
);

console.log("Running copy-history.mjs");

if (!existsSync(allureReportHistoryDir)) {
  console.log(`> Not found "${allureReportHistoryDir}"`);
  console.log("Done.");
  process.exit(0);
}

try {
  console.log(
    `+ Copying "${allureHistoryDirName}" subdirectory from "${allureReportDirName}" to "${allureResultsDirName}"`
  );
  console.log(
    `+ Source: ${allureReportHistoryDir}\n+ Destination: ${allureResultsHistoryDir}`
  );

  cpSync(allureReportHistoryDir, allureResultsHistoryDir, { recursive: true });
} catch (err) {
  console.error(err);
}

console.log("Done.");
