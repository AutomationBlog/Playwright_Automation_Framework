import { Page } from 'playwright';
import { HomePageLocator } from '../pageObjects/HomePage.Locators';
import { CommonPageMethods } from '../commonMethods/commonPageMethods';
import pageURLs from '../zExternal_Input_Files/page.URLs.json';

export class HomePage extends CommonPageMethods {
  readonly page: Page;
  readonly HomePageLocator: HomePageLocator = new HomePageLocator();
  readonly urls: typeof pageURLs = pageURLs;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async open() {
    this.loggerInfo(`[PAGE] HomePage: Navigating to ${this.urls.amazonHomePageURL}`);
    await this.navigateTo(this.urls.amazonHomePageURL);
    this.loggerInfo('[PAGE] HomePage: Navigation completed');
    await this.clickElement(this.HomePageLocator.continueShoppingButtonSelector);
    this.loggerInfo('[PAGE] HomePage: Clicked Continue shopping button if present');
  }

  async search(term: string) {
    this.loggerInfo(`[PAGE] HomePage: Searching for '${term}'`);
    await this.waitForSelectorAndSetText(this.HomePageLocator.searchInputSelector, term);
    await this.clickElement(this.HomePageLocator.searchButtonSelector);
    await this.waitforPageLoad();
    this.loggerInfo(`[PAGE] HomePage: Search completed for '${term}'`);
  }
}
