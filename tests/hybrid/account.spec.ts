import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Account page', { tag: ['@hybrid', '@regression'] }, () => {
  test('logged-in user can open the account page', async ({ accountPage, authenticatedPage }) => {
    await accountPage.goto();
    await accountPage.expectLoaded();
    await expect(authenticatedPage).toHaveURL(/account/);
  });
});
