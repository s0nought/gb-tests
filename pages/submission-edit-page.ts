import { type Page } from "@playwright/test";

import { SubmissionForm } from "./components/submission-form";
import { SubNavigator } from "./components/subnavigator";
import { CustomPage } from "./custom-page";

export class SubmissionEditPage extends CustomPage {
  private readonly subNavigator: SubNavigator;
  private readonly submissionForm: SubmissionForm;

  constructor(page: Page) {
    super(page);
    this.subNavigator = new SubNavigator(this.page);
    this.submissionForm = new SubmissionForm(this.page);
  }

  public interactSubNavigator(): SubNavigator {
    return this.subNavigator;
  }

  public interactSubmissionForm(): SubmissionForm {
    return this.submissionForm;
  }
}
