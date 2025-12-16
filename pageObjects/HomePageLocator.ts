import { Page } from 'playwright';
import logger from '../utils/logger';

export class HomePageLocator {
  constructor(page: Page) { }
  readonly url: string = 'https://www.amazon.com';
  readonly searchInputSelector: string = 'input[id="twotabsearchtextbox"]';
  readonly searchButtonSelector: string = 'input[id="nav-search-submit-button"]';
  readonly continueShoppingButtonSelector: string = 'button[type="submit"]';
}
