import { AUTH_TOKEN_KEY } from '../../src/config/constants';
import { createUser } from '../../src/data/userFactory';
import { test as setup, expect } from '../../src/fixtures/base.fixture';
import path from 'path';
import fs from 'fs/promises';

const AUTH_FILE = path.join(__dirname, '../../playwright/.auth/user.json');
const META_FILE = path.join(__dirname, '../../playwright/.auth/meta.json');

setup('authenticate and save session', async ({ page, usersApi }) => {
  await fs.mkdir(path.dirname(META_FILE), { recursive: true });
  const user = createUser();
  const registerResponse = await usersApi.register(user);
  const { id } = (await registerResponse.json()) as { id: string };
  await fs.writeFile(META_FILE, JSON.stringify({ id }));

  const res = await usersApi.login(user.email, user.password);
  expect(res.status()).toBe(200);
  const { access_token } = (await res.json()) as { access_token: string };

  await page.goto('/');
  await page.evaluate(
    ([key, value]) => localStorage.setItem(key, value),
    [AUTH_TOKEN_KEY, access_token],
  );

  await page.context().storageState({ path: AUTH_FILE });
});
