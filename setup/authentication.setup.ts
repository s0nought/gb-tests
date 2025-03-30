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
          page,
          homePage,
          loginPage,
          gbUserLogin,
          gbUserPassword,
        }) => {
          await allure.severity(allure.Severity.CRITICAL);

          await homePage.goto();
          await homePage.interactHeader().clickLoginLink();

          await loginPage.fillUsernameInput(gbUserLogin);
          await loginPage.fillPasswordInput(gbUserPassword);
          await loginPage.clickSubmitButton();

          await homePage.assertWelcomeMessage(gbUserLogin);

          const cookiesRaw = await page.context().cookies();
          console.log(`Number of raw cookies: ${cookiesRaw.length}`);

          const cookiesFiltered = cookiesRaw.filter((o) => (o.domain === ".gamebanana.com") && (o.name === "sess" || o.name === "rmc"));
          console.log(`Number of filtered cookies: ${cookiesFiltered.length}`);

          homePage.writeAuthStateFile(cookiesFiltered);
        }
      );
    });
  });
});
