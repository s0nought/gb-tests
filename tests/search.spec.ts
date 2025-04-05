import { test } from "@fixtures";
import * as allure from "allure-js-commons";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Search", () => {
      test.beforeEach(async () => {
        await allure.epic("UI");
        await allure.feature("Core");
        await allure.story("Search");
      });

      test(
        "Find a mod by its title",
        {
          tag: ["@cjm"],
        },
        async ({ homePage, searchPage, submissionViewPage }) => {
          // test.skip(process.env.CI === "true", "Works fine locally. Won't work on CI though.");

          await allure.severity(allure.Severity.NORMAL);

          const searchQuery = "Outro 'Go get some sleep'";

          await homePage.goto();
          await homePage.interactHeader().fillSearchQueryInput(searchQuery);
          await homePage.interactHeader().clickSearchButton();

          await searchPage.assertSearchQueryInputValue(searchQuery);
          await searchPage.getFirstLinkInResultsList().click();

          await submissionViewPage.assertSubmissionTitle(
            new RegExp(`.*${searchQuery}.*`)
          );
        }
      );

      test(
        "Find a mod by its title and properties",
        {
          tag: ["@cjm"],
        },
        async ({ searchPage, submissionViewPage }) => {
          test.skip(process.env.CI === "true", "Works fine locally. Won't work on CI though.");

          await allure.severity(allure.Severity.NORMAL);

          const searchQuery = "ZBOT NAV Editor Command Menu";
          const section = "Mods";
          const gameTitle = "Counter-Strike 1.6";
          const searchFieldIgnored = "Studio";
          const resultOrder = "Relevance";

          await searchPage.goto();
          await searchPage.fillSearchQueryInput(searchQuery);
          await searchPage.selectSection(section);
          await searchPage.selectGame(gameTitle);
          await searchPage.clickAdvancedOptionsButton();
          await searchPage.getSearchFieldСheckbox(searchFieldIgnored).uncheck();
          await searchPage.getResultOrderRadioButton(resultOrder).check();
          await searchPage.clickSubmitButton();
          await searchPage.getFirstLinkInResultsList().click();

          await submissionViewPage.assertSubmissionTitle(
            new RegExp(`.*${searchQuery}.*`)
          );
        }
      );
    });
  });
});
