import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { type IUserCredentials } from "@fixtures";

import {
  allureResultsDir,
  playwrightResultsDir,
  testsDir,
  testsSetupDir,
  playwrightAuthStateFile,
} from "@constants";

const {
  GB_USER_LOGIN = "UserLogin",
  GB_USER_PASSWORD = "UserPassword",
  GB_BASE_URL = "https://gamebanana.com",
  GB_ACTION_TIMEOUT_MS = "10000",
  GB_EXPECT_TIMEOUT_MS = "10000",
  GB_TEST_TIMEOUT_MS = "30000",
} = process.env;

export default defineConfig<IUserCredentials>({
  expect: {
    timeout: Number(GB_EXPECT_TIMEOUT_MS),
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: playwrightResultsDir,
  projects: [
    {
      name: "setup",
      testDir: testsSetupDir,
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      grep: /@cjm/,
      testDir: testsDir,
      use: {
        ...devices["Desktop Chrome"],
        storageState: playwrightAuthStateFile,
      },
      dependencies: ["setup"],
    },
  ],
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir: allureResultsDir,
        detail: false,
        environmentInfo: {
          base_url: GB_BASE_URL,
          os_platform: process.platform,
          node_version: process.version,
          action_timeout_ms: GB_ACTION_TIMEOUT_MS,
          expect_timeout_ms: GB_EXPECT_TIMEOUT_MS,
          test_timeout_ms: GB_TEST_TIMEOUT_MS,
        },
      },
    ],
  ],
  retries: process.env.CI ? 1 : 0,
  timeout: Number(GB_TEST_TIMEOUT_MS),
  use: {
    acceptDownloads: true,
    actionTimeout: Number(GB_ACTION_TIMEOUT_MS),
    baseURL: GB_BASE_URL,
    bypassCSP: false,
    colorScheme: "no-preference",
    gbUserLogin: GB_USER_LOGIN,
    gbUserPassword: GB_USER_PASSWORD,
    ignoreHTTPSErrors: false,
    locale: "en-GB",
    offline: false,
    screenshot: "only-on-failure",
    trace: "off",
    video: "off",
    viewport: {
      height: 1080,
      width: 1920,
    },
  },
  workers: process.env.CI ? 1 : undefined,
});
