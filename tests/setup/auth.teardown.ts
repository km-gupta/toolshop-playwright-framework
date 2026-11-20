import { test as teardown, expect } from '../../src/fixtures/base.fixture';
import fs from 'fs/promises';
import path from 'path';
import { ADMIN_USER } from '../../src/config/env';

const META_FILE = path.join(__dirname, '../../playwright/.auth/meta.json');

teardown('delete session user', async ({ usersApi }) => {
  const { id } = JSON.parse(await fs.readFile(META_FILE, 'utf-8')) as { id: string };

  const adminLogin = await usersApi.login(ADMIN_USER.email, ADMIN_USER.password);
  expect(adminLogin.status()).toBe(200);
  const { access_token } = (await adminLogin.json()) as { access_token: string };

  await usersApi.deleteUser(id, access_token);
});
