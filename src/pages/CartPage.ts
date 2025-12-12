import { Page } from 'playwright';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async openCart() {
    await this.page.goto('https://www.amazon.com/gp/cart/view.html', { waitUntil: 'domcontentloaded' });
  }

  async itemCount(): Promise<number> {
    // Amazon shows cart count in different places; try common ones
    const countEl = await this.page.$('#nav-cart-count');
    if (countEl) {
      const text = await countEl.innerText();
      const n = parseInt(text.trim()) || 0;
      return n;
    }
    // fallback: count items in cart page
    const items = await this.page.$$('div.sc-list-item');
    return items.length;
  }
}
