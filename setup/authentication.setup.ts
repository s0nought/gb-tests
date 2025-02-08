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
