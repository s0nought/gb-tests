import { type Page, test } from "@playwright/test";
import { type SectionSlug } from "@types";

import { SubmissionForm } from "./components/submission-form";
import { SubNavigator } from "./components/subnavigator";
import { CustomPage } from "./custom-page";

export class SubmissionEditPage extends CustomPage {
  private readonly subNavigator: SubNavigator;
  private readonly submissionForm: SubmissionForm;

  constructor(public readonly page: Page) {
    super(page);
    this.subNavigator = new SubNavigator(this.page);
    this.submissionForm = new SubmissionForm(this.page);
  }

  /**
   * Navigate to URL
   * @param sectionSlug name of the section in plural
   * @param submissionId ID of the submission
   */
  public async goto(
    sectionSlug: SectionSlug,
    submissionId: number
  ): Promise<void> {
    const url = `/${sectionSlug}/edit/${submissionId}`;

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }

  public interactSubNavigator(): SubNavigator {
    return this.subNavigator;
  }

  public interactSubmissionForm(): SubmissionForm {
    return this.submissionForm;
  }
}
