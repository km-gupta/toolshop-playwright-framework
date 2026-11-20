import { Locator, Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productTitles: Locator;
  readonly quantityInputs: Locator;
  readonly cartTotal: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitles = page.getByTestId('product-title');
    this.quantityInputs = page.getByTestId('product-quantity');
    this.cartTotal = page.getByTestId('cart-total');
    this.proceedButton = page.getByTestId('proceed-1');
  }

  async expectProductInCart(name: string): Promise<void> {
    await expect(this.productTitles.getByText(name, { exact: true })).toBeVisible();
  }

  async expectQuantity(quantity: number): Promise<void> {
    await expect(this.quantityInputs).toHaveValue(String(quantity));
  }
}
