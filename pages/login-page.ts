import { type Page, test } from "@playwright/test";
import { Button, InputText } from "@elements";

import { CustomPage } from "./custom-page";

export class LoginPage extends CustomPage {
  public readonly usernameInput: InputText;
  public readonly passwordInput: InputText;
  public readonly submitButton: Button;

  constructor(public readonly page: Page) {
    super(page);
    this.usernameInput = new InputText(
      "username input",
      this.page.getByLabel("Username", { exact: true })
    );
    this.passwordInput = new InputText(
      "password input",
      this.page.getByLabel("Password", { exact: true })
    );
    this.submitButton = new Button(
      "submit button",
      this.page.getByRole("button", { name: "Login", exact: true })
    );
  }

  /**
   * Navigate to URL
   */
  public async goto(): Promise<void> {
    const url = "/members/account/login";

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }
}
