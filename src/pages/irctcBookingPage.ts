import { Page } from '@playwright/test';
import { BasePage } from '../base/basePage';

/**
 * IRCTC Booking Page Object
 */
export class IRCTCBookingPage extends BasePage {
  // Selectors for search form
  private readonly fromStationInput = 'input[id="origin"]';
  private readonly toStationInput = 'input[id="destination"]';
  private readonly dateInput = 'input[id="date"]';
  private readonly classDropdown = 'select[id="class"]';
  private readonly quotaDropdown = 'select[id="quota"]';
  private readonly searchButton = 'button[id="searchButton"]';
  
  // Selectors for train list
  private readonly trainListContainer = '.train-list-container';
  private readonly trainRows = '.train-row';
  private readonly bookButton = 'button[data-action="book"]';
  
  // Selectors for passenger details
  private readonly passengerNameInput = 'input[id="passengerName"]';
  private readonly passengerAgeInput = 'input[id="passengerAge"]';
  private readonly genderSelect = 'select[id="gender"]';
  private readonly berthPreference = 'select[id="berthPreference"]';
  
  // Selectors for payment
  private readonly proceedPaymentButton = 'button[id="proceedPayment"]';
  private readonly paymentStatus = '.payment-status';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to booking page
   */
  async navigateToBooking(): Promise<void> {
    await this.goto('https://www.irctc.co.in/nget/booking/');
    await this.waitForPageLoad();
    this.logger.info('Navigated to IRCTC booking page');
  }

  /**
   * Verify booking page is loaded
   */
  async verifyBookingPageLoaded(): Promise<boolean> {
    try {
      await this.waitForElement(this.fromStationInput);
      this.logger.info('Booking page loaded successfully');
      return true;
    } catch {
      this.logger.error('Booking page failed to load');
      return false;
    }
  }

  /**
   * Enter from station
   */
  async enterFromStation(station: string): Promise<void> {
    this.logger.info(`Entering from station: ${station}`);
    await this.fillText(this.fromStationInput, station);
    await this.waitForTime(500); // Wait for autocomplete
  }

  /**
   * Enter to station
   */
  async enterToStation(station: string): Promise<void> {
    this.logger.info(`Entering to station: ${station}`);
    await this.fillText(this.toStationInput, station);
    await this.waitForTime(500); // Wait for autocomplete
  }

  /**
   * Select date
   */
  async selectDate(date: string): Promise<void> {
    this.logger.info(`Selecting date: ${date}`);
    await this.fillText(this.dateInput, date);
  }

  /**
   * Select class
   */
  async selectClass(className: string): Promise<void> {
    this.logger.info(`Selecting class: ${className}`);
    await this.selectDropdownOption(this.classDropdown, className);
  }

  /**
   * Select quota
   */
  async selectQuota(quota: string): Promise<void> {
    this.logger.info(`Selecting quota: ${quota}`);
    await this.selectDropdownOption(this.quotaDropdown, quota);
  }

  /**
   * Search trains
   */
  async searchTrains(): Promise<void> {
    await this.takeScreenshot('before-search');
    this.logger.info('Clicking search button');
    await this.click(this.searchButton);
    await this.waitForPageLoad();
    await this.waitForElement(this.trainListContainer);
    await this.takeScreenshot('after-search');
  }

  /**
   * Get number of trains available
   */
  async getTrainCount(): Promise<number> {
    await this.waitForElement(this.trainRows);
    return await this.getElementCount(this.trainRows);
  }

  /**
   * Select first available train
   */
  async selectFirstTrain(): Promise<void> {
    this.logger.info('Selecting first available train');
    const trainCount = await this.getTrainCount();
    
    if (trainCount === 0) {
      throw new Error('No trains available');
    }
    
    const firstTrainSelector = `${this.trainRows}:first-child ${this.bookButton}`;
    await this.click(firstTrainSelector);
    await this.waitForPageLoad();
  }

  /**
   * Add passenger details
   */
  async addPassengerDetails(
    name: string,
    age: string,
    gender: string,
    berth: string
  ): Promise<void> {
    this.logger.info(`Adding passenger details: ${name}, Age: ${age}`);
    await this.fillText(this.passengerNameInput, name);
    await this.fillText(this.passengerAgeInput, age);
    await this.selectDropdownOption(this.genderSelect, gender);
    await this.selectDropdownOption(this.berthPreference, berth);
  }

  /**
   * Proceed to payment
   */
  async proceedToPayment(): Promise<void> {
    await this.takeScreenshot('before-payment');
    this.logger.info('Proceeding to payment');
    await this.click(this.proceedPaymentButton);
    await this.waitForPageLoad();
  }

  /**
   * Check payment status
   */
  async getPaymentStatus(): Promise<string> {
    return await this.getText(this.paymentStatus);
  }

  /**
   * Perform complete booking
   */
  async performCompleteBooking(
    fromStation: string,
    toStation: string,
    date: string,
    className: string,
    quota: string,
    passengerName: string,
    passengerAge: string,
    gender: string,
    berth: string
  ): Promise<void> {
    await this.navigateToBooking();
    await this.verifyBookingPageLoaded();
    await this.enterFromStation(fromStation);
    await this.enterToStation(toStation);
    await this.selectDate(date);
    await this.selectClass(className);
    await this.selectQuota(quota);
    await this.searchTrains();
    await this.selectFirstTrain();
    await this.addPassengerDetails(passengerName, passengerAge, gender, berth);
    await this.proceedToPayment();
  }
}
