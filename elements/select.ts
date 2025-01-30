import { type Locator, expect, test } from "@playwright/test";
import { CommonElement } from "./common";

export class SelectElement extends CommonElement {
  constructor(description: string, locator: Locator) {
    super(description, locator);
  }

  public async assertValue(value: string): Promise<void> {
    await test.step(`Assert ${this.description} has value "${value}"`, async () => {
      await expect(this.locator).toHaveValue(value);
    });
  }

  public async selectOption(label: string): Promise<void> {
    await test.step(`Select option with label "${label}" from ${this.description}`, async () => {
      await this.locator.selectOption({ label });
    });
  }
}
