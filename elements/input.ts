import { type Locator, test } from "@playwright/test";
import { CommonElement } from "./common";

export class InputElement extends CommonElement {
  constructor(description: string, locator: Locator) {
    super(description, locator);
  }

  public async check(): Promise<void> {
    await test.step(`Check ${this.description}`, async () => {
      await this.locator.check();
    });
  }

  public async uncheck(): Promise<void> {
    await test.step(`Uncheck ${this.description}`, async () => {
      await this.locator.uncheck();
    });
  }
}
