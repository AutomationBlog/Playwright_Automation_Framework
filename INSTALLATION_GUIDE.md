# Installation and Setup Guide

Complete setup instructions for the Playwright Automation Framework.

## System Requirements

- **Operating System**: Windows, macOS, or Linux
- **Node.js**: v16 or higher
- **npm**: v7 or higher (comes with Node.js)
- **RAM**: 4GB minimum
- **Disk Space**: 2GB for Playwright browsers and dependencies

## Step 1: Clone/Setup Project

```powershell
# Navigate to project directory
cd d:\Automation\Playwright_Automation_Framework

# Verify project structure
dir
```

## Step 2: Install Dependencies

```powershell
# Install all npm packages
npm install

# This installs:
# - @playwright/test
# - @cucumber/cucumber
# - TypeScript
# - And other required packages
```

**Expected Output:**
```
added XX packages in X.XXs
```

## Step 3: Install Playwright Browsers

```powershell
# Install browser binaries
npx playwright install

# This downloads:
# - Chromium
# - Firefox
# - WebKit
```

**Expected Output:**
```
✓ Downloaded Firefox (123 MB)
✓ Downloaded Chromium (145 MB)
✓ Downloaded WebKit (89 MB)
```

## Step 4: Configure Environment Variables

```powershell
# Copy the example file
Copy-Item .env.example -Destination .env

# Edit .env with your credentials
# Open with your preferred editor
notepad .env
```

**Example .env content:**
```env
IRCTC_USERNAME=your_irctc_email@example.com
IRCTC_PASSWORD=your_irctc_password
HEADLESS=false
BROWSER=chromium
SLOW_MO=0
```

## Step 5: Verify Installation

```powershell
# Run Playwright diagnostics
npx playwright install-deps

# Verify TypeScript compiler
npx tsc --version

# Expected: Version 5.3.3 (or similar)
```

## Step 6: Run First Test

```powershell
# Run example test
npm run test:irctc

# Or run all tests
npm test

# Expected: Browser launches and tests run
```

## Troubleshooting Installation

### Issue: "npm: command not found"

**Solution:**
- Install Node.js from https://nodejs.org/
- Restart terminal/PowerShell after installation
- Verify: `node --version`

### Issue: "Port already in use"

**Solution:**
```powershell
# Check if port 9222 is in use
Get-NetTCPConnection | Where-Object {$_.LocalPort -eq 9222}

# Kill process if needed
Stop-Process -Id <PID> -Force
```

### Issue: "Playwright browsers not found"

**Solution:**
```powershell
# Remove and reinstall
npm uninstall @playwright/test
npm install @playwright/test
npx playwright install
```

### Issue: "Permission denied" on Linux/macOS

**Solution:**
```bash
# Run with sudo or adjust permissions
sudo npx playwright install

# Or set permissions
chmod -R 755 node_modules/@playwright
```

## Project Structure After Installation

```
Playwright_Automation_Framework/
├── node_modules/                 # Installed packages
├── src/
│   ├── base/
│   │   ├── basePage.ts
│   │   ├── baseTest.ts
│   │   ├── logger.ts
│   │   └── screenshot.ts
│   ├── pages/
│   │   ├── irctcLoginPage.ts
│   │   └── irctcBookingPage.ts
│   ├── config/
│   │   └── config.ts
│   └── utils/
│       ├── htmlReporter.ts
│       ├── fileUtil.ts
│       └── testDataUtil.ts
├── features/
│   ├── irctc.feature
│   └── step_definitions/
│       └── irctcSteps.ts
├── tests/
│   ├── example.spec.ts
│   └── irctc.spec.ts
├── scripts/
│   ├── generateReport.js
│   └── irctcBookingAutomation.ts
├── reports/                      # Generated after tests
├── screenshots/                  # Captured screenshots
├── logs/                         # Test logs
├── .env                          # Your credentials (do not commit)
├── .env.example
├── package.json
├── tsconfig.json
├── cucumber.js
├── playwright.config.ts
├── README.md
└── IRCTC_AUTOMATION_GUIDE.md
```

## Running Tests

### Playwright Tests

```powershell
# Run all tests
npm test

# Run specific test file
npm run test:irctc

# Run in headed mode (show browser)
npm run test:headed

# Run in debug mode
npm run test:debug

# View HTML report
npm run test:report
```

