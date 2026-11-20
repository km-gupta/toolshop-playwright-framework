import { Locator, Page, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly cartIcon: Locator;
  readonly cartQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('product-name');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.cartIcon = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async expectCartQuantity(quantity: number): Promise<void> {
    await expect(this.cartQuantity).toHaveText(String(quantity));
  }
}
