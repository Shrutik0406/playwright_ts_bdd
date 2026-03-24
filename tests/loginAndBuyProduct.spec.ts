import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationpage';
import * as testData from '../data/data.json';
//import * as dotenv from 'dotenv';

test('@ui Purchase Product End to End', async ({ page }) => {

    // const email = "shrutika456@gmail.com";
    // const password = "Test#123";
    // const productName = "ZARA COAT 3";

    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const confirm = new OrderConfirmationPage(page);


   // Access JSON data
     //const email = testData.email;
     //const password = testData.password;
     const email = String(process.env.EMAIL);
     const password = String(process.env.PASSWORD);
    const productName = testData.productName;
    const country = testData.country;


    await login.goto();
    await login.login(email, password);

    //explicityly fail - if tc is independt / parallel execution- previoys is fail entrireis fail
    await dashboard.addProductToCart(productName);
    await dashboard.goToCart();

    await cart.verifyProductInCart(productName);
    await cart.checkout();

    await checkout.selectCountry(country);
    await checkout.placeOrder();

    await confirm.verifyOrderSuccess();
});
//ask copilot to achieve parallel execution 