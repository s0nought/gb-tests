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
          await test.step("Home page", async () => {
            await homePage.goto();
            await homePage.interactHeader().clickLoginLink();
          });

          await test.step("Login page", async () => {
            await loginPage.fillUsernameInput(gbUserLogin);
            await loginPage.fillPasswordInput(gbUserPassword);
            await loginPage.clickSubmitButton();
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
