import { Page } from 'playwright';
import { ProductPageLocator } from '../pageObjects/ProductPageLocator';

export class ProductPage extends ProductPageLocator {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async addToCart() {
    this.loggerInfo('[PAGE] ProductPage: Attempting to add product to cart');
    // Try common Amazon add-to-cart selectors
    const selectors = [this.addToCartButtonSelector];
    for (const sel of selectors) {
      const el = await this.getElement(sel);
      if (el) {
        this.loggerInfo(`[PAGE] ProductPage: Found add-to-cart button with selector: ${sel}`);
        await el.click();
        await this.waitforPageLoad();
        this.loggerInfo('[PAGE] ProductPage: Product added to cart successfully');
        return;
      }
    }
    this.loggerError('[PAGE] ProductPage: Add to cart button not found');
    throw new Error('Add to cart button not found');
  }
}
