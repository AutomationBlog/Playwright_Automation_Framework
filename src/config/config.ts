/**
 * Configuration for the automation framework
 */
export class Config {
  // URLs
  static readonly IRCTC_BASE_URL = 'https://www.irctc.co.in/nget/booking/';
  static readonly IRCTC_LOGIN_URL = 'https://www.irctc.co.in/nget/login';
  
  // Timeouts
  static readonly DEFAULT_TIMEOUT = 30000;
  static readonly ELEMENT_WAIT_TIMEOUT = 10000;
  static readonly PAGE_LOAD_TIMEOUT = 60000;
  
  // Browser settings
  static readonly HEADLESS = process.env.HEADLESS === 'true' ? true : false;
  static readonly SLOW_MO = parseInt(process.env.SLOW_MO || '0');
  static readonly VIEWPORT_WIDTH = 1920;
  static readonly VIEWPORT_HEIGHT = 1080;
  
  // Test data
  static readonly TEST_DATA_DIR = './test-data';
  static readonly REPORTS_DIR = './reports';
  static readonly SCREENSHOTS_DIR = './screenshots';
  static readonly LOGS_DIR = './logs';
  
  // Retry configuration
  static readonly RETRY_COUNT = 2;
  static readonly RETRY_INTERVAL = 1000;
  
  // Browser type
  static readonly BROWSER_TYPE = process.env.BROWSER || 'chromium';
  
  /**
   * Get environment variables
   */
  static getEnvVariable(key: string, defaultValue: string = ''): string {
    return process.env[key] || defaultValue;
  }
}
