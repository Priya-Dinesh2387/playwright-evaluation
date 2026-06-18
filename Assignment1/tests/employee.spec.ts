import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeeListPage } from '../pages/EmployeeListPage';

test.describe(
  'Employee Search Tests',
  () => {

    test(
      'Search employee and validate results',
      async ({ page }) => {

        const loginPage: LoginPage =
          new LoginPage(page);

        const dashboardPage: DashboardPage =
          new DashboardPage(page);

        const employeeListPage:
          EmployeeListPage =
          new EmployeeListPage(page);

        await loginPage.navigate();

        await loginPage.login(
          'Admin',
          'admin123'
        );

        await expect(page)
          .toHaveURL(/dashboard/i);

        await dashboardPage
          .navigateToPIM();

        await page.waitForURL(/pim/i);

        await employeeListPage
          .searchEmployee('a');

        const rowCount: number =
          await employeeListPage
            .getRowCount();

        console.log(
          `Row count found: ${rowCount}`
        );

        expect(rowCount)
          .toBeGreaterThan(0);

        const employeeNames:
          string[] =
          await employeeListPage
            .getEmployeeNames();

        console.log(
          'Employee Names:',
          employeeNames
        );

        expect(employeeNames.length)
          .toBeGreaterThan(0);

        for (
          const employeeName
          of employeeNames
        ) {

          expect(
            employeeName.trim().length
          ).toBeGreaterThan(0);
        }
      }
    );
  }
);