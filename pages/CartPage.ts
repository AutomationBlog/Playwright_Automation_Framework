import { Page } from 'playwright';
import logger from '../utils/logger';
import { CartPageLocator } from '../pageObjects/CartPageLocator';

export class CartPage extends CartPageLocator {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async openCart() {
    logger.info('[PAGE] CartPage: Opening cart page');
    await this.page.goto(this.cartPageURL, { waitUntil: 'domcontentloaded' });
    logger.info('[PAGE] CartPage: Cart page opened');
  }

  async itemCount(): Promise<number> {
    logger.info('[PAGE] CartPage: Getting item count from cart');
    // Amazon shows cart count in different places; try common ones
    const countEl = await this.page.$(this.navCartCountSelector);
    if (countEl) {
      const text = await countEl.innerText();
      const n = parseInt(text.trim()) || 0;
      logger.info(`[PAGE] CartPage: Item count from nav: ${n}`);
      return n;
    }
    // fallback: count items in cart page
    const items = await this.page.$$(this.cartItemSelector);
    logger.info(`[PAGE] CartPage: Item count from page elements: ${items.length}`);
    return items.length;
  }
}
