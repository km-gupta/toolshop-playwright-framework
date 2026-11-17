import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly signInLink: Locator;
  readonly productCards: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInLink = page.getByTestId('nav-sign-in');
    this.productCards = page.locator('a.card');
    this.productNames = page.getByTestId('product-name');
  }

  async goto() {
    await this.page.goto('/');
  }

  async openSignIn() {
    await this.signInLink.click();
  }
}