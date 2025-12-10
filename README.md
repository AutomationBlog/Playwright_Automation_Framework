# Playwright Automation Framework

A comprehensive E2E automation framework built with **Playwright**, **TypeScript**, **Page Object Model (POM)**, **Cucumber BDD**, with extended HTML reporting, logging, and screenshot capabilities.

## Features

✅ **Playwright & TypeScript** - Modern web automation with type safety  
✅ **Page Object Model (POM)** - Scalable and maintainable test architecture  
✅ **Cucumber BDD** - Behavior-Driven Development with feature files  
✅ **Extended HTML Reports** - Beautiful, interactive test reports  
✅ **Logging System** - Comprehensive logging with file persistence  
✅ **Screenshot Capture** - Automatic screenshots on actions and failures  
✅ **Base Classes** - Reusable base page and test classes  
✅ **Configuration Management** - Centralized configuration  
✅ **Test Data Management** - Data-driven testing utilities  

## Project Structure

```
playwright-automation-framework/
├── src/
│   ├── base/
│   │   ├── basePage.ts          # Base page class with common methods
│   │   ├── baseTest.ts          # Base test class
│   │   ├── logger.ts            # Logging utility
│   │   └── screenshot.ts        # Screenshot utility
│   ├── pages/
│   │   ├── irctcLoginPage.ts    # IRCTC Login page object
│   │   └── irctcBookingPage.ts  # IRCTC Booking page object
│   ├── config/
│   │   └── config.ts            # Configuration settings
│   └── utils/
│       ├── htmlReporter.ts      # Custom HTML reporter
│       ├── fileUtil.ts          # File operations utility
│       └── testDataUtil.ts      # Test data management
├── features/
│   ├── irctc.feature            # Cucumber feature file
│   └── step_definitions/
│       └── irctcSteps.ts        # Step definitions
├── tests/
│   └── irctc.spec.ts            # Playwright test file
├── scripts/
│   └── generateReport.js        # Report generation script
├── reports/                      # Generated test reports
├── screenshots/                  # Captured screenshots
├── logs/                         # Test logs
├── playwright.config.ts          # Playwright configuration
├── cucumber.js                   # Cucumber configuration
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Clone or navigate to the project directory**
```bash
cd d:\Automation\Playwright_Automation_Framework
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Configure environment variables**
```bash
# Copy the example .env file
copy .env.example .env

# Edit .env and add your credentials
# IRCTC_USERNAME=your_username
# IRCTC_PASSWORD=your_password
# HEADLESS=false
# BROWSER=chromium
```

## Usage

### Run Playwright Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View HTML report
npm run test:report
```

### Run Cucumber Tests

```bash
# Run all cucumber scenarios
npm run cucumber

# Run specific feature file
npm run cucumber:irctc

# Generate cucumber HTML report
npm run cucumber:report
```

### Generate Reports

```bash
# Generate extended HTML report
node scripts/generateReport.js
```

## Page Object Model (POM)

### Creating a New Page Object

```typescript
import { Page } from '@playwright/test';
import { BasePage } from '../base/basePage';

export class MyPage extends BasePage {
  // Define selectors
  private readonly myElement = '#my-element';

  constructor(page: Page) {
    super(page);
  }

  // Define page methods
  async performAction(): Promise<void> {
    await this.click(this.myElement);
  }
}
```

### Using Page Objects in Tests

```typescript
import { test } from '@playwright/test';
import { MyPage } from '../src/pages/myPage';

test('My test', async ({ page }) => {
  const myPage = new MyPage(page);
  await myPage.performAction();
});
```

## Base Page Methods

The `BasePage` class provides common methods:

- `goto(url)` - Navigate to URL
- `click(selector)` - Click element
- `fillText(selector, text)` - Fill text input
- `getText(selector)` - Get element text
- `waitForElement(selector)` - Wait for element
- `isElementVisible(selector)` - Check visibility
- `takeScreenshot(name)` - Take screenshot
- `verifyElementText(selector, text)` - Verify text
- `selectDropdownOption(selector, value)` - Select dropdown
- `hover(selector)` - Hover element
- `scrollToElement(selector)` - Scroll to element
- And many more...

## Logging

The framework includes a comprehensive logging system:

```typescript
const logger = new Logger();

logger.info('Information message');
logger.warn('Warning message');
logger.error('Error message');
logger.debug('Debug message');

// Get all logs
const allLogs = logger.getAllLogs();

// Get log file path
const logPath = logger.getLogFilePath();
```

## Screenshots

Automatic screenshot capture:

```typescript
const screenshot = new ScreenshotUtil(page, logger);

