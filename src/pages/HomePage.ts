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

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async openSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async openProduct(name: string): Promise<void> {
    await this.productNames.getByText(name, { exact: true }).click();
  }
}
