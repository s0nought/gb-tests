import { type Page, test } from "@playwright/test";
import { Heading, Link } from "@elements";
import { type SectionSlug } from "@types";

import { SubNavigator } from "./components/subnavigator";
import { CustomPage } from "./custom-page";

export class SubmissionViewPage extends CustomPage {
  public readonly fileDownloadLink: Link;
  public readonly submissionTitle: Heading;
  public readonly subNavigator: SubNavigator;

  constructor(public readonly page: Page) {
    super(page);
    this.fileDownloadLink = new Link(
      "file download link",
      this.page.getByRole("link", { name: "Download" })
    );
    this.submissionTitle = new Heading(
      "submission title",
      this.page.locator("css=#PageTitle")
    );
    this.subNavigator = new SubNavigator(this.page);
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
    const url = `/${sectionSlug}/${submissionId}`;

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }
}
