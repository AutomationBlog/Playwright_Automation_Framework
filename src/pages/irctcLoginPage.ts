import { Page } from '@playwright/test';
import { BasePage } from '../base/basePage';

/**
 * IRCTC Login Page Object
 */
export class IRCTCLoginPage extends BasePage {
  // Selectors
  private readonly usernameInput = 'input[id="userid"]';
  private readonly passwordInput = 'input[id="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.error-message';
  private readonly welcomeMessage = '.welcome-message';
  private readonly forgotPasswordLink = 'a[href*="forgotPassword"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('https://www.irctc.co.in/nget/login');
    await this.waitForPageLoad();
    this.logger.info('Navigated to IRCTC login page');
  }

  /**
   * Verify login page is loaded
   */
  async verifyLoginPageLoaded(): Promise<boolean> {
    try {
      await this.waitForElement(this.usernameInput);
      this.logger.info('Login page loaded successfully');
      return true;
    } catch {
      this.logger.error('Login page failed to load');
      return false;
    }
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    this.logger.info(`Entering username: ${username}`);
    await this.fillText(this.usernameInput, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    this.logger.info('Entering password');
    await this.fillText(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    await this.takeScreenshot('before-login');
    this.logger.info('Clicking login button');
    await this.click(this.loginButton);
    await this.waitForPageLoad();
  }

  /**
   * Perform login
   */
  async login(username: string, password: string): Promise<void> {
    await this.verifyLoginPageLoaded();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Verify login error
   */
  async verifyLoginError(): Promise<boolean> {
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Click forgot password
   */
  async clickForgotPassword(): Promise<void> {
    this.logger.info('Clicking forgot password link');
    await this.click(this.forgotPasswordLink);
  }
}
