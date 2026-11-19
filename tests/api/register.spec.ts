import { test, expect } from '../../src/fixtures/base.fixture';
import { createUser } from '../../src/data/userFactory';

test.describe('New user registration', { tag: ['@api', '@regression'] }, () => {
  test('registers a new user who can then log in', async ({ usersApi }) => {
    const newUser = createUser();

    const registerRes = await usersApi.register(newUser);

    expect(registerRes.status()).toBe(201);

    const loginRes = await usersApi.login(newUser.email, newUser.password);
    expect(loginRes.status()).toBe(200);

    const body = await loginRes.json();
    expect(body.access_token).toEqual(expect.any(String));
  });
});
