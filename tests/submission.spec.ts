import { test } from "@fixtures";

test.describe("UI", () => {
  test.describe("Core", () => {
    test.describe("Submission", () => {
      test(
        "Download a file attached to the submission",
        {
          tag: ["@cjm"],
          annotation: [
            {
              type: "allure",
              description: "UI;Core;Submission;critical",
            },
          ],
        },
        async ({ submissionViewPage }) => {
          const sectionSlug = "mods";
          const submissionId = 567136;
          const filenameExpected = "yet-another-test-mod.json";

          test.slow(); // download times may vary

          await test.step("Submission view page", async () => {
            await submissionViewPage.goto(sectionSlug, submissionId);
            await submissionViewPage.assertDownloadFilename(filenameExpected);
          });
        }
      );

      test(
        "Edit submission's title",
        {
          tag: ["@cjm"],
          annotation: [
            {
              type: "allure",
              description: "UI;Core;Submission;normal",
            },
          ],
        },
        async ({ submissionViewPage, submissionEditPage }) => {
          const sectionSlug = "mods";
          const submissionId = 567136;
          const title = `Test Mod ${Date.now()}`;

          await test.step("Submission view page", async () => {
            await submissionViewPage.goto(sectionSlug, submissionId);
            await submissionViewPage
              .interactSubNavigator()
              .getEntry("Edit")
              .click();
          });

          await test.step("Submission edit page", async () => {
            await submissionEditPage.editForm.titleInput.fill(title);
            await submissionEditPage.editForm.submitButton.click();
          });

          await test.step("Submission view page", async () => {
            await submissionViewPage.assertSubmissionTitle(
              new RegExp(`.*${title}.*`)
            );
          });
        }
      );

      test(
        "Add a submission",
        {
          tag: ["@cjm"],
          annotation: [
            {
              type: "allure",
              description: "UI;Core;Submission;critical",
            },
          ],
        },
        async ({
          gamePage,
          addPage,
          submissionAddPage,
          submissionViewPage,
          gbUserLogin,
        }) => {
          const gameId = 5538; // 7 Days To Die
          const sectionSlug = "mods";
          const title = `Test Mod ${Date.now()}`;
          const categoryId = 1; // Other/Misc
          const bodyText = "This is a test mod created by end-to-end tests.";
          const subtitle = "A test mod (end-to-end tests)";
          const commentInstructionsText =
            "No need to comment on this submission.";

          await test.step("Game page", async () => {
            await gamePage.goto(gameId);
            await gamePage.subNavigator.getEntry("Add").click();
          });

          await test.step("Add page", async () => {
            await addPage.selectSection(sectionSlug);
          });

          await test.step("Submission add page", async () => {
            await submissionAddPage.addForm.titleInput.fill(title);
            await submissionAddPage.addForm.categorySelect.selectOption(
              categoryId
            );
            await submissionAddPage.addForm.bodyTextEditor.fill(
              "Wysiwyg",
              bodyText
            );
            await submissionAddPage.addForm.subtitleInput.fill(subtitle);
            await submissionAddPage.addForm.commentInstructionsTextEditor.fill(
              "Wysiwyg",
              commentInstructionsText
            );

            await submissionAddPage.addForm.selectCategoryTab("Ownership");
            await submissionAddPage.addForm.portSwitch.selectOption("Yes");
            await submissionAddPage.addForm.creatorSwitch.selectOption("Yes");
            await submissionAddPage.addForm.fillAuthorGroup("Key Authors", {
              username: gbUserLogin,
              role: "Author",
            });

            await submissionAddPage.addForm.selectCategoryTab("Media");

            await submissionAddPage.setFileChooserFiles(
              submissionAddPage.addForm.screenshotsFileChooserButton,
              [
                "./data/screenshots/figure-a.png",
                "./data/screenshots/figure-b.png",
              ],
              "/responders/jfu"
            );

            await submissionAddPage.setFileChooserFiles(
              submissionAddPage.addForm.filesFileChooserButton,
              ["./data/files/yet-another-test-mod.json"],
              "/responders/jfuare"
            );

            await submissionAddPage.addForm.selectCategoryTab("Settings");
            await submissionAddPage.addForm.accessSwitch.selectOption(
              "Private"
            );

            await submissionAddPage.addForm.submitButton.click();
          });

          await test.step("Submission view page", async () => {
            await submissionViewPage.assertSubmissionTitle(
              new RegExp(`.*${title}.*`)
            );
          });
        }
      );
    });
  });
});
