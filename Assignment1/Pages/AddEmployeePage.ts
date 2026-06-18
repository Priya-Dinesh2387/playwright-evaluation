import { Locator, Page } from '@playwright/test';

export class AddEmployeePage {
  private readonly page: Page;

  private readonly addEmployeeButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly saveButton: Locator;

  public constructor(page: Page) {
    this.page = page;

    this.addEmployeeButton =
      page.locator('a[href*="addEmployee"]');

    this.firstNameInput =
      page.locator('input[name="firstName"]');

    this.lastNameInput =
      page.locator('input[name="lastName"]');

    this.saveButton =
      page.locator('button[type="submit"]');
  }

  public async clickAddEmployee(): Promise<void> {
    await this.addEmployeeButton.click();
  }

  public async addEmployee(
    firstName: string,
    lastName: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }
}