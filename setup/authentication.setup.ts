import { test } from "@fixtures";
import * as allure from "allure-js-commons";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Authentication", () => {
      test.beforeEach(async () => {
        await allure.epic("UI");
        await allure.feature("Core");
        await allure.story("Authentication");
      });

      test(
        "Log in with username and password",
        {
          tag: ["@cjm"],
        },
        async ({
          homePage,
          loginPage,
          gbUserLogin,
          gbUserPassword,
          gbAuthStateFile,
        }) => {
          await allure.severity(allure.Severity.CRITICAL);

          await homePage.goto();
          await homePage.interactHeader().clickLoginLink();

          await loginPage.fillUsernameInput(gbUserLogin);
          await loginPage.fillPasswordInput(gbUserPassword);
          await loginPage.clickSubmitButton();

          await homePage.assertWelcomeMessage(gbUserLogin);
          await homePage.waitForURL();
          await homePage.saveStorageState(gbAuthStateFile);
        }
      );
    });
  });
});
