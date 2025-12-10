import { Page, expect } from '@playwright/test';
import { Logger } from './logger';
import { ScreenshotUtil } from './screenshot';

/**
 * Base Page Object Model class
 * All page objects should extend this class
 */
export class BasePage {
  protected page: Page;
  protected logger: Logger;
  protected screenshotUtil: ScreenshotUtil;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
    this.screenshotUtil = new ScreenshotUtil(page, this.logger);
  }

  /**
   * Navigate to a URL
   */
  async goto(url: string): Promise<void> {
    this.logger.info(`Navigating to URL: ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
    this.logger.info('Page navigation completed');
  }

  /**
   * Fill text in an element
   */
  async fillText(selector: string, text: string): Promise<void> {
    this.logger.info(`Filling text in selector: ${selector} with value: ${text}`);
    await this.page.fill(selector, text);
  }

  /**
   * Click on an element
   */
  async click(selector: string): Promise<void> {
    this.logger.info(`Clicking on selector: ${selector}`);
    await this.page.click(selector);
  }

  /**
   * Get text from an element
   */
  async getText(selector: string): Promise<string> {
    this.logger.info(`Getting text from selector: ${selector}`);
    const text = await this.page.textContent(selector);
    return text || '';
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(selector: string, timeout: number = 30000): Promise<void> {
    this.logger.info(`Waiting for element: ${selector}`);
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    this.logger.info('Waiting for page to load completely');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.screenshotUtil.captureScreenshot(name);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Verify element text
   */
  async verifyElementText(selector: string, expectedText: string): Promise<void> {
    this.logger.info(`Verifying text in selector: ${selector}`);
    await expect(this.page.locator(selector)).toContainText(expectedText);
    this.logger.info(`Text verification passed: ${expectedText}`);
  }

  /**
   * Press key
   */
  async pressKey(key: string): Promise<void> {
    this.logger.info(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  /**
   * Select option from dropdown
   */
  async selectDropdownOption(selector: string, value: string): Promise<void> {
    this.logger.info(`Selecting option '${value}' from dropdown: ${selector}`);
    await this.page.selectOption(selector, value);
  }

  /**
   * Hover over element
   */
  async hover(selector: string): Promise<void> {
    this.logger.info(`Hovering over selector: ${selector}`);
    await this.page.hover(selector);
  }

  /**
   * Wait for specific time
   */
  async waitForTime(milliseconds: number): Promise<void> {
    this.logger.info(`Waiting for ${milliseconds}ms`);
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Scroll to element
   */
  async scrollToElement(selector: string): Promise<void> {
    this.logger.info(`Scrolling to selector: ${selector}`);
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Get element count
   */
  async getElementCount(selector: string): Promise<number> {
    const count = await this.page.locator(selector).count();
    this.logger.info(`Element count for selector '${selector}': ${count}`);
    return count;
  }
}
