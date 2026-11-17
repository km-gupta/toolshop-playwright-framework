import { test, expect } from '@playwright/test';
import { UsersApi } from '../../src/api/UsersApi';
import { DEMO_USER, WRONG_USER } from '../../src/config/env';

test.describe('Login API', { tag: ['@api', '@regression'] }, () => {
  test('rejects invalid credentials with 401', async ({ request }) => {
    const usersApi = new UsersApi(request);

    const res = await usersApi.login(WRONG_USER.email, WRONG_USER.password);

    expect(res.status()).toBe(401);
  });

  test('returns an access token for valid credentials', async ({ request }) => {
    const usersApi = new UsersApi(request);

    const res = await usersApi.login(DEMO_USER.email, DEMO_USER.password);

    console.log(res.status(), await res.text());
    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.access_token).toEqual(expect.any(String));
  });
});