import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('shows an error for invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('wrong@example.com', 'wrong-password');

  await expect(loginPage.errorMessage).toBeVisible();
});