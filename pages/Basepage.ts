import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url, { waitUntil: "domcontentloaded" });
  }

  async click(selector: string | Locator) {
    if (typeof selector === "string") {
      await this.page.locator(selector).click();
    } else {
      await selector.click();
    }
  }

  async type(selector: string | Locator, value: string) {
    if (typeof selector === "string") {
      await this.page.locator(selector).fill(value);
    } else {
      await selector.fill(value);
    }
  }

  async waitForNetwork() {
    await this.page.waitForLoadState("networkidle");
  }

  async elementVisible(selector: string | Locator) {
    if (typeof selector === "string") {
      await this.page.locator(selector).waitFor({ state: "visible" });
    } else {
      await selector.waitFor({ state: "visible" });
    }
  }
}