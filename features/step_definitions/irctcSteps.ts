import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { IRCTCLoginPage } from '../../src/pages/irctcLoginPage';
import { IRCTCBookingPage } from '../../src/pages/irctcBookingPage';
import { Logger } from '../../src/base/logger';
import { ScreenshotUtil } from '../../src/base/screenshot';

// Increase timeout for Cucumber steps
setDefaultTimeout(120000);

// Test data context
interface TestContext {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  logger?: Logger;
  screenshot?: ScreenshotUtil;
  loginPage?: IRCTCLoginPage;
  bookingPage?: IRCTCBookingPage;
  [key: string]: any;
}

let context: TestContext = {};

/**
 * Before hook - Initialize browser and page
 */
Before(async function () {
  context.logger = new Logger();
  context.logger.info('Starting test scenario');
  
  context.browser = await chromium.launch({ headless: false });
  context.context = await context.browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  context.page = await context.context.newPage();
  context.screenshot = new ScreenshotUtil(context.page, context.logger);
  
  context.loginPage = new IRCTCLoginPage(context.page);
  context.bookingPage = new IRCTCBookingPage(context.page);
});

/**
 * After hook - Close browser
 */
After(async function () {
  context.logger?.info('Closing test scenario');
  
  if (context.page) {
    await context.page.close();
  }
  
  if (context.context) {
    await context.context.close();
  }
  
  if (context.browser) {
    await context.browser.close();
  }
});

// ==================== LOGIN STEPS ====================

/**
 * Given: User is on IRCTC login page
 */
Given('User is on IRCTC login page', async function () {
  context.logger?.info('Step: User is on IRCTC login page');
  await context.loginPage?.navigateToLogin();
  const isLoaded = await context.loginPage?.verifyLoginPageLoaded();
  if (!isLoaded) {
    throw new Error('Login page did not load');
  }
});

/**
 * When: User enters valid credentials
 */
When('User enters valid credentials', async function () {
  context.logger?.info('Step: User enters valid credentials');
  // Use test credentials (replace with actual test account)
  const username = process.env.IRCTC_USERNAME || 'testuser@example.com';
  const password = process.env.IRCTC_PASSWORD || 'TestPassword123';
  
  await context.loginPage?.login(username, password);
});

/**
 * When: User enters invalid credentials
 */
When('User enters invalid credentials', async function () {
  context.logger?.info('Step: User enters invalid credentials');
  await context.loginPage?.login('invaliduser@example.com', 'wrongpassword');
});

/**
 * Then: User should be logged in successfully
 */
Then('User should be logged in successfully', async function () {
  context.logger?.info('Step: Verifying successful login');
  const currentUrl = await context.page?.url();
  
  if (currentUrl?.includes('booking')) {
    context.logger?.info('Login successful - navigated to booking page');
    await context.screenshot?.captureScreenshot('login-success');
  } else {
    throw new Error('Login failed - not redirected to booking page');
  }
});

/**
 * Then: User should see login error message
 */
Then('User should see login error message', async function () {
  context.logger?.info('Step: Verifying login error message');
  const hasError = await context.loginPage?.verifyLoginError();
  
  if (hasError) {
    const errorMsg = await context.loginPage?.getErrorMessage();
    context.logger?.info(`Error message: ${errorMsg}`);
    await context.screenshot?.captureScreenshot('login-error');
  } else {
    throw new Error('Expected error message not displayed');
  }
});

// ==================== BOOKING STEPS ====================

/**
 * Given: User is logged in to IRCTC
 */
Given('User is logged in to IRCTC', async function () {
  context.logger?.info('Step: User is logged in to IRCTC');
  await context.loginPage?.navigateToLogin();
  const username = process.env.IRCTC_USERNAME || 'testuser@example.com';
  const password = process.env.IRCTC_PASSWORD || 'TestPassword123';
  await context.loginPage?.login(username, password);
  
  // Wait for redirect to booking page
  await context.page?.waitForURL('**/booking/**', { timeout: 30000 });
  context.logger?.info('User successfully logged in');
});

/**
 * And: User is on booking page
 */
Given('User is on booking page', async function () {
  context.logger?.info('Step: User is on booking page');
  const isLoaded = await context.bookingPage?.verifyBookingPageLoaded();
  if (!isLoaded) {
    throw new Error('Booking page did not load');
  }
});

/**
 * When: User searches for trains
 */
When('User searches for trains from {string} to {string} on {string} in {string}', 
  async function (fromStation: string, toStation: string, date: string, className: string) {
    context.logger?.info(`Step: Searching trains from ${fromStation} to ${toStation}`);
    
    await context.bookingPage?.enterFromStation(fromStation);
    await context.bookingPage?.enterToStation(toStation);
    await context.bookingPage?.selectDate(date);
    await context.bookingPage?.selectClass(className);
    await context.bookingPage?.searchTrains();
  }
);

/**
 * And: User selects the first available train
 */
Then('User selects the first available train', async function () {
  context.logger?.info('Step: Selecting first available train');
  await context.bookingPage?.selectFirstTrain();
});

/**
 * And: User adds passenger details
 */
Then('User adds passenger details as {string}, age {string}, gender {string}, berth preference {string}',
  async function (name: string, age: string, gender: string, berth: string) {
    context.logger?.info(`Step: Adding passenger details - ${name}`);
    await context.bookingPage?.addPassengerDetails(name, age, gender, berth);
  }
);

/**
 * And: User proceeds to payment
 */
Then('User proceeds to payment', async function () {
  context.logger?.info('Step: Proceeding to payment');
  await context.bookingPage?.proceedToPayment();
});

/**
 * Then: User should see payment confirmation
 */
Then('User should see payment confirmation', async function () {
  context.logger?.info('Step: Verifying payment confirmation');
  const status = await context.bookingPage?.getPaymentStatus();
  
  if (status?.includes('success') || status?.includes('confirmation')) {
    context.logger?.info('Payment confirmation received');
    await context.screenshot?.captureScreenshot('payment-success');
  } else {
    throw new Error('Payment confirmation not received');
  }
});

/**
 * Then: User should see available trains in results
 */
Then('User should see available trains in the results', async function () {
  context.logger?.info('Step: Verifying available trains');
  const trainCount = await context.bookingPage?.getTrainCount();
  
  if (trainCount && trainCount > 0) {
    context.logger?.info(`Found ${trainCount} available trains`);
    await context.screenshot?.captureScreenshot('trains-available');
  } else {
    throw new Error('No trains found in results');
  }
});

// Export context for access in other modules if needed
export { context as TestContext };
