import { test, expect } from "../../src/fixtures/base.fixture";
import { HomePage } from '../../src/pages/HomePage';

test('home page shows products and opens sign in', async ({ page, homePage }) => {
  await homePage.goto();
  await expect(homePage.productCards.first()).toBeVisible();

  await homePage.openSignIn();
  await expect(page).toHaveURL(/\/auth\/login/);
});