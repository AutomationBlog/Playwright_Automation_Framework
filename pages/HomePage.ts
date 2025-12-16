import { Page } from 'playwright';
import { HomePageLocator } from '../pageObjects/HomePageLocator';

export class HomePage extends HomePageLocator {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async open() {
    this.loggerInfo(`[PAGE] HomePage: Navigating to ${this.url}`);
    await this.navigateTo(this.url);
    this.loggerInfo('[PAGE] HomePage: Navigation completed');
    await this.clickElement(this.continueShoppingButtonSelector);
    this.loggerInfo('[PAGE] HomePage: Clicked Continue shopping button if present');
  }

  async search(term: string) {
    this.loggerInfo(`[PAGE] HomePage: Searching for '${term}'`);
    await this.waitForSelectorAndSetText(this.searchInputSelector, term);
    await this.clickElement(this.searchButtonSelector);
    await this.waitforPageLoad();
    this.loggerInfo(`[PAGE] HomePage: Search completed for '${term}'`);
  }
}
