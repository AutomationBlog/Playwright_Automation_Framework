import { Page } from 'playwright';
import logger from '../utils/logger';
import { HomePageLocator } from '../pageObjects/HomePageLocator';

export class HomePage extends HomePageLocator {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async open() {
    logger.info(`[PAGE] HomePage: Navigating to ${this.url}`);
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    logger.info('[PAGE] HomePage: Navigation completed');
    await this.page.click(this.continueShoppingButtonSelector);
    logger.info('[PAGE] HomePage: Clicked Continue shopping button if present');
  }

  async search(term: string) {
    logger.info(`[PAGE] HomePage: Searching for '${term}'`);
    await this.page.fill(this.searchInputSelector, term);
    await this.page.click(this.searchButtonSelector);
    await this.page.waitForLoadState('domcontentloaded');
    logger.info(`[PAGE] HomePage: Search completed for '${term}'`);
  }
}