### Cucumber Tests

```powershell
# Run all scenarios
npm run cucumber

# Run IRCTC scenarios
npm run cucumber:irctc

# Generate HTML report
npm run cucumber:report
```

### IRCTC Booking Automation

```powershell
# Run the booking automation script
npm run irctc:book

# Run with TypeScript directly
ts-node scripts/irctcBookingAutomation.ts

# Run with debug logging
DEBUG=* npm run irctc:book
```

## Verify Successful Installation

Run this test to verify everything is working:

```powershell
# Create and run a quick test
npm test -- --grep "Verify"
```

Expected output:
- Browser launches
- Page opens
- Test passes or shows specific error
- Report generated

## IDE Setup (Recommended: VS Code)

### Install Extensions

1. **Playwright Test for VSCode**
   - ID: `ms-playwright.playwright`
   - Provides test runners and debugging

2. **TypeScript Vue Plugin**
   - ID: `Vue.volar`
   - For better TypeScript support

3. **Cucumber (Gherkin) Full Support**
   - ID: `alexkrechik.cucumberautocomplete`
   - For feature file support

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[gherkin]": {
    "editor.defaultFormatter": "alexkrechik.cucumberautocomplete"
  }
}
```

### Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch IRCTC Automation",
      "program": "${workspaceFolder}/scripts/irctcBookingAutomation.ts",
      "preLaunchTask": "tsc: build",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "runtimeArgs": ["-r", "ts-node/register"],
      "console": "integratedTerminal"
    }
  ]
}
```

## Common npm Scripts

```powershell
# Testing
npm test                  # Run all Playwright tests
npm run test:headed       # Run tests with visible browser
npm run test:debug        # Run tests in debug mode
npm run test:report       # View Playwright HTML report

# Cucumber
npm run cucumber          # Run all Cucumber scenarios
npm run cucumber:irctc    # Run IRCTC Cucumber scenarios
npm run cucumber:report   # Generate Cucumber HTML report

# Automation Scripts
npm run irctc:book        # Run IRCTC booking automation
npm run generate:report   # Generate custom HTML report

# Combined
npm run test:all          # Run all tests + generate reports
```

## Updating Dependencies

```powershell
# Check for updates
npm outdated

# Update all packages
npm update

# Update to latest versions (major)
npm install -g npm-check-updates
ncu -u
npm install
```

## Running on CI/CD

### GitHub Actions Example

```yaml
name: Automation Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Health Check

Run this PowerShell script to verify installation:

```powershell
# save as check-installation.ps1
Write-Host "Checking Playwright Automation Framework..." -ForegroundColor Cyan

Write-Host "1. Node.js version..." -ForegroundColor Yellow
node --version

Write-Host "2. npm version..." -ForegroundColor Yellow
npm --version

Write-Host "3. TypeScript version..." -ForegroundColor Yellow
npx tsc --version

Write-Host "4. Playwright version..." -ForegroundColor Yellow
npm list @playwright/test

Write-Host "5. Checking .env file..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host ".env file exists" -ForegroundColor Green
} else {
    Write-Host ".env file NOT found" -ForegroundColor Red
}

Write-Host "6. Checking directories..." -ForegroundColor Yellow
@('src', 'tests', 'features', 'scripts', 'reports') | ForEach-Object {
    if (Test-Path $_) {
        Write-Host "  ✓ $_ exists" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $_ NOT found" -ForegroundColor Red
    }
}

Write-Host "`nInstallation check completed!" -ForegroundColor Cyan
```

Run it:
```powershell
.\check-installation.ps1
```

## Next Steps

1. Read main [README.md](./README.md)
2. Review [IRCTC_AUTOMATION_GUIDE.md](./IRCTC_AUTOMATION_GUIDE.md)
3. Explore example tests in `tests/` directory
4. Customize page objects in `src/pages/`
5. Create your own test scenarios
6. Run your first automation!

## Getting Help

- Check logs in `logs/` directory
- Review screenshots in `screenshots/` directory
- Check generated reports in `reports/`
- Refer to [Playwright Docs](https://playwright.dev/)
- Refer to [Cucumber Docs](https://cucumber.io/)

---

**Happy Testing! 🚀**
