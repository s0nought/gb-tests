import { test } from "@fixtures";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Search", () => {
      test(
        "Find a mod by its title",
        {
          tag: ["@cjm"],
          annotation: [
            {
              type: "allure",
              description: "UI;Core;Search;normal",
            },
          ],
        },
        async ({ homePage, searchPage, submissionViewPage }) => {
          const searchQuery = "Outro 'Go get some sleep'";

          await test.step("Home page", async () => {
            await homePage.goto();
            await homePage.interactHeader().fillSearchQueryInput(searchQuery);
            await homePage.interactHeader().clickSearchButton();
          });

          await test.step("Search page", async () => {
            await searchPage.assertSearchQueryInputValue(searchQuery);
            await searchPage.getFirstLinkInResultsList().click();
          });

          await test.step("Submission view page", async () => {
            await submissionViewPage.assertSubmissionTitle(
              new RegExp(`.*${searchQuery}.*`)
            );
          });
        }
      );

      test(
        "Find a mod by its title and properties",
        {
          tag: ["@cjm"],
          annotation: [
            {
              type: "allure",
              description: "UI;Core;Search;normal",
            },
          ],
        },
        async ({ searchPage, submissionViewPage }) => {
          const searchQuery = "ZBOT NAV Editor Command Menu";
          const section = "Mods";
          const gameTitle = "Counter-Strike 1.6";
          const searchFieldIgnored = "Studio";
          const resultOrder = "Relevance";

          await test.step("Search page", async () => {
            await searchPage.goto();
            await searchPage.fillSearchQueryInput(searchQuery);
            await searchPage.selectSection(section);
            await searchPage.selectGame(gameTitle);
            await searchPage.clickAdvancedOptionsButton();
            await searchPage
              .getSearchFieldСheckbox(searchFieldIgnored)
              .uncheck();
            await searchPage.getResultOrderRadioButton(resultOrder).check();
            await searchPage.clickSubmitButton();
            await searchPage.getFirstLinkInResultsList().click();
          });

          await test.step("Submission view page", async () => {
            await submissionViewPage.assertSubmissionTitle(
              new RegExp(`.*${searchQuery}.*`)
            );
          });
        }
      );
    });
  });
});
