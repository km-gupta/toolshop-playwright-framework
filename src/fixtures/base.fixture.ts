import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { UsersApi } from '../api/UsersApi';
import { NewUser, createUser } from '../data/userFactory';

type Page = {
  loginPage: LoginPage;
  homePage: HomePage;
  usersApi: UsersApi;
  registeredUser: NewUser;
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
    const res = await usersApi.register(user);
    expect(res.status()).toBe(201);
    await use(user);
  },
});

export { expect } from '@playwright/test';
