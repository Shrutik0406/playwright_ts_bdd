import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';
import type { PWWorld } from './support/world';
import testData from '../data/data.json';
import * as dotenv from 'dotenv';
dotenv.config();

let login: LoginPage;
let dashboard: DashboardPage;
let cart: CartPage;
let checkout: CheckoutPage;
let confirm: OrderConfirmationPage;

Given('User launches the application', async function (this: PWWorld) {
  // Now this.page is defined by hooks
  
  if (!this.page) throw new Error('Page not initialized by hooks');
  await this.page.goto(this.baseURL, { timeout: 30_000, waitUntil: 'domcontentloaded' });


  login = new LoginPage(this.page);
  dashboard = new DashboardPage(this.page);
  cart = new CartPage(this.page);
  checkout = new CheckoutPage(this.page);
  confirm = new OrderConfirmationPage(this.page);

  // If you didn’t navigate in Before hook, do:
  // await this.page.goto(this.baseURL);
});

When('User logs in with valid credentials', async function (this: PWWorld) {
  await login.login(process.env.EMAIL!, process.env.PASSWORD!);
});

When('User adds a product to the cart', async function (this: PWWorld) {
  await dashboard.addProductToCart(testData.productName);
  await dashboard.goToCart();
});

When('User verifies product in the cart', async function (this: PWWorld) {
  await cart.verifyProductInCart(testData.productName);
});

When('User proceeds to checkout', async function (this: PWWorld) {
  await cart.checkout();
});

When('User selects the country and places the order', async function (this: PWWorld) {
  await checkout.selectCountry(testData.country);
  await checkout.placeOrder();
});

Then('Order should be placed successfully', async function (this: PWWorld) {
  await confirm.verifyOrderSuccess();
});