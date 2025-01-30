import { type Locator, expect, test } from "@playwright/test";

export class CommonElement {
  constructor(
    public readonly description: string,
    public readonly locator: Locator
  ) {
    this.description = description;
    this.locator = locator;
  }

  public async assertAttribute(name: string, value: string): Promise<void> {
    await test.step(`Assert ${this.description} attribute "${name}" value is "${value}"`, async () => {
      await expect(this.locator).toHaveAttribute(name, value);
    });
  }

  public async assertTextContent(
    text: string | RegExp | string[] | RegExp[]
  ): Promise<void> {
    await test.step(`Assert ${this.description} text content is "${text}"`, async () => {
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
