import { test } from "@fixtures";
import * as allure from "allure-js-commons";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Search", () => {
      test(
        "Simple search",
        { tag: ["@cjm"] },
        async ({ baseURL, homePage, searchPage, submissionViewPage }) => {
          await allure.epic("UI");
          await allure.feature("Core");
          await allure.story("Search");
          await allure.description(
            "**This test attempts to perform a simple search from the header.**"
          );
          await allure.severity(allure.Severity.NORMAL);
          await allure.link(String(baseURL), "Base URL");

          const searchQuery = "Outro 'Go get some sleep'";

          await allure.parameter("Search query", searchQuery);

          await test.step("Home page", async () => {
            await homePage.goto();
            await homePage.header.searchQueryInput.fill(searchQuery);
            await homePage.header.searchButton.click();
          });

          await test.step("Search page", async () => {
            await searchPage.searchQueryInput.assertValue(searchQuery);
            await searchPage.getFirstLinkInResultsList().click();
          });

          await test.step("Submission view page", async () => {
            await submissionViewPage.submissionTitle.assertTextContent(
              new RegExp(`.*${searchQuery}.*`)
            );
          });
        }
      );

      test(
        "Advanced search",
        { tag: ["@cjm"] },
        async ({ baseURL, searchPage, submissionViewPage }) => {
          await allure.epic("UI");
          await allure.feature("Core");
          await allure.story("Search");
          await allure.description(
            "**This test attempts to perform an advanced search from the search page.**"
          );
          await allure.severity(allure.Severity.NORMAL);
          await allure.link(String(baseURL), "Base URL");

          const searchQuery = "ZBOT NAV Editor Command Menu";
          const section = "Mods";
          const gameTitle = "Counter-Strike 1.6";
          const searchFieldIgnored = "Studio";
          const resultOrder = "Relevance";

          await allure.parameter("Search query", searchQuery);
          await allure.parameter("Section", section);
          await allure.parameter("Game title", gameTitle);
          await allure.parameter("Search field (ignored)", searchFieldIgnored);
          await allure.parameter("Result order", resultOrder);

          await test.step("Search page", async () => {
            await searchPage.goto();
            await searchPage.searchQueryInput.fill(searchQuery);
            await searchPage.selectSection(section);
            await searchPage.selectGame(gameTitle);
            await searchPage.advancedOptionsButton.click();
            await searchPage
              .getSearchFieldСheckbox(searchFieldIgnored)
              .uncheck();
            await searchPage.getResultOrderRadioButton(resultOrder).check();
            await searchPage.submitButton.click();
            await searchPage.getFirstLinkInResultsList().click();
          });

          await test.step("Submission view page", async () => {
            await submissionViewPage.submissionTitle.assertTextContent(
              new RegExp(`.*${searchQuery}.*`)
            );
          });
        }
      );
    });
  });
});
