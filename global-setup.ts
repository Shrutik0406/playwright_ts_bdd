import { chromium } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/client');

  await page.fill('#userEmail', process.env.EMAIL!);
  await page.fill('#userPassword', process.env.PASSWORD!);
  await page.click('[value="Login"]');

  await page.waitForLoadState('networkidle');

  await context.storageState({ path: 'auth.json' });
  await browser.close();
}

export default globalSetup;
