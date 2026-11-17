import { UsersApi } from '../../src/api/UsersApi';
import { DEMO_USER } from '../../src/config/env';
import { test, expect } from '../../src/fixtures/base.fixture';

test('logged-in user can open the account page', async ({ page, request }) => {
  const usersApi = new UsersApi(request);

  const res = await usersApi.login(DEMO_USER.email, DEMO_USER.password);
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