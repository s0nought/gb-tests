import { type Page } from "@playwright/test";

import { SubNavigator } from "./components/subnavigator";
import { CustomPage } from "./custom-page";

export class GamePage extends CustomPage {
  private readonly subNavigator: SubNavigator;

  constructor(page: Page) {
    super(page);
    this.subNavigator = new SubNavigator(this.page);
  }

  public interactSubNavigator(): SubNavigator {
    return this.subNavigator;
  }
}
