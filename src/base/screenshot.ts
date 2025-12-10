import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { Logger } from './logger';

/**
 * Screenshot utility for capturing screenshots during test execution
 */
export class ScreenshotUtil {
  private page: Page;
  private logger: Logger;
  private screenshotDir: string;

  constructor(page: Page, logger: Logger) {
    this.page = page;
    this.logger = logger;
    this.screenshotDir = path.join(process.cwd(), 'screenshots');
    
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true });
    }
  }

  /**
   * Capture screenshot with timestamp
   */
  async captureScreenshot(name: string): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${name}-${timestamp}.png`;
      const filepath = path.join(this.screenshotDir, filename);
      
      await this.page.screenshot({ path: filepath, fullPage: true });
      this.logger.info(`Screenshot captured: ${filepath}`);
      return filepath;
    } catch (error) {
      this.logger.error(`Failed to capture screenshot: ${error}`);
      throw error;
    }
  }

  /**
   * Capture screenshot on failure
   */
  async captureFailureScreenshot(testName: string): Promise<string> {
    try {
      const filename = `FAILED-${testName}-${Date.now()}.png`;
      const filepath = path.join(this.screenshotDir, filename);
      
      await this.page.screenshot({ path: filepath, fullPage: true });
      this.logger.error(`Failure screenshot captured: ${filepath}`);
      return filepath;
    } catch (error) {
      this.logger.error(`Failed to capture failure screenshot: ${error}`);
      throw error;
    }
  }

  /**
   * Get screenshot directory
   */
  getScreenshotDir(): string {
    return this.screenshotDir;
  }

  /**
   * Get all screenshots
   */
  getAllScreenshots(): string[] {
    if (!fs.existsSync(this.screenshotDir)) {
      return [];
    }
    return fs.readdirSync(this.screenshotDir);
  }
}
