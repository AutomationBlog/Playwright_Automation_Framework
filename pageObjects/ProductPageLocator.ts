import { Page } from 'playwright';
import logger from '../utils/logger';

export class ProductPageLocator{
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  readonly addToCartButtonSelector: string = '#add-to-cart-button , input[name="submit.addToCart"]';

}
