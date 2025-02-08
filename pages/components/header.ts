import { type Page } from "@playwright/test";
import { Button, InputText, Link } from "@elements";

export class Header {
  private readonly loginLink: Link;
  private readonly searchQueryInput: InputText;
  private readonly searchButton: Button;

  constructor(public readonly page: Page) {
    this.page = page;
    this.loginLink = new Link(
      "login link in header",
      this.page.locator("css=#PrimaryNav a[href='/members/account/login']")
    );
    this.searchQueryInput = new InputText(
      "search query input in header",
      this.page.locator("css=#SearchForm input[type='text']")
    );
    this.searchButton = new Button(
      "search button in header",
      this.page.locator("css=#SearchForm button[type='submit']")
    );
  }

  public async clickLoginLink(): Promise<void> {
    await this.loginLink.click();
  }

  public async fillSearchQueryInput(value: string): Promise<void> {
    await this.searchQueryInput.fill(value);
  }

  public async clickSearchButton(): Promise<void> {
    await this.searchButton.click();
  }
}
