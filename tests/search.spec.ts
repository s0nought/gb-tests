import { test, expect } from "@fixtures";
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
          tag: ["@cjm", "@debug"],
        },
        async ({ page, homePage, searchPage, submissionViewPage }) => {
          const cookies = await page.context().cookies("https://gamebanana.com");

          console.log('"Find a mod by its title" cookies:');

          cookies.filter((o) => {
            const name = o["name"];
            const value = Array.from(o["value"]);

            if (name === "sess") {
              console.log(`sess value: ${value.at(0)}...${value.at(-1)} (length: ${value.length})`)
            }

            if (name === "rmc") {
              console.log(`rmc value: ${value.at(0)}...${value.at(-1)} (length: ${value.length})`)
            }
          });

          await allure.severity(allure.Severity.NORMAL);

          const searchQuery = "Outro 'Go get some sleep'";

          await homePage.goto();
          await expect(page.locator("css=#PersonalNavModule")).toBeVisible();
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
          tag: ["@cjm", "@debug"],
        },
        async ({ page, searchPage, submissionViewPage }) => {
          const cookies = await page.context().cookies("https://gamebanana.com");

          console.log('"Find a mod by its title and properties" cookies:');

          cookies.filter((o) => {
            const name = o["name"];
            const value = Array.from(o["value"]);

            if (name === "sess") {
              console.log(`sess value: ${value.at(0)}...${value.at(-1)} (length: ${value.length})`)
            }

            if (name === "rmc") {
              console.log(`rmc value: ${value.at(0)}...${value.at(-1)} (length: ${value.length})`)
            }
          });

          await allure.severity(allure.Severity.NORMAL);

          const searchQuery = "ZBOT NAV Editor Command Menu";
          const section = "Mods";
          const gameTitle = "Counter-Strike 1.6";
          const searchFieldIgnored = "Studio";
          const resultOrder = "Relevance";

          await searchPage.goto();
          await expect(page.locator("css=#PersonalNavModule")).toBeVisible();
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
