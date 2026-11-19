import { Locator, Page, expect } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly title: Locator;
  readonly navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('page-title');
    this.navMenu = page.getByTestId('nav-home');
  }

  async goto(): Promise<void> {
    await this.page.goto('/account');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
    await expect(this.title).toHaveText('My account');
  }
}
