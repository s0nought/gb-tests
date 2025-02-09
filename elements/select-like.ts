import { type Locator, test } from "@playwright/test";

export class SelectLikeElement {
  constructor(
    private readonly description: string,
    private readonly wrapper: Locator
  ) {
    this.description = description;
    this.wrapper = wrapper;
  }

  public async selectOption(itemId: number): Promise<void> {
    await test.step(`Select option with ID ${itemId} from ${this.description}`, async () => {
      const combobox = this.wrapper.locator("css=[id*='Select']");
      await combobox.click();

      const option = this.wrapper.locator(`css=.Options [data-id='${itemId}']`);
      await option.click();
    });
  }
}
