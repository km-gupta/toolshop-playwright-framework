import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('user can open login page from home page', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await expect(page).toHaveTitle('Automation Exercise');

  await home.clickSignupLogin();
  await expect(page).toHaveURL(/\/login/);
});