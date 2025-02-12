import { test } from "@fixtures";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Authentication", () => {
      test(
        "Log in with username and password",
        {
          tag: ["@cjm"],
          annotation: [
            {
              type: "allure",
              description: "UI;Core;Authentication;critical",
            },
          ],
        },
        async ({
          homePage,
          loginPage,
          gbUserLogin,
          gbUserPassword,
          gbAuthStateFile,
        }) => {
          await homePage.goto();
          await homePage.interactHeader().clickLoginLink();

          await loginPage.fillUsernameInput(gbUserLogin);
          await loginPage.fillPasswordInput(gbUserPassword);
          await loginPage.clickSubmitButton();

          await homePage.assertWelcomeMessage(gbUserLogin);
          await homePage.saveStorageState(gbAuthStateFile);
        }
      );
    });
  });
});
