export class SearchResultsPageLocator{
  readonly resultsContainerSelector: string = 'div.s-main-slot';
  readonly productLinkSelectorPattern: string = 'div.s-main-slot a[href*="/dp/"]';
  readonly firstResultSelector: string = 'div.s-main-slot div[data-component-type="s-search-result"] h2 a';
}
