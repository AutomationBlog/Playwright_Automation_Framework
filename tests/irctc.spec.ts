import { test, expect, Page } from '@playwright/test';
import { IRCTCLoginPage } from '../src/pages/irctcLoginPage';
import { IRCTCBookingPage } from '../src/pages/irctcBookingPage';
import { Logger } from '../src/base/logger';
import { ScreenshotUtil } from '../src/base/screenshot';
import { HTMLReporter } from '../src/utils/htmlReporter';

let logger: Logger;
let screenshotUtil: ScreenshotUtil;
let htmlReporter: HTMLReporter;

test.describe('IRCTC Railway Ticket Booking', () => {
  test.beforeEach(async ({ page }) => {
    logger = new Logger();
    screenshotUtil = new ScreenshotUtil(page, logger);
    htmlReporter = new HTMLReporter('./reports', './screenshots');
  });

  test('Test 1: Verify IRCTC Login Page Loads', async ({ page }) => {
    const startTime = Date.now();
    try {
      logger.info('Starting test: Verify IRCTC Login Page Loads');
      
      const loginPage = new IRCTCLoginPage(page);
      await loginPage.navigateToLogin();
      
      const isLoaded = await loginPage.verifyLoginPageLoaded();
      expect(isLoaded).toBe(true);
      
      await screenshotUtil.captureScreenshot('login-page-loaded');
      
      const duration = Date.now() - startTime;
      htmlReporter.addTestResult({
        testName: 'Verify IRCTC Login Page Loads',
        status: 'PASSED',
        duration: duration,
        screenshots: ['login-page-loaded.png'],
        logs: logger.getAllLogs()
      });

      logger.info('Test PASSED: IRCTC Login Page Loads');
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      await screenshotUtil.captureFailureScreenshot('login-page-error');
      
      htmlReporter.addTestResult({
        testName: 'Verify IRCTC Login Page Loads',
        status: 'FAILED',
        duration: duration,
        screenshots: ['login-page-error.png'],
        logs: logger.getAllLogs(),
        error: errorMsg
      });

      logger.error(`Test FAILED: ${errorMsg}`);
      throw error;
    }
  });

  test('Test 2: Verify Booking Page Structure', async ({ page }) => {
    const startTime = Date.now();
    try {
      logger.info('Starting test: Verify Booking Page Structure');
      
      const bookingPage = new IRCTCBookingPage(page);
      await bookingPage.navigateToBooking();
      
      const isLoaded = await bookingPage.verifyBookingPageLoaded();
      expect(isLoaded).toBe(true);
      
      await screenshotUtil.captureScreenshot('booking-page-loaded');
      
      const duration = Date.now() - startTime;
      htmlReporter.addTestResult({
        testName: 'Verify Booking Page Structure',
        status: 'PASSED',
        duration: duration,
        screenshots: ['booking-page-loaded.png'],
        logs: logger.getAllLogs()
      });

      logger.info('Test PASSED: Booking Page Structure');
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      await screenshotUtil.captureFailureScreenshot('booking-page-error');
      
      htmlReporter.addTestResult({
        testName: 'Verify Booking Page Structure',
        status: 'FAILED',
        duration: duration,
        screenshots: ['booking-page-error.png'],
        logs: logger.getAllLogs(),
        error: errorMsg
      });

      logger.error(`Test FAILED: ${errorMsg}`);
      throw error;
    }
  });

  test('Test 3: Test Train Search Functionality', async ({ page }) => {
    const startTime = Date.now();
    try {
      logger.info('Starting test: Test Train Search Functionality');
      
      const bookingPage = new IRCTCBookingPage(page);
      await bookingPage.navigateToBooking();
      await bookingPage.verifyBookingPageLoaded();
      
      await bookingPage.enterFromStation('Delhi');
      await bookingPage.enterToStation('Mumbai');
      await bookingPage.selectDate('15-12-2025');
      await bookingPage.selectClass('AC First Class');
      
      // Take screenshot before search
      await screenshotUtil.captureScreenshot('before-train-search');
      
      await bookingPage.searchTrains();
      
      // Take screenshot after search
      await screenshotUtil.captureScreenshot('train-search-results');
      
      const duration = Date.now() - startTime;
      htmlReporter.addTestResult({
        testName: 'Test Train Search Functionality',
        status: 'PASSED',
        duration: duration,
        screenshots: ['before-train-search.png', 'train-search-results.png'],
        logs: logger.getAllLogs()
      });

      logger.info('Test PASSED: Train Search Functionality');
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      await screenshotUtil.captureFailureScreenshot('train-search-error');
      
      htmlReporter.addTestResult({
        testName: 'Test Train Search Functionality',
        status: 'FAILED',
        duration: duration,
        screenshots: ['train-search-error.png'],
        logs: logger.getAllLogs(),
        error: errorMsg
      });

      logger.error(`Test FAILED: ${errorMsg}`);
      throw error;
    }
  });

  test.afterEach(async ({ page }) => {
    // Generate and save report
    try {
      htmlReporter.generateReport();
      logger.info('HTML Report generated successfully');
    } catch (error) {
      logger.error(`Failed to generate HTML report: ${error}`);
    }
  });
});
