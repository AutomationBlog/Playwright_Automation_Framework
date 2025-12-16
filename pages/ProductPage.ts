import { Page } from 'playwright';
import logger from '../utils/logger';
import { ProductPageLocator } from '../pageObjects/ProductPageLocator';

export class ProductPage extends ProductPageLocator {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async addToCart() {
    logger.info('[PAGE] ProductPage: Attempting to add product to cart');
    // Try common Amazon add-to-cart selectors
    const selectors = [this.addToCartButtonSelector];
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
