import { Page } from 'playwright';
import logger from '../utils/logger';

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    logger.info('[PAGE] HomePage: Navigating to https://www.amazon.com');
    await this.page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });
    logger.info('[PAGE] HomePage: Navigation completed');
    await this.page.click('button[type="submit"]');
    logger.info('[PAGE] HomePage: Clicked Continue shopping button if present');
  }

  async search(term: string) {
    logger.info(`[PAGE] HomePage: Searching for '${term}'`);
    await this.page.fill('input[id="twotabsearchtextbox"]', term);
    await this.page.click('input[id="nav-search-submit-button"]');
    await this.page.waitForLoadState('domcontentloaded');
    logger.info(`[PAGE] HomePage: Search completed for '${term}'`);
  }
}
