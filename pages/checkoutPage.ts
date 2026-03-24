import { Page } from "@playwright/test";
import { BasePage } from "./Basepage";

export class CheckoutPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  async selectCountry(country: string) {
    const countryField = this.page.getByPlaceholder("Select Country");
    await countryField.pressSequentially(country);
    await this.click(this.page.getByRole("button", { name: country }).nth(1));
  }

  async placeOrder() {
    await this.click(this.page.getByText("PLACE ORDER"));
  }
}