import { type Page } from "@playwright/test";
import { Button, InputText } from "@elements";

import { CustomPage } from "./custom-page";

export class LoginPage extends CustomPage {
  private readonly usernameInput: InputText;
  private readonly passwordInput: InputText;
  private readonly submitButton: Button;

  constructor(page: Page) {
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

  public async goto(): Promise<void> {
    await super.goto("/members/account/login");
  }

  public async fillUsernameInput(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  public async fillPasswordInput(password: string): Promise<void> {
    await this.passwordInput.fill(password, { isMasked: true });
  }

  public async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}
