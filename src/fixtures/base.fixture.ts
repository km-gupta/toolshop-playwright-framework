import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { UsersApi } from '../api/UsersApi';
import { createUser, RegisteredUser } from '../data/userFactory';
import { ADMIN_USER } from '../config/env';

type Page = {
  loginPage: LoginPage;
  homePage: HomePage;
  usersApi: UsersApi;
  registeredUser: RegisteredUser;
};

export const test = base.extend<Page>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
  registeredUser: async ({ usersApi }, use) => {
    const user = createUser();
    const registerResponse = await usersApi.register(user);

    const { id } = (await registerResponse.json()) as { id: string };

    await use({ ...user, id });

    // teardown: admin deletes the user
    const adminLogin = await usersApi.login(ADMIN_USER.email, ADMIN_USER.password);
    expect(adminLogin.status(), 'Admin login failed').toBe(200);
    const { access_token } = await adminLogin.json();
    expect(access_token).toBeTruthy();
    await usersApi.deleteUser(id, access_token);
  },
});

export { expect } from '@playwright/test';
