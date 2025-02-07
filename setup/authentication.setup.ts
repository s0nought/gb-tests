import { test } from "@fixtures";
import * as allure from "allure-js-commons";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Authentication", () => {
      test(
        "Log in with username and password",
        { tag: ["@cjm"] },
        async ({
          homePage,
          loginPage,
          gbUserLogin,
          gbUserPassword,
          gbAuthStateFile,
        }) => {
          await allure.epic("UI");
          await allure.feature("Core");
          await allure.story("Authentication");
          await allure.severity(allure.Severity.CRITICAL);
          await allure.parameter("User login", gbUserLogin);

          await test.step("Home page", async () => {
            await homePage.goto();
            await homePage.header.loginLink.click();
          });

          await test.step("Login page", async () => {
            await loginPage.usernameInput.fill(gbUserLogin);
            await loginPage.passwordInput.fill(gbUserPassword, {
              isMasked: true,
            });
            await loginPage.submitButton.click();
          });

          await test.step("Home page", async () => {
            await homePage
              .getLatestMasterLogMessage()
              .assertTextContent(new RegExp(`^Welcome, ${gbUserLogin}.*`));

            await homePage.page
              .context()
              .storageState({ path: gbAuthStateFile });
          });
        }
      );
    });
  });
});
