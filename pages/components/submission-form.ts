import { type Locator, type Page } from "@playwright/test";
import {
  Button,
  InputText,
  Select,
  SelectLikeElement,
  SwitchElement,
} from "@elements";
import {
  type SubmissionFormCategoryTab,
  type SubmissionFormAuthorGroup,
  type SwitchYesNoOption,
  type SwitchAccessOption,
} from "@types";

import { TextEditor } from "./text-editor";

interface IAuthorGroups {
  [key: string]: number;
}

const authorGroups: IAuthorGroups = {
  "Key Authors": 1,
  "Original Authors": 2,
  Contributors: 3,
  "Special Thanks": 4,
} as const;

export class SubmissionForm {
  private readonly form: Locator;

  // Main Tab

  private readonly titleInput: InputText;
  private readonly gameSelect: SelectLikeElement;
  private readonly categorySelect: SelectLikeElement;
  private readonly bodyTextEditor: TextEditor;
  private readonly subtitleInput: InputText;
  private readonly commentInstructionsTextEditor: TextEditor;

  // Ownership Tab

  private readonly portSwitch: SwitchElement;
  private readonly creatorSwitch: SwitchElement;
  private readonly studioSelect: Select;
  private readonly contributingStudiosSelect: Select;
  private readonly licenseTextEditor: TextEditor;

  // Media Tab

  private readonly screenshotsFileChooserButton: Button;
  private readonly filesFileChooserButton: Button;

  // Settings Tab

  private readonly accessSwitch: SwitchElement;

  // Common

  private readonly submitButton: Button;

  constructor(private readonly page: Page) {
    this.page = page;
    this.form = this.page.locator("css=form.MainForm");

    // Main Tab

    this.titleInput = new InputText(
      "title input",
      this.form.locator("css=#Name input")
    );
    this.gameSelect = new SelectLikeElement(
      "game select",
      this.form.locator("css=#Category .GameCategory")
    );
    this.categorySelect = new SelectLikeElement(
      "category select",
      this.form.locator("css=#Category .Category")
    );
    this.bodyTextEditor = new TextEditor(
      "body text editor",
      this.form.locator("css=#Article")
    );
    this.subtitleInput = new InputText(
      "subtitle input",
      this.form.locator("css=#Description input")
    );
    this.commentInstructionsTextEditor = new TextEditor(
      "comment instructions text editor",
      this.form.locator("css=#CommentInstructions")
    );

    // Ownership Tab

    this.portSwitch = new SwitchElement(
      '"Is this a port?" switch',
      this.form.locator("css=#Ported")
    );
    this.creatorSwitch = new SwitchElement(
      '"Did you create this Mod?" switch',
      this.form.locator("css=#WhoIsTheCreator")
    );
    this.studioSelect = new Select(
      "studio select",
      this.form.locator("css=#Studio select")
    );
    this.contributingStudiosSelect = new Select(
      "contributing studios select",
      this.form.locator("css=#ContributingStudios select")
    );
    this.licenseTextEditor = new TextEditor(
      "license text editor",
      this.form.locator("css=#License")
    );

    // Media Tab

    this.screenshotsFileChooserButton = new Button(
      "screenshots file chooser button",
      this.form.locator("css=#Screenshots button[id*='FileSelector']")
    );
    this.filesFileChooserButton = new Button(
      "files file chooser button",
      this.form.locator("css=#Files button[id*='FileSelector']")
    );

    // Settings Tab

    this.accessSwitch = new SwitchElement(
      "access switch",
      this.form.locator("css=#Status")
    );

    // Common

    this.submitButton = new Button(
      "submit button",
      this.form.locator("css=.Submit button[type='submit']")
    );
  }

  // Main Tab

  public async fillTitleInput(value: string): Promise<void> {
    await this.titleInput.fill(value);
  }

  public async selectGame(gameId: number): Promise<void> {
    await this.gameSelect.selectOption(gameId);
  }

  public async selectCategory(categoryId: number): Promise<void> {
    await this.categorySelect.selectOption(categoryId);
  }

  public interactBodyTextEditor(): TextEditor {
    return this.bodyTextEditor;
  }

  public async fillSubtitleInput(value: string): Promise<void> {
    await this.subtitleInput.fill(value);
  }

  public interactCommentInstructionsTextEditor(): TextEditor {
    return this.commentInstructionsTextEditor;
  }

  // Ownership Tab

  public async selectPortSwitch(answer: SwitchYesNoOption): Promise<void> {
    await this.portSwitch.selectOption(answer);
  }

  public async selectCreatorSwitch(answer: SwitchYesNoOption): Promise<void> {
    await this.creatorSwitch.selectOption(answer);
  }

  /**
   * @param groupName name of the author group
   * @param authorInfo
   * @param authorInfo.username
   * @param authorInfo.role
   */
  public async fillAuthorGroup(
    groupName: SubmissionFormAuthorGroup,
    { username, role }: { username: string; role: string }
  ): Promise<void> {
    const groupNumber = authorGroups[groupName];
    const usernameInput = new InputText(
      `"${groupName}" username input`,
      this.form.locator(`css=input[name*="[${groupNumber}][author_names]"]`)
    );
    const roleInput = new InputText(
      `"${groupName}" role input`,
      this.form.locator(`css=input[name*="[${groupNumber}][author_roles]"]`)
    );

    await usernameInput.fill(username);
    await roleInput.fill(role);
  }

  public async selectStudio(label: string): Promise<void> {
    await this.studioSelect.selectOption(label);
  }

  public async selectContributingStudio(label: string): Promise<void> {
    await this.contributingStudiosSelect.selectOption(label);
  }

  public interactLicenseTextEditor(): TextEditor {
    return this.licenseTextEditor;
  }

  // Media Tab

  public getScreenshotsFileChooserButton(): Button {
    return this.screenshotsFileChooserButton;
  }

  public getFilesFileChooserButton(): Button {
    return this.filesFileChooserButton;
  }

  // Settings Tab

  public async selectAccessSwitch(answer: SwitchAccessOption): Promise<void> {
    await this.accessSwitch.selectOption(answer);
  }

  // Common

  /**
   * @param label name of the category
   */
  public async selectCategoryTab(
    label: SubmissionFormCategoryTab
  ): Promise<void> {
    const button = new Button(
      `"${label}" category tab button`,
      this.page
        .locator("css=.MainForm ul.CategoryTabs")
        .getByText(label, { exact: true })
    );

    await button.click();
  }

  public async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }
}
