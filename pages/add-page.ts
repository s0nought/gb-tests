import { type Page, test } from "@playwright/test";
import { Link } from "@elements";
import { type SectionSlug } from "@types";

import { CustomPage } from "./custom-page";

export class AddPage extends CustomPage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to URL
   * @param gameId ID of the game
   */
  public async goto(gameId: number): Promise<void> {
    const url = `/add?gameid=${gameId}`;

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
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
