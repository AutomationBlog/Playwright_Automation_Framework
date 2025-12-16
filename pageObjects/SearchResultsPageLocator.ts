import { Page } from 'playwright';
import logger from '../utils/logger';

export class SearchResultsPageLocator {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  readonly resultsContainerSelector: string = 'div.s-main-slot';
  readonly productLinkSelectorPattern: string = 'div.s-main-slot a[href*="/dp/"]';
  readonly firstResultSelector: string = 'div.s-main-slot div[data-component-type="s-search-result"] h2 a';
}
