import { Page, expect } from "@playwright/test";
import { BasePage } from "./Basepage";

export class CartPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  
  async verifyProductInCart(productName: string) {
        await this.page.locator("div li").first().waitFor();
        await expect(this.page.getByText(productName)).toBeVisible();
    }

  async checkout() {
    await this.click(this.page.getByRole("button", { name: "Checkout" }));
  }
}