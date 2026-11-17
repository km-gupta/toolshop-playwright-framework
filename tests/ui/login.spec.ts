import { test, expect } from "../../src/fixtures/base.fixture";
import { LoginPage } from '../../src/pages/LoginPage';

test('shows an error for invalid credentials', async ({loginPage}) => {

  await loginPage.goto();
  await loginPage.login('wrong@example.com', 'wrong-password');

  await expect(loginPage.errorMessage).toBeVisible();
});