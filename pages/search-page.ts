import { type Page, test } from "@playwright/test";
import {
  Button,
  CommonElement,
  InputCheckbox,
  InputRadio,
  InputText,
  Link,
  Select,
} from "@elements";
import {
  type SearchField,
  type SearchResultOrder,
  type SearchSection,
} from "@types";

import { CustomPage } from "./custom-page";

export class SearchPage extends CustomPage {
  private readonly searchQueryInput: InputText;
  private readonly sectionSelect: Select;
  private readonly advancedOptionsButton: Button;
  private readonly submitButton: Button;

  constructor(public readonly page: Page) {
    super(page);
    this.searchQueryInput = new InputText(
      "search query input",
      this.page.locator("css=#_sSearchString")
    );
    this.sectionSelect = new Select(
      "section select",
      this.page.locator("css=#_sModelName")
    );
    this.advancedOptionsButton = new Button(
      "advanced options button",
      this.page.locator("css=button[title='Advanced Options']")
    );
    this.submitButton = new Button(
      "submit button",
      this.page.locator("css=[name='SearchForm'] button[type='submit']")
    );
  }

  public async fillSearchQueryInput(value: string): Promise<void> {
    await this.searchQueryInput.fill(value);
  }

  public async assertSearchQueryInputValue(value: string): Promise<void> {
    await this.searchQueryInput.assertValue(value);
  }

  public async clickAdvancedOptionsButton(): Promise<void> {
    await this.advancedOptionsButton.click();
  }

  public async clickSubmitButton(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * @returns object that represents an HTML element
   */
  public getFirstLinkInResultsList(): Link {
    return new Link(
      "first link in results list",
      this.page.locator("css=.RecordsGrid .Record:first-child a.Name")
    );
  }

  /**
   * Navigate to URL
   */
  public async goto(): Promise<void> {
    const url = "/search";

    await test.step(`Navigate to "${url}"`, async () => {
      await this.page.goto(url);
    });
  }

  /**
   * Game select is a select2 element. It (de)attaches nodes on-demand.
   */
  public async selectGame(title: string): Promise<void> {
    const combobox = new CommonElement(
      "combobox in game select",
      this.page.locator(".select2 [role='combobox']")
    );

    await combobox.click();

    const dropdown = this.page.locator("css=.select2-dropdown");
    const searchQueryInput = new InputText(
      "search query input in game select",
      dropdown.locator("css=[role='searchbox']")
    );
    const resultsList = dropdown.locator("css=[role='listbox']");
    const firstOption = new CommonElement(
      "first option in results list in game select",
      resultsList.locator("css=li[role='option']:first-child")
    );

    await searchQueryInput.fill(title);
    await firstOption.click();
  }

  /**
   * @param label name of the section
   */
  public async selectSection(label: SearchSection): Promise<void> {
    await this.sectionSelect.selectOption(label);
  }

  /**
   * @param label name of the result order
   * @returns object that represents an HTML element
   */
  public getResultOrderRadioButton(label: SearchResultOrder): InputRadio {
    return new InputRadio(
      `result order "${label}" radio button`,
      this.page.getByRole("radio", { name: label, exact: true })
    );
  }

  /**
   * @param label name of the search field
   * @returns object that represents an HTML element
   */
  public getSearchFieldСheckbox(label: SearchField): InputCheckbox {
    return new InputCheckbox(
      `search field "${label}" checkbox`,
      this.page.getByRole("checkbox", { name: label, exact: true })
    );
  }
}
