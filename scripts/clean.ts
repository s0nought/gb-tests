import { rmSync, mkdirSync } from "node:fs";

import {
  allureResultsDir,
  playwrightResultsDir,
} from "../constants"; // https://github.com/TypeStrong/ts-node/issues/138

const dirs = [allureResultsDir, playwrightResultsDir];

console.log("Running clean.ts");

dirs.forEach((dir) => {
  try {
    console.log(`- Removing ${dir}`);

    rmSync(dir, {
      force: true,
      maxRetries: 1,
      recursive: true,
      retryDelay: 1000,
    });

    console.log(`+ Creating ${dir}`);

    mkdirSync(dir, { recursive: true });
  } catch (err) {
    console.error(err);
  }
});

console.log("Done.");
