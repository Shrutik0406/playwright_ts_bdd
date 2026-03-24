import { Page } from "@playwright/test";
import { BasePage } from "./Basepage";

export class LoginPage extends BasePage {

  private emailField = "#userEmail";
  private passField  = "#userPassword";
  private loginBtn   = "[value='Login']";

  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await this.navigate("/client");
  }

  async login(email: string, password: string) {
    await this.type(this.emailField, email);
    await this.type(this.passField, password);
    await this.click(this.loginBtn);
    await this.waitForNetwork();
  }
}