import "dotenv/config";
import { defineConfig, devices } from "@playwright/test";
import { type IAuthState, type IUserCredentials } from "@fixtures";

const AUTH_STATE_FILE: string = "./playwright/state/user.json";
const BASE_URL: string = "https://gamebanana.com";
const ACTION_TIMEOUT_MS: number = 10_000;
const EXPECT_TIMEOUT_MS: number = 10_000;
const TEST_TIMEOUT_MS: number = 30_000;
const { GB_USER_LOGIN, GB_USER_PASSWORD } = process.env;

export default defineConfig<IAuthState & IUserCredentials>({
  expect: {
    timeout: EXPECT_TIMEOUT_MS,
  },
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  outputDir: "./test-results",
  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: "chromium",
      grep: /@cjm/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: AUTH_STATE_FILE,
      },
      dependencies: ["setup"],
    },
  ],
  reporter: [
    ["list"],
    [
      "allure-playwright",
      {
        resultsDir: "./allure-results",
        detail: false,
        environmentInfo: {
          base_url: BASE_URL,
          os_platform: process.platform,
          node_version: process.version,
          action_timeout_ms: String(ACTION_TIMEOUT_MS),
          expect_timeout_ms: String(EXPECT_TIMEOUT_MS),
          test_timeout_ms: String(TEST_TIMEOUT_MS),
        },
      },
    ],
  ],
  retries: process.env.CI ? 2 : 0,
  testDir: "./tests",
  timeout: TEST_TIMEOUT_MS,
  use: {
    gbAuthStateFile: AUTH_STATE_FILE,
    acceptDownloads: true,
    actionTimeout: ACTION_TIMEOUT_MS,
    baseURL: BASE_URL,
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
