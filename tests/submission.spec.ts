import { test } from "@fixtures";
import * as allure from "allure-js-commons";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Submission", () => {
      test.beforeEach(async () => {
        await allure.epic("UI");
        await allure.feature("Core");
        await allure.story("Submission");
      });

      test(
        "Download a file attached to the submission",
        {
          tag: ["@cjm"],
        },
        async ({ submissionViewPage }) => {
          await allure.severity(allure.Severity.CRITICAL);

          const url = "/mods/567136";
          const filenameExpected = "yet-another-test-mod.json";

          await submissionViewPage.goto(url);
          await submissionViewPage.assertDownloadFilename(filenameExpected);
        }
      );

      test(
        "Edit submission's title",
        {
          tag: ["@cjm"],
        },
        async ({ submissionViewPage, submissionEditPage }) => {
          await allure.severity(allure.Severity.NORMAL);

          const url = "/mods/567136";
          const title = `Test Mod ${Date.now()}`;

          await submissionViewPage.goto(url);
          await submissionViewPage
            .interactSubNavigator()
            .getEntry("Edit")
            .click();

          await submissionEditPage
            .interactSubmissionForm()
            .fillTitleInput(title);
          await submissionEditPage.interactSubmissionForm().clickSubmitButton();

          await submissionViewPage.assertSubmissionTitle(
            new RegExp(`.*${title}.*`)
          );
        }
      );

      test(
        "Add a submission",
        {
          tag: ["@cjm"],
        },
        async ({
          gamePage,
          addPage,
          submissionAddPage,
          submissionViewPage,
          gbUserLogin,
        }) => {
          await allure.severity(allure.Severity.CRITICAL);

          const url = "/games/5538"; // 7 Days To Die
          const sectionSlug = "mods";
          const title = `Test Mod ${Date.now()}`;
          const categoryId = 1; // Other/Misc
          const bodyText = "This is a test mod created by end-to-end tests.";
          const subtitle = "A test mod (end-to-end tests)";
          const commentInstructionsText =
            "No need to comment on this submission.";
          const screenshots = [
            "./data/screenshots/figure-a.png",
            "./data/screenshots/figure-b.png",
          ];
          const files = ["./data/files/yet-another-test-mod.json"];

          await gamePage.goto(url);
          await gamePage.interactSubNavigator().getEntry("Add").click();

          await addPage.selectSection(sectionSlug);

          await submissionAddPage
            .interactSubmissionForm()
            .fillTitleInput(title);
          await submissionAddPage
            .interactSubmissionForm()
            .selectCategory(categoryId);
          await submissionAddPage
            .interactSubmissionForm()
            .interactBodyTextEditor()
            .fill(bodyText);
          await submissionAddPage
            .interactSubmissionForm()
            .fillSubtitleInput(subtitle);
          await submissionAddPage
            .interactSubmissionForm()
            .interactCommentInstructionsTextEditor()
            .fill(commentInstructionsText);

          await submissionAddPage
            .interactSubmissionForm()
            .selectCategoryTab("Ownership");
          await submissionAddPage
            .interactSubmissionForm()
            .selectPortSwitch("Yes");
          await submissionAddPage
            .interactSubmissionForm()
            .selectCreatorSwitch("Yes");
          await submissionAddPage
            .interactSubmissionForm()
            .fillAuthorGroup("Key Authors", {
              username: gbUserLogin,
              role: "Author",
            });

          await submissionAddPage
            .interactSubmissionForm()
            .selectCategoryTab("Media");

          await submissionAddPage.uploadScreenshots(screenshots);
          await submissionAddPage.uploadFiles(files);

          await submissionAddPage
            .interactSubmissionForm()
            .selectCategoryTab("Settings");
          await submissionAddPage
            .interactSubmissionForm()
            .selectAccessSwitch("Private");

          await submissionAddPage.interactSubmissionForm().clickSubmitButton();

          await submissionViewPage.assertSubmissionTitle(
            new RegExp(`.*${title}.*`)
          );
        }
      );
    });
  });
});
