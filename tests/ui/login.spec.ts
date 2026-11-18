import { WRONG_USER } from '../../src/config/env';
import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('invalid credentials', { tag: ['@ui', '@regression'] }, () => {
  test('shows an error for invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(WRONG_USER.email, WRONG_USER.password);

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
