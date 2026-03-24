import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationpage';

import testData from '../data/data.json';

// Declare shared variables — will be initialized in beforeEach()
let login: LoginPage;
let dashboard: DashboardPage;
let cart: CartPage;
let checkout: CheckoutPage;
let confirm: OrderConfirmationPage;
let productName: string;
let country: string;

// ⭐ ENABLE TEST-LEVEL PARALLELISM
test.describe.configure({ mode: 'parallel' });

// ⭐ BEFORE EACH TEST — reduces repetition
test.beforeEach(async ({ page }) => {
  
  // Always start from home page
    await page.goto('/client');

  // Create your Page Objects ONCE per test
  login = new LoginPage(page);
  dashboard = new DashboardPage(page);
  cart = new CartPage(page);
  checkout = new CheckoutPage(page);
  confirm = new OrderConfirmationPage(page);

  // Load test data
  productName = testData.productName;
  country = testData.country;
});


// ⭐ TEST 1: Login Only
test('Login Test', async ({ page }) => {
  await expect(page.locator("h3:has-text('Dashboard')")).toBeVisible();
});


// ⭐ TEST 2: Add To Cart
test('Add Product to Cart', async ({ page }) => {
  await dashboard.addProductToCart(productName);
  await dashboard.goToCart();
  await cart.verifyProductInCart(productName);
});


// ⭐ TEST 3: Checkout
test('Checkout Product', async ({ page }) => {
  await dashboard.addProductToCart(productName);
  await dashboard.goToCart();
  await cart.checkout();
  await checkout.selectCountry(country);
});


// ⭐ TEST 4: Place Order
test('Place Order', async ({ page }) => {
  await dashboard.addProductToCart(productName);
  await dashboard.goToCart();
  await cart.checkout();
  await checkout.selectCountry(country);
  await checkout.placeOrder();
});


// ⭐ TEST 5: Order Confirmation
test('Order Confirmation', async ({ page }) => {
  await dashboard.addProductToCart(productName);
  await dashboard.goToCart();
  await cart.checkout();
  await checkout.selectCountry(country);
  await checkout.placeOrder();
  await confirm.verifyOrderSuccess();
});