import { Page } from 'playwright';

export class HomePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('https://www.amazon.com', { waitUntil: 'domcontentloaded' });
  }

  async search(term: string) {
    await this.page.fill('input[id="twotabsearchtextbox"]', term);
    await this.page.click('input[id="nav-search-submit-button"]');
    await this.page.waitForLoadState('domcontentloaded');
  }
}
