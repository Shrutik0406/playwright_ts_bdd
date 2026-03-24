import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationpage';
import testData from '../data/data.json';

test('Verify Order Confirmation', async ({ page }) => {
    await page.goto('/client');

  const dashboard = new DashboardPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const confirm = new OrderConfirmationPage(page);

  const productName = testData.productName;
  const country = testData.country;

  await dashboard.addProductToCart(productName);
  await dashboard.goToCart();
  await cart.checkout();
  await checkout.selectCountry(country);
  await checkout.placeOrder();
  await confirm.verifyOrderSuccess();
});