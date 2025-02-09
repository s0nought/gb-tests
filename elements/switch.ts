import { type Locator, test } from "@playwright/test";
import { type SwitchYesNoOption, type SwitchAccessOption } from "@types";

interface ISwitchOptions {
  [key: string]: string;
}

const switchOptions: ISwitchOptions = {
  Yes: "true",
  No: "false",
  Public: "0",
  Private: "2",
} as const;

export class SwitchElement {
  constructor(
    private readonly description: string,
    private readonly wrapper: Locator
  ) {
    this.description = description;
    this.wrapper = wrapper;
  }

  public async selectOption(
    answer: SwitchYesNoOption | SwitchAccessOption
  ): Promise<void> {
    await test.step(`Select option ${JSON.stringify(answer)} in ${
      this.description
    }`, async () => {
      const option = this.wrapper.locator(
        `li[data-value='${switchOptions[answer]}']`
      );

      await option.click();
    });
  }
}
