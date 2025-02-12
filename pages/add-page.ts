import { type Page } from "@playwright/test";
import { Link } from "@elements";
import { type SectionSlug } from "@types";

import { CustomPage } from "./custom-page";

export class AddPage extends CustomPage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Select section to upload submission for
   *
   * N.B.: `jams` and `members` will throw
   * @param sectionSlug name of the section in plural
   */
  public async selectSection(sectionSlug: SectionSlug): Promise<void> {
    const link = new Link(
      `"${sectionSlug}" section link`,
      this.page.locator(
        `css=#SelectSectionStep li a[href*="${sectionSlug}/add"]`
      )
    );

    await link.click();
  }
}
