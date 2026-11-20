import { test, expect } from '../../src/fixtures/base.fixture';

const PRODUCT_NAME = 'Combination Pliers';

test.describe('Cart', { tag: ['@ui', '@regression'] }, () => {
  test('adds a product to the cart', async ({ homePage, productPage }) => {
    await homePage.goto();
    await homePage.openProduct(PRODUCT_NAME);
    await expect(productPage.productName).toHaveText(PRODUCT_NAME);
    await productPage.addToCart();
    await productPage.expectCartQuantity(1);
  });

  test('cart shows the added product', async ({ homePage, productPage, cartPage }) => {
    await homePage.goto();
    await homePage.openProduct(PRODUCT_NAME);
    await productPage.addToCart();
    await productPage.openCart();
    await cartPage.expectProductInCart(PRODUCT_NAME);
    await expect(cartPage.cartTotal).toContainText('$14.15');
  });
});
