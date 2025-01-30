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

  public readonly titleInput: InputText;
  public readonly gameSelect: SelectLikeElement;
  public readonly categorySelect: SelectLikeElement;
  public readonly bodyTextEditor: TextEditor;
  public readonly subtitleInput: InputText;
  public readonly commentInstructionsTextEditor: TextEditor;

  // Ownership Tab

  public readonly portSwitch: SwitchElement;
  public readonly creatorSwitch: SwitchElement;
  public readonly studioSelect: Select;
  public readonly contributingStudiosSelect: Select;
  public readonly licenseTextEditor: TextEditor;

  // Media Tab

  public readonly screenshotsFileChooserButton: Button;
  public readonly filesFileChooserButton: Button;

  // Settings Tab

  public readonly accessSwitch: SwitchElement;

  // Common

  public readonly submitButton: Button;

  constructor(public readonly page: Page) {
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
      this.page,
      "body text editor",
      this.form.locator("css=#Article")
    );
    this.subtitleInput = new InputText(
      "subtitle input",
      this.form.locator("css=#Description input")
    );
    this.commentInstructionsTextEditor = new TextEditor(
      this.page,
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
      this.page,
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

  // Ownership Tab

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
}
