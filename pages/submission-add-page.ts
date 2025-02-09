import { type Page, test } from "@playwright/test";
import { type SectionSlug } from "@types";

import { SubmissionForm } from "./components/submission-form";
import { CustomPage } from "./custom-page";

export class SubmissionAddPage extends CustomPage {
  private readonly submissionForm: SubmissionForm;

  constructor(page: Page) {
    super(page);
    this.submissionForm = new SubmissionForm(this.page);
  }

  /**
   * Navigate to URL
   * @param sectionSlug name of the section in plural
   * @param gameId ID of the game
   */
  public async goto(sectionSlug: SectionSlug, gameId: number): Promise<void> {
    const url = `/${sectionSlug}/add?gameid=${gameId}`;

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }

  public interactSubmissionForm(): SubmissionForm {
    return this.submissionForm;
  }

  public async uploadScreenshots(filePaths: string[]): Promise<void> {
    await super.setFileChooserFiles(
      this.interactSubmissionForm().getScreenshotsFileChooserButton(),
      filePaths,
      "/responders/jfu"
    );
  }

  public async uploadFiles(filePaths: string[]): Promise<void> {
    await super.setFileChooserFiles(
      this.interactSubmissionForm().getFilesFileChooserButton(),
      filePaths,
      "/responders/jfuare"
    );
  }
}
