import { Page } from 'playwright';
import logger from '../utils/logger';

export class CartPageLocator {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  readonly cartPageURL: string = 'https://www.amazon.com/gp/cart/view.html';
  readonly navCartCountSelector: string = '#nav-cart-count';
  readonly cartItemSelector: string = 'div.sc-list-item';

}
