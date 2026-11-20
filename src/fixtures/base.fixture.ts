import { test as base, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { UsersApi } from '../api/UsersApi';
import { createUser, RegisteredUser } from '../data/userFactory';
import { ADMIN_USER } from '../config/env';
import { AccountPage } from '../pages/AccountPage';
import { AUTH_TOKEN_KEY } from '../config/constants';
import { ProductPage } from '../pages/ProductPage';

type Fixtures = {
  authenticatedPage: Page;
  loginPage: LoginPage;
  homePage: HomePage;
  accountPage: AccountPage;
  productPage: ProductPage;
  usersApi: UsersApi;
  registeredUser: RegisteredUser;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  usersApi: async ({ request }, use) => {
    await use(new UsersApi(request));
  },
  authenticatedPage: async ({ page, usersApi, registeredUser }, use) => {
    const res = await usersApi.login(registeredUser.email, registeredUser.password);
    expect(res.status()).toBe(200);
    const { access_token } = (await res.json()) as { access_token: string };

    await page.addInitScript(
      ([key, value]) => localStorage.setItem(key, value),
      [AUTH_TOKEN_KEY, access_token],
    );
    await use(page);
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
