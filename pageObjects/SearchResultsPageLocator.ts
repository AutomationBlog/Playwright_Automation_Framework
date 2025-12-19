import { Page } from 'playwright';
import { CommonPageMethods } from '../commonMethods/commonPageMethods';

export class SearchResultsPageLocator extends CommonPageMethods {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  readonly resultsContainerSelector: string = 'div.s-main-slot';
  readonly productLinkSelectorPattern: string = 'div.s-main-slot a[href*="/dp/"]';
  readonly firstResultSelector: string = 'div.s-main-slot div[data-component-type="s-search-result"] h2 a';
}
