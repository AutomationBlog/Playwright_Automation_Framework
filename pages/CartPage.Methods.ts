import { Page } from 'playwright';
import { CartPageLocator } from '../pageObjects/CartPage.Locators';
import pageURLs from '../zExternal_Input_Files/page.URLs.json';
import { CommonPageMethods } from '../commonMethods/commonPageMethods';

export class CartPage extends CommonPageMethods {
  readonly page: Page;
  readonly pageURLs: typeof pageURLs = pageURLs;
  readonly CartPageLocator: CartPageLocator = new CartPageLocator();
  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async openCart() {
    this.loggerInfo('[PAGE] CartPage: Opening cart page');
    await this.navigateTo(this.pageURLs.amazonCartPageURL);
    this.loggerInfo('[PAGE] CartPage: Cart page opened');
  }

  async itemCount(): Promise<number> {
    this.loggerInfo('[PAGE] CartPage: Getting item count from cart');
    // Amazon shows cart count in different places; try common ones
    const countEl = await this.getElement(this.CartPageLocator.navCartCountSelector);
    if (countEl) {
      const text = await countEl.innerText();
      const n = parseInt(text.trim()) || 0;
      this.loggerInfo(`[PAGE] CartPage: Item count from nav: ${n}`);
      return n;
    }
    // fallback: count items in cart page
    const items = await this.getElements(this.CartPageLocator.cartItemSelector);
    this.loggerInfo(`[PAGE] CartPage: Item count from page elements: ${items.length}`);
    return items.length;
  }
}
