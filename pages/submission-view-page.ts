import { type Page, expect, test } from "@playwright/test";
import { Heading, Link } from "@elements";

import { SubNavigator } from "./components/subnavigator";
import { CustomPage } from "./custom-page";

export class SubmissionViewPage extends CustomPage {
  private readonly fileDownloadLink: Link;
  private readonly submissionTitle: Heading;
  private readonly subNavigator: SubNavigator;

  constructor(page: Page) {
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

  public async clickFileDownloadLink(): Promise<void> {
    await this.fileDownloadLink.click();
  }

  public async assertSubmissionTitle(
    text: string | RegExp | string[] | RegExp[]
  ): Promise<void> {
    await this.submissionTitle.assertTextContent(text);
  }

  public interactSubNavigator(): SubNavigator {
    return this.subNavigator;
  }

  public async assertDownloadFilename(expected: string): Promise<void> {
    const actual = await super.getSuggestedFilenameForDownload(
      this.fileDownloadLink
    );

    await test.step(`Assert downloaded file name is ${JSON.stringify(
      expected
    )}`, () => {
      expect(actual).toEqual(expected);
    });
  }
}
