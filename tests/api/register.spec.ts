import { test, expect } from '@playwright/test'
import { createUser } from '../../src/data/userFactory'
import { UsersApi } from '../../src/api/UsersApi'

test.describe('New user registration', { tag: ['@api', '@regression'] }, () => {
    test('registers a new user who can then log in', async ({ request }) => {
        const usersApi = new UsersApi(request);
        const newUser = createUser();

        const registerRes = await usersApi.register(newUser);
        expect(registerRes.status()).toBe(201);

        const loginRes = await usersApi.login(newUser.email, newUser.password);
        expect(loginRes.status()).toBe(200);

        const body = await loginRes.json();
        expect(body.access_token).toEqual(expect.any(String));
    })
})