import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Account page (saved session)', { tag: ['@ui', '@regression'] }, () => {
  test('opens the account page without logging in', async ({ accountPage, page }) => {
    await accountPage.goto();
    await accountPage.expectLoaded();
    await accountPage.expectLoggedIn();
    await expect(page).toHaveURL(/account/);
  });
});
