import { Page } from 'playwright';
import { CartPageLocator } from '../pageObjects/CartPageLocator';

export class CartPage extends CartPageLocator {
  readonly page: Page;
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async openCart() {
    this.loggerInfo('[PAGE] CartPage: Opening cart page');
    await this.navigateTo(this.cartPageURL);
    this.loggerInfo('[PAGE] CartPage: Cart page opened');
  }

  async itemCount(): Promise<number> {
    this.loggerInfo('[PAGE] CartPage: Getting item count from cart');
    // Amazon shows cart count in different places; try common ones
    const countEl = await this.getElement(this.navCartCountSelector);
    if (countEl) {
      const text = await countEl.innerText();
      const n = parseInt(text.trim()) || 0;
      this.loggerInfo(`[PAGE] CartPage: Item count from nav: ${n}`);
      return n;
    }
    // fallback: count items in cart page
    const items = await this.getElements(this.cartItemSelector);
    this.loggerInfo(`[PAGE] CartPage: Item count from page elements: ${items.length}`);
    return items.length;
  }
}
