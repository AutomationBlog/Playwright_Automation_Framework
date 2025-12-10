import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { IRCTCLoginPage } from '../src/pages/irctcLoginPage';
import { IRCTCBookingPage } from '../src/pages/irctcBookingPage';
import { Logger } from '../src/base/logger';
import { ScreenshotUtil } from '../src/base/screenshot';
import { HTMLReporter } from '../src/utils/htmlReporter';
import { TestDataUtil } from '../src/utils/testDataUtil';

/**
 * IRCTC Ticket Booking Automation Script
 * This script demonstrates how to use the automation framework
 * to book a train ticket on IRCTC
 */
class IRCTCAutomation {
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;
  private logger: Logger;
  private screenshotUtil: ScreenshotUtil | null = null;
  private htmlReporter: HTMLReporter;
  private testDataUtil: TestDataUtil;

  constructor() {
    this.logger = new Logger();
    this.htmlReporter = new HTMLReporter('./reports', './screenshots');
    this.testDataUtil = new TestDataUtil('./test-data');
  }

  /**
   * Setup browser and page
   */
  async setup(): Promise<void> {
    this.logger.info('Setting up browser...');
    
    const headless = process.env.HEADLESS === 'true';
    this.browser = await chromium.launch({ headless });
    
    this.context = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true,
    });

    this.page = await this.context.newPage();
    this.screenshotUtil = new ScreenshotUtil(this.page, this.logger);
    
    this.logger.info('Browser setup completed');
  }

  /**
   * Cleanup browser
   */
  async teardown(): Promise<void> {
    this.logger.info('Cleaning up...');
    
    if (this.page) {
      await this.page.close();
    }
    
    if (this.context) {
      await this.context.close();
    }
    
    if (this.browser) {
      await this.browser.close();
    }
    
    this.logger.info('Cleanup completed');
  }

  /**
   * Login to IRCTC
   */
  async loginToIRCTC(username: string, password: string): Promise<void> {
    try {
      this.logger.info('Starting IRCTC login...');
      
      if (!this.page) {
        throw new Error('Page not initialized');
      }

      const loginPage = new IRCTCLoginPage(this.page);
      await loginPage.navigateToLogin();
      
      const isLoaded = await loginPage.verifyLoginPageLoaded();
      if (!isLoaded) {
        throw new Error('Login page failed to load');
      }

      await this.screenshotUtil?.captureScreenshot('01-login-page');
      
      await loginPage.login(username, password);
      
      // Wait for redirect to dashboard
      await this.page.waitForURL('**/booking/**', { timeout: 30000 });
      
      await this.screenshotUtil?.captureScreenshot('02-login-success');
      
      this.logger.info('IRCTC login successful');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Login failed: ${errorMsg}`);
      await this.screenshotUtil?.captureFailureScreenshot('login-failure');
      throw error;
    }
  }

  /**
   * Search trains
   */
  async searchTrains(
    fromStation: string,
    toStation: string,
    date: string,
    className: string
  ): Promise<void> {
    try {
      this.logger.info(`Searching trains from ${fromStation} to ${toStation}`);
      
      if (!this.page) {
        throw new Error('Page not initialized');
      }

      const bookingPage = new IRCTCBookingPage(this.page);
      
      const isLoaded = await bookingPage.verifyBookingPageLoaded();
      if (!isLoaded) {
        await bookingPage.navigateToBooking();
      }

      await this.screenshotUtil?.captureScreenshot('03-before-search');
      
      await bookingPage.enterFromStation(fromStation);
      await bookingPage.enterToStation(toStation);
      await bookingPage.selectDate(date);
      await bookingPage.selectClass(className);
      
      await this.screenshotUtil?.captureScreenshot('04-search-form-filled');
      
      await bookingPage.searchTrains();
      
      const trainCount = await bookingPage.getTrainCount();
      this.logger.info(`Found ${trainCount} trains`);
      
      await this.screenshotUtil?.captureScreenshot('05-search-results');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Train search failed: ${errorMsg}`);
      await this.screenshotUtil?.captureFailureScreenshot('search-failure');
      throw error;
    }
  }

  /**
   * Book train and add passenger details
   */
  async bookTrainAndAddPassenger(
    passengerName: string,
    passengerAge: string,
    gender: string,
    berthPreference: string
  ): Promise<void> {
    try {
      this.logger.info(`Booking train for passenger: ${passengerName}`);
      
      if (!this.page) {
        throw new Error('Page not initialized');
      }

      const bookingPage = new IRCTCBookingPage(this.page);
      
      await bookingPage.selectFirstTrain();
      await this.screenshotUtil?.captureScreenshot('06-train-selected');
      
      await bookingPage.addPassengerDetails(
        passengerName,
        passengerAge,
        gender,
        berthPreference
      );
      
      await this.screenshotUtil?.captureScreenshot('07-passenger-details-added');
      
      this.logger.info('Passenger details added successfully');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Booking failed: ${errorMsg}`);
      await this.screenshotUtil?.captureFailureScreenshot('booking-failure');
      throw error;
    }
  }

  /**
   * Proceed to payment
   */
  async proceedToPayment(): Promise<void> {
    try {
      this.logger.info('Proceeding to payment...');
      
      if (!this.page) {
        throw new Error('Page not initialized');
      }

      const bookingPage = new IRCTCBookingPage(this.page);
      await bookingPage.proceedToPayment();
      
      await this.screenshotUtil?.captureScreenshot('08-payment-page');
      
      this.logger.info('Navigated to payment page');
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`Payment navigation failed: ${errorMsg}`);
      await this.screenshotUtil?.captureFailureScreenshot('payment-failure');
      throw error;
    }
  }

  /**
   * Complete booking workflow
   */
  async completeBookingWorkflow(): Promise<void> {
    const startTime = Date.now();
    
    try {
      // Setup browser
      await this.setup();

      // Get test data
      const testData = this.testDataUtil.generateIRCTCTestData();
      const user = testData.users[0];
      const booking = testData.bookingData[0];
      const passenger = booking.passengers[0];

      // Execute booking workflow
      await this.loginToIRCTC(user.username, user.password);
      await this.searchTrains(
        booking.fromStation,
        booking.toStation,
        booking.date,
        booking.class
      );
      await this.bookTrainAndAddPassenger(
        passenger.name,
        passenger.age,
        passenger.gender,
        passenger.berthPreference
      );
      await this.proceedToPayment();

      const duration = Date.now() - startTime;

      // Record successful result
      this.htmlReporter.addTestResult({
        testName: 'IRCTC Ticket Booking Workflow',
        status: 'PASSED',
        duration: duration,
        screenshots: [
          '01-login-page.png',
          '02-login-success.png',
          '03-before-search.png',
          '04-search-form-filled.png',
          '05-search-results.png',
          '06-train-selected.png',
          '07-passenger-details-added.png',
          '08-payment-page.png'
        ],
        logs: this.logger.getAllLogs()
      });

      this.logger.info('✅ Booking workflow completed successfully');
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMsg = error instanceof Error ? error.message : String(error);

      // Record failed result
      this.htmlReporter.addTestResult({
        testName: 'IRCTC Ticket Booking Workflow',
        status: 'FAILED',
        duration: duration,
        logs: this.logger.getAllLogs(),
        error: errorMsg
      });

      this.logger.error(`❌ Booking workflow failed: ${errorMsg}`);
      throw error;
    } finally {
      // Generate HTML report
      try {
        const reportPath = this.htmlReporter.generateReport();
        this.logger.info(`📊 Report generated: ${reportPath}`);
      } catch (reportError) {
        this.logger.error(`Failed to generate report: ${reportError}`);
      }

      // Cleanup
      await this.teardown();
    }
  }
}

/**
 * Main execution
 */
async function main() {
  const automation = new IRCTCAutomation();
  
  try {
    await automation.completeBookingWorkflow();
    console.log('✅ IRCTC Booking Automation Completed Successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ IRCTC Booking Automation Failed:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

export { IRCTCAutomation };
