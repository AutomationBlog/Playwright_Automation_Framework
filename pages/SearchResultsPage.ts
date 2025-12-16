import { Page } from 'playwright';
import logger from '../utils/logger';
import { SearchResultsPageLocator } from '../pageObjects/SearchResultsPageLocator';

export class SearchResultsPage extends SearchResultsPageLocator {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async openFirstResult() {
    logger.info('[PAGE] SearchResultsPage: Opening first search result');
    await this.page.waitForSelector(this.resultsContainerSelector);
    // Try common product link patterns (product detail pages often contain "/dp/")
    let first = await this.page.$(this.productLinkSelectorPattern);
    if (!first) {
      // fallback to typical search result heading link
      first = await this.page.$(this.firstResultSelector);
    }
    if (!first) {
      logger.error('[PAGE] SearchResultsPage: No search results found');
      throw new Error('No search results found');
    }
    await first.click();
    await this.page.waitForLoadState('domcontentloaded');
    logger.info('[PAGE] SearchResultsPage: First result opened successfully');
  }
}
