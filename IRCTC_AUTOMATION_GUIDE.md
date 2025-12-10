# IRCTC Railway Ticket Booking Automation

This guide explains how to use the IRCTC ticket booking automation script.

## Overview

The IRCTC booking automation script demonstrates:
- Complete E2E automation of train ticket booking
- Integration with the POM framework
- Logging and screenshot capture
- HTML report generation
- Error handling and recovery

## Features

✅ **Login Automation** - Automatic login to IRCTC portal  
✅ **Train Search** - Search trains with multiple filters  
✅ **Train Selection** - Automatically select trains  
✅ **Passenger Details** - Add passenger information  
✅ **Payment Navigation** - Proceed to payment gateway  
✅ **Screenshots & Logs** - Capture every step  
✅ **HTML Reports** - Generate beautiful reports  

## Prerequisites

1. **Valid IRCTC Account**
   - Username (registered email or mobile)
   - Password

2. **Environment Variables**
   - Create `.env` file with credentials:
   ```env
   IRCTC_USERNAME=your_irctc_username
   IRCTC_PASSWORD=your_irctc_password
   HEADLESS=false
   BROWSER=chromium
   ```

3. **Node.js & Dependencies Installed**
   ```bash
   npm install
   npx playwright install
   ```

## Quick Start

### Option 1: Run IRCTC Booking Automation Script

```bash
# Using npm script
npm run irctc:book

# Or directly with ts-node
ts-node scripts/irctcBookingAutomation.ts
```

### Option 2: Run Playwright Tests

```bash
# Run IRCTC specific tests
npm run test:irctc

# Run all tests
npm test

# Run in headed mode (see browser)
npm run test:headed
```

### Option 3: Run Cucumber Scenarios

```bash
# Run all IRCTC cucumber scenarios
npm run cucumber:irctc

# Run all scenarios
npm run cucumber

# Generate cucumber report
npm run cucumber:report
```

## Script Workflow

The IRCTC automation script performs the following steps:

### 1. **Setup Phase**
   - Launches Chromium browser
   - Creates browser context with specific viewport
   - Initializes page and utilities

### 2. **Login Phase**
   ```
   Navigate to IRCTC Login
   ↓
   Enter Username
   ↓
   Enter Password
   ↓
   Click Login
   ↓
   Wait for Dashboard
   ```

### 3. **Search Phase**
   ```
   Navigate to Booking Page
   ↓
   Enter From Station (Delhi)
   ↓
   Enter To Station (Mumbai)
   ↓
   Select Date (15-12-2025)
   ↓
   Select Class (AC First Class)
   ↓
   Click Search
   ↓
   View Train Results
   ```

### 4. **Booking Phase**
   ```
   Select First Available Train
   ↓
   Enter Passenger Name
   ↓
   Enter Passenger Age
   ↓
   Select Gender
   ↓
   Select Berth Preference
   ↓
   Proceed to Payment
   ```

### 5. **Payment Phase**
   ```
   Navigate to Payment Gateway
   ↓
   Verify Payment Page
   ↓
   Capture Payment Screenshot
   ```

### 6. **Report Phase**
   ```
   Generate HTML Report
   ↓
   Include Screenshots
   ↓
   Attach Logs
   ↓
   Create Summary
   ```

## Customizing the Script

### Change Booking Details

Edit `src/utils/testDataUtil.ts`:

```typescript
generateIRCTCTestData(): any {
  return {
    bookingData: [
      {
        fromStation: 'Your From Station',
        toStation: 'Your To Station',
        date: this.getFutureDate(5),  // Days ahead
        class: 'Your Preferred Class',
        quota: 'General',
        passengers: [
          {
            name: 'Your Name',
            age: 'Your Age',
            gender: 'Your Gender',
            berthPreference: 'Your Preference'
          }
        ]
      }
    ]
  };
}
```

### Modify Script Flow

Edit `scripts/irctcBookingAutomation.ts`:

```typescript
async completeBookingWorkflow(): Promise<void> {
  // Add or modify steps here
  await this.setup();
  // Your custom steps
  await this.teardown();
}
```

### Change Browser Settings

In `playwright.config.ts` or through environment variables:

```env
HEADLESS=false        # Show browser window
BROWSER=firefox       # Use Firefox instead of Chrome
SLOW_MO=1000          # Slow down actions by 1 second
```

## Understanding the Output

### Screenshots Captured

| Step | Screenshot | Purpose |
|------|-----------|---------|
| 1 | `01-login-page.png` | Verify login page loaded |
| 2 | `02-login-success.png` | Confirm successful login |
| 3 | `03-before-search.png` | Show search form |
| 4 | `04-search-form-filled.png` | Verify form filled |
| 5 | `05-search-results.png` | Show train results |
| 6 | `06-train-selected.png` | Confirm train selected |
| 7 | `07-passenger-details-added.png` | Verify passenger info |
| 8 | `08-payment-page.png` | Show payment gateway |

