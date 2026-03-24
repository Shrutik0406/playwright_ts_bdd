import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import testData from '../data/data.json';

test('Add Product to Cart', async ({ page }) => {
  await page.goto('/client');

  const dashboard = new DashboardPage(page);
  const cart = new CartPage(page);

  const productName = testData.productName;

  await dashboard.addProductToCart(productName);
  await dashboard.goToCart();
  await cart.verifyProductInCart(productName);
});