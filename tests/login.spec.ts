import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('Verify Login Working with saved session', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  //await expect(page.locator("h3:has-text('Dashboard')")).toBeVisible();
});