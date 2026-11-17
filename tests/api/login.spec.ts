import { test, expect } from '@playwright/test';
import { UsersApi } from '../../src/api/UsersApi';
import { DEMO_USER, WRONG_USER } from '../../src/config/env';

test('Invalid Login', async ({ request }) => {
  const usersApi = new UsersApi(request);

  const res = await usersApi.login(WRONG_USER.email, WRONG_USER.password);
  expect(res.status()).toBe(401);
});

test('Valid Login', async ({ request }) => {
  const usersApi = new UsersApi(request);

  const res = await usersApi.login(DEMO_USER.email, DEMO_USER.password);
  expect(res.status()).toBe(200);
  
  const body = await res.json();
  
  expect(typeof body.access_token).toBe("string");
});