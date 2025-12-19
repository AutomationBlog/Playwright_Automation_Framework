import { Page } from 'playwright';
import { CommonPageMethods } from '../commonMethods/commonPageMethods';

export class HomePageLocator extends CommonPageMethods {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  
  readonly url: string = 'https://www.amazon.com';
  readonly searchInputSelector: string = 'input[id="twotabsearchtextbox"]';
  readonly searchButtonSelector: string = 'input[id="nav-search-submit-button"]';
  readonly continueShoppingButtonSelector: string = 'button[type="submit"]';
}
