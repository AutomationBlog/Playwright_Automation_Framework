import { Page } from 'playwright';
import logger from '../utils/logger';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openCart() {
    logger.info('[PAGE] CartPage: Opening cart page');
    await this.page.goto('https://www.amazon.com/gp/cart/view.html', { waitUntil: 'domcontentloaded' });
    logger.info('[PAGE] CartPage: Cart page opened');
  }

  async itemCount(): Promise<number> {
    logger.info('[PAGE] CartPage: Getting item count from cart');
    // Amazon shows cart count in different places; try common ones
    const countEl = await this.page.$('#nav-cart-count');
    if (countEl) {
      const text = await countEl.innerText();
      const n = parseInt(text.trim()) || 0;
      logger.info(`[PAGE] CartPage: Item count from nav: ${n}`);
      return n;
    }
    // fallback: count items in cart page
    const items = await this.page.$$('div.sc-list-item');
    logger.info(`[PAGE] CartPage: Item count from page elements: ${items.length}`);
    return items.length;
  }
}
