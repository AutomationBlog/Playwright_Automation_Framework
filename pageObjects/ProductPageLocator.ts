import { Page } from 'playwright';
import logger from '../utils/logger';
import { CommonPageMethods } from '../commonMethods/commonPageMethods';

export class ProductPageLocator extends CommonPageMethods {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  readonly addToCartButtonSelector: string = '#add-to-cart-button , input[name="submit.addToCart"]';

}
