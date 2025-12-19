import { Page } from 'playwright';
import { SearchResultsPageLocator } from '../pageObjects/SearchResultsPage.Locators';
import { CommonPageMethods } from '../commonMethods/commonPageMethods';

export class SearchResultsPage extends CommonPageMethods {
  readonly page: Page;
  readonly SearchResultsPageLocator: SearchResultsPageLocator = new SearchResultsPageLocator();
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async openFirstResult() {
    this.loggerInfo('[PAGE] SearchResultsPage: Opening first search result');
    await this.waitForSelector(this.SearchResultsPageLocator.resultsContainerSelector);
    // Try common product link patterns (product detail pages often contain "/dp/")
    let first = await this.getElement(this.SearchResultsPageLocator.productLinkSelectorPattern);
    if (!first) {
      // fallback to typical search result heading link
      first = await this.getElement(this.SearchResultsPageLocator.firstResultSelector);
    }
    if (!first) {
      this.loggerError('[PAGE] SearchResultsPage: No search results found');
      throw new Error('No search results found');
    }
    await first.click();
    await this.waitforPageLoad();
    this.loggerInfo('[PAGE] SearchResultsPage: First result opened successfully');
  }
}
