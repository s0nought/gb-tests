import { type Locator } from "@playwright/test";
import { Button, ContenteditableElement } from "@elements";
import { type TextEditorViewMode } from "@types";

export class TextEditor {
  constructor(
    private readonly description: string,
    private readonly container: Locator
  ) {
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
   * @param text text to be filled in the contenteditable element
   * @param viewMode name of the view mode
   */
  public async fill(
    text: string,
    viewMode: TextEditorViewMode = "Wysiwyg"
  ): Promise<void> {
    await this.selectViewMode(viewMode);

    const editor = new ContenteditableElement(
      `"${viewMode}" textarea in ${this.description}`,
      this.container.locator("css=.ViewModes .Active *")
    );

    await editor.fill(text);
  }
}
