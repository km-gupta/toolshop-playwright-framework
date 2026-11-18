import {test, expect} from '../../src/fixtures/base.fixture'
import { UsersApi } from '../../src/api/UsersApi';
import { WRONG_USER } from '../../src/config/env';

test.describe('Login API', { tag: ['@api', '@regression'] }, () => {
  test('rejects invalid credentials with 401', async ({ usersApi }) => {
    
    const res = await usersApi.login(WRONG_USER.email, WRONG_USER.password);
    expect(res.status()).toBe(401);
  });

  test('returns an access token for valid credentials', async ({ usersApi, registeredUser }) => {

    const res = await usersApi.login(registeredUser.email, registeredUser.password);

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.access_token).toEqual(expect.any(String));
  });
});