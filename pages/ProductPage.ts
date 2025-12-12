import { Page } from 'playwright';
import logger from '../utils/logger';

export class ProductPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    logger.info('[PAGE] ProductPage: Attempting to add product to cart');
    // Try common Amazon add-to-cart selectors
    const selectors = ['#add-to-cart-button', 'input[name="submit.addToCart"]'];
    for (const sel of selectors) {
      const el = await this.page.$(sel);
      if (el) {
        logger.info(`[PAGE] ProductPage: Found add-to-cart button with selector: ${sel}`);
        await el.click();
        await this.page.waitForLoadState('domcontentloaded');
        logger.info('[PAGE] ProductPage: Product added to cart successfully');
        return;
      }
    }
    logger.error('[PAGE] ProductPage: Add to cart button not found');
    throw new Error('Add to cart button not found');
  }
}
