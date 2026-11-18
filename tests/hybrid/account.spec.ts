import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('Account page', { tag: ['@hybrid', '@regression'] }, () => {
  test('logged-in user can open the account page', async ({ page, usersApi, registeredUser }) => {
    const res = await usersApi.login(registeredUser.email, registeredUser.password);
    expect(res.status()).toBe(200);
    const { access_token } = await res.json();

    // token must be set before the page scripts run
    await page.addInitScript(
      ([key, value]) => localStorage.setItem(key, value),
      ['auth-token', access_token],
    );

    await page.goto('/account');
    await expect(page).toHaveURL(/\/account/);
    await expect(page.getByTestId('page-title')).toBeVisible();
  });
});
