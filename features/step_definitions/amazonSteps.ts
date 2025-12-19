import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import logger from '../../utils/logger';
import { HomePage} from '../../pages/HomePage.Methods';
import { SearchResultsPage } from '../../pages/SearchResultsPage.Methods';
import { ProductPage } from '../../pages/ProductPage.Methods';
import { CartPage } from '../../pages/CartPage.Methods';

// Avoid importing the support world to prevent double-loading Cucumber.
// The 'this' context in step definitions will have the CustomWorld type.
Given('I open the Amazon home page', async function (this: any) {
  logger.info('[GIVEN] Opening Amazon home page');
  if (!this.page) throw new Error('Page not initialized');
  const home = new HomePage(this.page);
  await home.open();
  logger.info('[GIVEN] Amazon home page opened successfully');
  try { await this.attach('[LOG] Given: Amazon home page opened successfully', 'text/plain'); } catch (_) {}
});

When('I search for {string}', async function (this: any, searchTerm: string) {
  logger.info(`[WHEN] Searching for: ${searchTerm}`);
  if (!this.page) throw new Error('Page not initialized');
  const home = new HomePage(this.page);
  await home.search(searchTerm);
  logger.info(`[WHEN] Search for '${searchTerm}' completed`);
  try { await this.attach(`[LOG] When: searched for ${searchTerm}`, 'text/plain'); } catch (_) {}
});

Then('I open the first search result', async function (this: any) {
  logger.info('[WHEN] Opening first search result');
  if (!this.page) throw new Error('Page not initialized');
  const results = new SearchResultsPage(this.page);
  await results.openFirstResult();
  logger.info('[WHEN] First search result opened successfully');
  try { await this.attach('[LOG] When: opened first search result', 'text/plain'); } catch (_) {}
});

Then('I add the product to the cart', async function (this: any) {
  logger.info('[WHEN] Adding product to cart');
  if (!this.page) throw new Error('Page not initialized');
  const product = new ProductPage(this.page);
  await product.addToCart();
  logger.info('[WHEN] Product added to cart successfully');
  try { await this.attach('[LOG] When: product added to cart', 'text/plain'); } catch (_) {}
});

Then('the cart should contain at least {int} item', async function (this: any, count: number) {
  logger.info(`[THEN] Verifying cart contains at least ${count} item(s)`);
  if (!this.page) throw new Error('Page not initialized');
  const cart = new CartPage(this.page);
  await cart.openCart();
  const items = await cart.itemCount();
  logger.info(`[THEN] Cart contains ${items} item(s)`);
  expect(items).to.be.at.least(count);
  logger.info(`[THEN] Assertion passed: cart has ${items} items (expected >= ${count})`);
  try { await this.attach(`[LOG] Then: cart has ${items} items (expected >= ${count})`, 'text/plain'); } catch (_) {}
});
