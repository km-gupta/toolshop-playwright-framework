import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('home page shows products and opens sign in', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await expect(homePage.productCards.first()).toBeVisible();

  await homePage.openSignIn();
  await expect(page).toHaveURL(/\/auth\/login/);
});