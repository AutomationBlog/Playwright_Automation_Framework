import { Page } from 'playwright';
import logger from '../utils/logger';
import { CommonPageMethods } from '../commonMethods/commonPageMethods';

export class CartPageLocator extends CommonPageMethods{
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  readonly cartPageURL: string = 'https://www.amazon.com/gp/cart/view.html';
  readonly navCartCountSelector: string = '#nav-cart-count';
  readonly cartItemSelector: string = 'div.sc-list-item';

}
