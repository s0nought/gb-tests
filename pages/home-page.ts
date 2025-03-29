import { type Page } from "@playwright/test";

import { CustomPage } from "./custom-page";

export class HomePage extends CustomPage {
  constructor(page: Page) {
    super(page);
  }

  public async goto(): Promise<void> {
    await super.goto("/");
  }

  public async waitForURL(): Promise<void> {
    await super.waitForURL("/");
  }
}
