import path from "node:path";
import { rmSync, mkdirSync } from "node:fs";

const allureResultsDir = path.resolve("allure-results");
const playwrightResultsDir = path.resolve("test-results");
const playwrightStateDir = path.resolve("playwright", "state");

const dirs = [allureResultsDir, playwrightResultsDir, playwrightStateDir];

console.log("Running clean.mjs");

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
