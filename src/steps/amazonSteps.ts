import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
// Avoid importing the support world to prevent double-loading Cucumber.

Given('I open the Amazon home page', async function (this: any) {
  if (!this.page) throw new Error('Page not initialized');
  const home = new HomePage(this.page);
  await home.open();
});

When('I search for {string}', async function (this: any, searchTerm: string) {
  if (!this.page) throw new Error('Page not initialized');
  const home = new HomePage(this.page);
  await home.search(searchTerm);
});

When('I open the first search result', async function (this: any) {
  if (!this.page) throw new Error('Page not initialized');
  const results = new SearchResultsPage(this.page);
  await results.openFirstResult();
});

When('I add the product to the cart', async function (this: any) {
  if (!this.page) throw new Error('Page not initialized');
  const product = new ProductPage(this.page);
  await product.addToCart();
});

Then('the cart should contain at least {int} item', async function (this: any, count: number) {
  if (!this.page) throw new Error('Page not initialized');
  const cart = new CartPage(this.page);
  await cart.openCart();
  const items = await cart.itemCount();
  expect(items).to.be.at.least(count);
});
