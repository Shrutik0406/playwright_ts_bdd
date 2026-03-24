import { Page, expect } from "@playwright/test";
import { BasePage } from "./Basepage";

export class OrderConfirmationPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async verifyOrderSuccess() {
    await expect(this.page.getByText("Thankyou for the order.")).toBeVisible();
  }
}