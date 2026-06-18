import { Locator, Page } from '@playwright/test';

export class DashboardPage {

  private readonly page: Page;

  private readonly pimMenu: Locator;

  public constructor(page: Page) {

    this.page = page;

    this.pimMenu =
      page.locator(
        'a[href*="viewPimModule"]'
      );
  }

  public async navigateToPIM():
    Promise<void> {

    await this.pimMenu.click();
  }
}