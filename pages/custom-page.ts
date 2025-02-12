import { type Page, test } from "@playwright/test";
import { Button, CommonElement, Link } from "@elements";

import { Header } from "./components/header";

export class CustomPage {
  private readonly header: Header;

  constructor(protected readonly page: Page) {
    this.page = page;
    this.header = new Header(this.page);
  }

  public async goto(url: string): Promise<void> {
    await test.step(`Navigate to ${JSON.stringify(url)}`, async () => {
      await this.page.goto(url);
    });
  }

  public getLatestMasterLogMessage(): CommonElement {
    return new CommonElement(
      "latest master log message",
      this.page.locator("css=#MasterLog logs log:last-child")
    );
  }

  public async assertWelcomeMessage(username: string): Promise<void> {
    await test.step(`Assert welcome message text is "Welcome, ${username}"`, async () => {
      await this.getLatestMasterLogMessage().assertTextContent(
        new RegExp(`^Welcome, ${username}.*`)
      );
    });
  }

  /**
   * Wait for event `download`, click an element to start download, return suggested filename
   * @param triggerElement element on the page to click on to start download
   * @returns suggested filename for this download
   */
  public async getSuggestedFilenameForDownload(
    triggerElement: Button | CommonElement | Link
  ): Promise<string> {
    const downloadPromise = this.page.waitForEvent("download");
    await triggerElement.click();
    const download = await downloadPromise;
    return download.suggestedFilename();
  }

  public interactHeader(): Header {
    return this.header;
  }

  /**
   * Wait for event `download`, click an element to fire up file chooser, wait for API response
   * @param triggerElement element on the page to click on to trigger file chooser
   * @param filePaths an array on file paths to set in the file chooser
   * @param requestUrl URL of the file upload request
   */
  public async setFileChooserFiles(
    triggerElement: Button | CommonElement | Link,
    filePaths: string[],
    requestUrl: string
  ): Promise<void> {
    for await (const filePath of filePaths) {
      await test.step(`Upload file ${JSON.stringify(filePath)}`, async () => {
        const fileChooserPromise = this.page.waitForEvent("filechooser");

        await triggerElement.click();

        const fileChooser = await fileChooserPromise;
        const responsePromise = this.page.waitForResponse(requestUrl);

        await fileChooser.setFiles(filePath);

        await test.step(`Wait for response "${requestUrl}"`, async () => {
          const response = await responsePromise;
        });
      });
    }
  }

  public async saveStorageState(path: string): Promise<void> {
    await this.page.context().storageState({ path });
  }
}
