import { type Page } from "@playwright/test";
import { CommonElement } from "@elements";
import { type SubNavigatorEntry } from "@types";

export class SubNavigator {
  constructor(private readonly page: Page) {
    this.page = page;
  }

  /**
   * @param label name of the entry
   * @returns object that represents an HTML element
   */
  public getEntry(label: SubNavigatorEntry): CommonElement {
    return new CommonElement(
      `entry "${label}" in subNavigator`,
      this.page.locator("#SubNavigator").getByText(label, { exact: true })
    );
  }
}
