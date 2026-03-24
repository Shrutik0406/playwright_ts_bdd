import { Locator, Page } from "@playwright/test";
import { BasePage } from "./Basepage";
import { Waits } from "../utils/waits";

export class DashboardPage extends BasePage {

  readonly products: Locator;

  constructor(page: Page) {
    super(page);
    this.products = this.page.locator('.card-body');
  }

  async addProductToCart(productName: string) {
    const product = this.products.filter({ hasText: productName });
    const addBtn = product.getByRole('button', { name: 'Add to Cart' });

    await Waits.clickable(addBtn, 10_000);
    await Waits.stablePosition(addBtn);
    await addBtn.click();
  }

  async goToCart() {
    const cartBtn = this.page.getByRole('listitem').getByRole('button', { name: 'Cart' });
    await Waits.clickable(cartBtn);
    await cartBtn.click();
  }
}