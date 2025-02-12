import { type Page } from "@playwright/test";

import { SubmissionForm } from "./components/submission-form";
import { CustomPage } from "./custom-page";

export class SubmissionAddPage extends CustomPage {
  private readonly submissionForm: SubmissionForm;

  constructor(page: Page) {
    super(page);
    this.submissionForm = new SubmissionForm(this.page);
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