### Log Entries

All logs are saved in `logs/` directory with timestamps:

```
[2025-12-10, 14:30:45] [INFO] Setting up browser...
[2025-12-10, 14:30:50] [INFO] Browser setup completed
[2025-12-10, 14:30:52] [INFO] Starting IRCTC login...
[2025-12-10, 14:30:55] [INFO] Filling text in selector: input[id="userid"] with value: testuser@example.com
...
```

### HTML Report

Generated in `reports/` directory with:
- Test summary (passed/failed/duration)
- Individual test results
- Screenshots
- Logs with color coding
- Success metrics

## Handling Common Issues

### Issue: Login Fails
**Solution:**
- Verify credentials in `.env` file
- Check if IRCTC website is accessible
- Ensure selectors are correct (check `src/pages/irctcLoginPage.ts`)
- Check network connectivity

### Issue: Train Search Returns No Results
**Solution:**
- Verify date is in future (at least 1 day ahead)
- Check if route is available for that date
- Verify station names are correct
- Try with different date/route

### Issue: Screenshot Not Captured
**Solution:**
- Ensure `screenshots/` directory exists
- Check disk space availability
- Verify write permissions

### Issue: Report Not Generated
**Solution:**
- Check `reports/` directory exists
- Verify logs were created
- Check console for errors
- Ensure no permission issues

## Advanced Configuration

### Retry Failed Steps

```typescript
async loginToIRCTC(username: string, password: string, retries: number = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      // Login logic
      break;
    } catch (error) {
      if (i === retries - 1) throw error;
      await this.page?.reload();
    }
  }
}
```

### Add Delays Between Actions

```typescript
// In test data or configuration
private delays = {
  betweenKeystrokes: 50,
  betweenClicks: 200,
  afterNavigation: 1000
};

// Use in page objects
await this.waitForTime(this.delays.betweenClicks);
```

### Multiple Passenger Booking

```typescript
async bookMultiplePassengers(passengers: any[]) {
  for (const passenger of passengers) {
    await this.bookingPage?.addPassengerDetails(
      passenger.name,
      passenger.age,
      passenger.gender,
      passenger.berthPreference
    );
  }
}
```

## Debugging

### Enable Debug Mode

```bash
# Run with Playwright Inspector
npm run test:debug

# Or with VS Code Debugger
# Add breakpoint and run with debugger
```

### Check Logs in Real-time

```bash
# Watch logs directory
Get-Content logs/*.log -Wait  # PowerShell
```

### Review Screenshots

```bash
# Open screenshots folder
start screenshots/

# Or view in report
npm run test:report
```

## Best Practices

✅ **Always Run in Non-CI Mode First**
```bash
HEADLESS=false npm run irctc:book
```

✅ **Use Test Accounts**
- Create dedicated test account for automation
- Don't use personal accounts

✅ **Schedule Automation**
```bash
# Windows Task Scheduler
# Create task to run: npm run irctc:book
```

✅ **Monitor Results**
- Check reports daily
- Review logs for issues
- Screenshot successful bookings

✅ **Update Selectors Regularly**
- IRCTC updates their website
- Test selectors monthly
- Keep page objects up-to-date

## Troubleshooting Checklist

- [ ] `.env` file exists with valid credentials
- [ ] `node_modules` installed (`npm install`)
- [ ] Playwright browsers installed (`npx playwright install`)
- [ ] IRCTC website is accessible
- [ ] Credentials are correct
- [ ] Booking date is in future
- [ ] Route has available trains
- [ ] Disk space available for screenshots
- [ ] Write permissions on directories
- [ ] No proxy/VPN blocking the website

## Support

For issues:
1. Check logs in `logs/` directory
2. Review screenshots in `screenshots/` directory
3. Check HTML report in `reports/` directory
4. Verify selectors using browser DevTools
5. Run in debug mode to inspect

## Example Test Data

### Different Routes

```typescript
// Delhi to Mumbai
{ fromStation: 'Delhi', toStation: 'Mumbai', class: 'AC First Class' }

// Bangalore to Chennai
{ fromStation: 'Bangalore', toStation: 'Chennai', class: 'Sleeper Class' }

// Kolkata to Delhi
{ fromStation: 'Kolkata', toStation: 'Delhi', class: 'AC Three Tier' }
```

### Different Classes

- AC First Class (1AC)
- AC Two Tier (2AC)
- AC Three Tier (3AC)
- Sleeper Class (SL)
- General (GN)

### Berth Preferences

- Lower (LB)
- Middle (MB)
- Upper (UB)
- Window (WB)
- Aisle (AB)

---

**Happy Automation! 🚀**

For more information, refer to main README.md and IRCTC website documentation.
