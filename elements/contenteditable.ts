import { type Locator, expect, test } from "@playwright/test";
import { CommonElement } from "./common";

export class ContenteditableElement extends CommonElement {
  constructor(description: string, locator: Locator) {
    super(description, locator);
  }

  public async assertValue(value: string): Promise<void> {
    await test.step(`Assert ${this.description} has value ${JSON.stringify(
      value
    )}`, async () => {
      await expect(this.locator).toHaveValue(value);
    });
  }

  public async clear(): Promise<void> {
    await test.step(`Clear ${this.description}`, async () => {
      await this.locator.clear();
    });
  }

  public async fill(
    value: string,
    options?: { isMasked: boolean }
  ): Promise<void> {
    await test.step(`Fill ${this.description} with value ${
      options?.isMasked ? '"***"' : JSON.stringify(value)
    }`, async () => {
      await this.locator.fill(value);
    });
  }
}