// Capture screenshot
await screenshot.captureScreenshot('screenshot-name');

// Capture failure screenshot
await screenshot.captureFailureScreenshot('test-name');

// Get screenshot directory
const dir = screenshot.getScreenshotDir();
```

## HTML Reporting

Generate beautiful HTML reports:

```typescript
const reporter = new HTMLReporter('./reports', './screenshots');

// Add test result
reporter.addTestResult({
  testName: 'Test Name',
  status: 'PASSED',
  duration: 5000,
  screenshots: ['screenshot.png'],
  logs: logger.getAllLogs()
});

// Generate report
const reportPath = reporter.generateReport();
```

## Cucumber BDD

### Feature File Example

```gherkin
Feature: IRCTC Railway Ticket Booking
  As a user
  I want to book a train ticket on IRCTC
  So that I can travel by train

  Scenario: Book a train ticket
    Given User is logged in to IRCTC
    And User is on booking page
    When User searches for trains from "Delhi" to "Mumbai" on "10-12-2025" in "AC First Class"
    And User selects the first available train
    Then User should see payment confirmation
```

### Step Definitions

Step definitions are in `features/step_definitions/irctcSteps.ts`

```typescript
Given('User is on IRCTC login page', async function () {
  // Step implementation
});

When('User enters valid credentials', async function () {
  // Step implementation
});

Then('User should be logged in successfully', async function () {
  // Step implementation
});
```

## Configuration

Edit `src/config/config.ts` to customize:

```typescript
export class Config {
  static readonly IRCTC_BASE_URL = 'https://www.irctc.co.in/nget/booking/';
  static readonly DEFAULT_TIMEOUT = 30000;
  static readonly HEADLESS = false;
  static readonly VIEWPORT_WIDTH = 1920;
  static readonly VIEWPORT_HEIGHT = 1080;
  // And more...
}
```

## IRCTC Booking Automation

The framework includes complete automation for IRCTC ticket booking:

### Login to IRCTC

```typescript
const loginPage = new IRCTCLoginPage(page);
await loginPage.navigateToLogin();
await loginPage.login('username', 'password');
```

### Search and Book Trains

```typescript
const bookingPage = new IRCTCBookingPage(page);
await bookingPage.navigateToBooking();
await bookingPage.enterFromStation('Delhi');
await bookingPage.enterToStation('Mumbai');
await bookingPage.selectDate('15-12-2025');
await bookingPage.selectClass('AC First Class');
await bookingPage.searchTrains();
await bookingPage.selectFirstTrain();
```

### Add Passenger Details

```typescript
await bookingPage.addPassengerDetails(
  'John Doe',        // Name
  '30',              // Age
  'Male',            // Gender
  'Lower'            // Berth preference
);
```

### Proceed to Payment

```typescript
await bookingPage.proceedToPayment();
const status = await bookingPage.getPaymentStatus();
```

## Environment Variables

Create a `.env` file:

```env
# IRCTC Credentials
IRCTC_USERNAME=your_username
IRCTC_PASSWORD=your_password

# Browser Settings
HEADLESS=false
BROWSER=chromium
SLOW_MO=0

# Test Configuration
CI=false
```

## Troubleshooting

### Tests not finding elements
- Verify selectors in page objects
- Check browser headless mode
- Increase timeout values
- Check for dynamic content/JavaScript

### Screenshots not saving
- Ensure `screenshots/` directory exists
- Check file system permissions
- Verify screenshot path configuration

### Logs not appearing
- Check `logs/` directory
- Verify logger initialization
- Check log file permissions

## Best Practices

✅ **Use Page Object Model** - Keep tests clean and maintainable  
✅ **Implement Waits** - Use explicit waits instead of sleep  
✅ **Capture Screenshots** - Attach screenshots to reports  
✅ **Use Logging** - Log all important actions  
✅ **Data-Driven Tests** - Use test data utilities  
✅ **Reusable Code** - Extend base classes  
✅ **Clear Selectors** - Use descriptive selector names  
✅ **Error Handling** - Implement proper error handling  

## Contributing

1. Create new page objects in `src/pages/`
2. Implement tests in `tests/` or features in `features/`
3. Update configuration as needed
4. Follow the existing code structure

## Support

For issues or questions:
1. Check the logs in `logs/` directory
2. Review screenshots in `screenshots/` directory
3. Check the HTML report in `reports/` directory
4. Refer to Playwright documentation: https://playwright.dev/
5. Refer to Cucumber documentation: https://cucumber.io/

## License

ISC

---

**Playwright Automation Framework** - Made with ❤️ for automation testing
