import {test as base} from '@playwright/test'
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage"

type Page = {
    loginPage: LoginPage;
    homePage: HomePage;
}

export const test = base.extend<Page>({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    loginPage: async({page}, use) => {
        await use(new LoginPage(page));
    }
})

export {expect} from "@playwright/test"


