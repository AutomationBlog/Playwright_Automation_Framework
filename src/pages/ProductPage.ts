import { Page } from 'playwright';

export class ProductPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async addToCart() {
    // Try common Amazon add-to-cart selectors
    const selectors = ['#add-to-cart-button', 'input[name="submit.addToCart"]'];
    for (const sel of selectors) {
      const el = await this.page.$(sel);
      if (el) {
        await el.click();
        await this.page.waitForLoadState('domcontentloaded');
        return;
      }
    }
    throw new Error('Add to cart button not found');
  }
}
