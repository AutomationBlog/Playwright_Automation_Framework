import { Page, BrowserContext, Browser } from '@playwright/test';
import { Logger } from './logger';

/**
 * Base Test class
 * Contains common test setup and teardown logic
 */
export class BaseTest {
  protected page: Page | null = null;
  protected context: BrowserContext | null = null;
  protected browser: Browser | null = null;
  protected logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  /**
   * Setup before each test
   */
  async beforeEach(): Promise<void> {
    this.logger.info('Setting up test environment');
  }

  /**
   * Teardown after each test
   */
  async afterEach(): Promise<void> {
    this.logger.info('Tearing down test environment');
    
    if (this.page) {
      await this.page.close();
    }
    
    if (this.context) {
      await this.context.close();
    }
    
    if (this.browser) {
      await this.browser.close();
    }
  }

  /**
   * Initialize page
   */
  setPage(page: Page): void {
    this.page = page;
  }

  /**
   * Get page
   */
  getPage(): Page {
    if (!this.page) {
      throw new Error('Page is not initialized');
    }
    return this.page;
  }

  /**
   * Get logger
   */
  getLogger(): Logger {
    return this.logger;
  }

  /**
   * Setup browser context
   */
  setBrowserContext(context: BrowserContext): void {
    this.context = context;
  }

  /**
   * Setup browser
   */
  setBrowser(browser: Browser): void {
    this.browser = browser;
  }
}
