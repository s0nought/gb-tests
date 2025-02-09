import { type Locator, expect, test } from "@playwright/test";

export class CommonElement {
  constructor(
    protected readonly description: string,
    protected readonly locator: Locator
  ) {
    this.description = description;
    this.locator = locator;
  }

  public async assertAttribute(name: string, value: string): Promise<void> {
    await test.step(`Assert ${
      this.description
    } attribute "${name}" value is ${JSON.stringify(value)}`, async () => {
      await expect(this.locator).toHaveAttribute(name, value);
    });
  }

  public async assertTextContent(
    text: string | RegExp | string[] | RegExp[]
  ): Promise<void> {
    // RegExp is serialized to "{}" with JSON.stringify()
    await test.step(`Assert ${this.description} text content is ${String(
      text
    )}`, async () => {
      await expect(this.locator).toHaveText(text);
    });
  }

  public async click(): Promise<void> {
    await test.step(`Click ${this.description}`, async () => {
      await this.locator.click();
    });
  }

  public async hover(): Promise<void> {
    await test.step(`Hover ${this.description}`, async () => {
      await this.locator.hover();
    });
  }
}
