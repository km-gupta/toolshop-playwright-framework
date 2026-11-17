import { test, expect } from '@playwright/test';
import { ProductsApi } from '../../src/api/ProductsApi';

test('GET /products returns a product list', async ({ request }) => {
  const productsApi = new ProductsApi(request);

  const res = await productsApi.getProducts();
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(body.data.length).toBeGreaterThan(0);

  expect(body.data[0]).toMatchObject({
    "id": expect.any(String),
    "name": expect.any(String),
    "price": expect.any(Number)
  })
});