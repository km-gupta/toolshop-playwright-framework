import { UsersApi } from "../../src/api/UsersApi";
import { DEMO_USER } from "../../src/config/env";
import { test, expect } from "../../src/fixtures/base.fixture";

test('logged-in user can open the account page', async ({ page, request }) => {
    const usersApi = new UsersApi(request);

    //login by API and get the token from the response body
    const res = await usersApi.login(DEMO_USER.email, DEMO_USER.password);
    const body = await res.json();

    const token = body.access_token;
    // put the token in local storage BEFORE the page loads:
    await page.addInitScript(([key, value]) => {
        localStorage.setItem(key, value);
    }, ['auth-token', token]);

    // open '/account'
    await page.goto('/account')
    // check the URL contains /account
    await expect(page).toHaveURL(/\/account/)
    // check that the account heading is visible
    await expect(page).toHaveTitle(/account/)
});