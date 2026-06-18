import { Locator, Page } from '@playwright/test';

export class EmployeeListPage {

  private readonly page: Page;

  private readonly employeeNameField: Locator;
  private readonly autocompleteOptions: Locator;
  private readonly searchButton: Locator;
  private readonly resultRows: Locator;

  public constructor(page: Page) {

    this.page = page;

    this.employeeNameField =
      page.locator('input[placeholder="Type for hints..."]').first();

    this.autocompleteOptions =
      page.locator('.oxd-autocomplete-option');

    this.searchButton =
      page.locator('button[type="submit"]');

    this.resultRows =
      page.locator('.oxd-table-card');
  }

  public async searchEmployee(
    employeeName: string
  ): Promise<void> {

    await this.employeeNameField.waitFor({
      state: 'visible'
    });

    await this.employeeNameField.click();

    await this.employeeNameField.pressSequentially(
      employeeName,
      {
        delay: 100
      }
    );

    await this.autocompleteOptions
      .first()
      .waitFor({
        state: 'visible',
        timeout: 5000
      });

    await this.autocompleteOptions
      .first()
      .click();

    await this.searchButton.click();

    await this.page.waitForLoadState('networkidle');
  }

  public async getRowCount(): Promise<number> {

    return await this.resultRows.count();
  }

  public async getEmployeeNames(): Promise<string[]> {

    const employeeNames: string[] = [];

    const rowCount: number =
      await this.resultRows.count();

    for (
      let index: number = 0;
      index < rowCount;
      index++
    ) {

      const rowText: string =
        (await this.resultRows
          .nth(index)
          .innerText()) ?? '';

      employeeNames.push(
        rowText.trim()
      );
    }

    return employeeNames;
  }
}