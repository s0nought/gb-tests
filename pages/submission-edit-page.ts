import { type Page, test } from "@playwright/test";
import { type SectionSlug } from "@types";

import { SubmissionForm } from "./components/submission-form";
import { SubNavigator } from "./components/subnavigator";
import { CustomPage } from "./custom-page";

export class SubmissionEditPage extends CustomPage {
  public readonly subNavigator: SubNavigator;
  public readonly editForm: SubmissionForm;

  constructor(public readonly page: Page) {
    super(page);
    this.subNavigator = new SubNavigator(this.page);
    this.editForm = new SubmissionForm(this.page);
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
}
