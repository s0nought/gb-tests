import { type Page, test } from "@playwright/test";

import { SubNavigator } from "./components/subnavigator";
import { CustomPage } from "./custom-page";

export class GamePage extends CustomPage {
  private readonly subNavigator: SubNavigator;

  constructor(public readonly page: Page) {
    super(page);
    this.subNavigator = new SubNavigator(this.page);
  }

  /**
   * Navigate to URL
   * @param gameId ID of the game
   */
  public async goto(gameId: number): Promise<void> {
    const url = `/games/${gameId}`;

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }

  public interactSubNavigator(): SubNavigator {
    return this.subNavigator;
  }
}
