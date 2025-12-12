import { Page } from 'playwright';

export class SearchResultsPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openFirstResult() {
    await this.page.waitForSelector('div.s-main-slot');
    // Try common product link patterns (product detail pages often contain "/dp/")
    let first = await this.page.$('div.s-main-slot a[href*="/dp/"]');
    if (!first) {
      // fallback to typical search result heading link
      first = await this.page.$('div.s-main-slot div[data-component-type="s-search-result"] h2 a');
    }
    if (!first) throw new Error('No search results found');
    await first.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
