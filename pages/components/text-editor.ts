import { type Locator, type Page } from "@playwright/test";
import { Button, ContenteditableElement } from "@elements";
import { type TextEditorViewMode } from "@types";

export class TextEditor {
  constructor(
    public readonly page: Page,
    public readonly description: string,
    public readonly container: Locator
  ) {
    this.page = page;
    this.description = description;
    this.container = container;
  }

  /**
   * @param label name of the view mode
   */
  private async selectViewMode(label: TextEditorViewMode): Promise<void> {
    const button = new Button(
      `"${label}" view mode button in ${this.description}`,
      this.container
        .locator("css=.ViewModeSwitchers [type='button']")
        .getByText(label, { exact: true })
    );

    await button.click();
  }

  /**
   * @param viewMode name of the view mode
   * @param text text to be filled in the contenteditable element
   */
  public async fill(viewMode: TextEditorViewMode, text: string): Promise<void> {
    await this.selectViewMode(viewMode);

    const editor = new ContenteditableElement(
      `"${viewMode}" textarea in ${this.description}`,
      this.container.locator("css=.ViewModes .Active *")
    );

    await editor.fill(text);
  }
}
