import { type Page, test } from "@playwright/test";

import { CustomPage } from "./custom-page";

export class HomePage extends CustomPage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to URL
   */
  public async goto(): Promise<void> {
    const url = "/";

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }
}
