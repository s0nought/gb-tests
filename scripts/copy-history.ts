import { cpSync, existsSync } from "node:fs";

import {
  allureReportHistoryDir,
  allureHistoryDirName,
  allureReportDirName,
  allureResultsDirName,
  allureResultsHistoryDir,
} from "../constants"; // https://github.com/TypeStrong/ts-node/issues/138

console.log("Running copy-history.ts");

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
