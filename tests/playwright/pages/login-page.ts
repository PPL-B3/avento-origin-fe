import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  
  // Selectors - adjust these based on your actual application
  private readonly usernameInput = 'input[name="email"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '[data-testid="error-message"]';
  private readonly welcomeMessage = '[data-testid="welcome-message"]';
  private readonly logoutButton = '[data-testid="logout-button"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/auth/login');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    const error = await this.page.locator(this.errorMessage);
    return await error.textContent();
  }

  async isLoggedIn() {
    return await this.page.locator(this.welcomeMessage).isVisible();
  }

  async logout() {
    await this.page.click(this.logoutButton);
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}
