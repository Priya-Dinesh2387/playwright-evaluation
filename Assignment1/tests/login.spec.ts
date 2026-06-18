import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test.describe('Login Tests', () => {

  test('Successful Login', async ({ page }) => {

    const loginPage: LoginPage =
      new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'Admin',
      'admin123'
    );

    await expect(page).toHaveURL(
      /dashboard/
    );
  });

  test('Failed Login', async ({ page }) => {

    const loginPage: LoginPage =
      new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
      'Admin',
      'wrongPassword'
    );

    await expect(
      page.locator('.oxd-alert-content-text')
    ).toContainText(
      'Invalid credentials'
    );
  });
});