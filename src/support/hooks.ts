import { BeforeAll, AfterAll, Before, After, AfterStep } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs-extra';
import path from 'path';
import logger from '../utils/logger';

let browser: any = null;

BeforeAll(async function () {
  logger.info('[HOOKS] Launching browser');

  // prefer a local Chrome/Chromium if provided via env or default installation path
  const defaultChromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  let chromePath: string | undefined = process.env.CHROME_PATH || defaultChromePath;
  if (chromePath && !fs.existsSync(chromePath)) {
    chromePath = undefined;
  }

  const launchOptions: any = {
    headless: false,
    // Add flags to start the browser maximized / fullscreen on supported platforms
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized', '--start-fullscreen'],
    ignoreDefaultArgs: ['--disable-extensions'],
    devtools: false,
    slowMo: 50,
  };

  if (chromePath) {
    launchOptions.executablePath = chromePath;
    logger.info(`[HOOKS] Using local Chrome executable: ${chromePath}`);
  } else {
    logger.info('[HOOKS] No local Chrome detected; using Playwright Chromium');
  }

  browser = await chromium.launch(launchOptions);
  logger.info('[HOOKS] Browser launched successfully');
});

Before(async function (this: any) {
  logger.info('[HOOKS] Starting new test scenario');
  // Use viewport: null so the context uses the full browser window size (allows --start-maximized)
  this.context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: null });
  this.page = await this.context.newPage();
  logger.info('[HOOKS] New page context created');
});

After(async function (this: any) {
  logger.info('[HOOKS] Closing test scenario context');
  await this.context?.close();
  logger.info('[HOOKS] Context closed successfully');
});

AfterStep(async function (this: any) {
  if (!this.page) return;
  try {
    const image = await this.page.screenshot();
    const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
    await fs.mkdirp(screenshotsDir);
    const filename = `screenshot-${Date.now()}.png`;
    const filepath = path.join(screenshotsDir, filename);
    await fs.writeFile(filepath, image);
    logger.info(`[HOOKS] Screenshot saved: ${filename}`);
    if (this.attach) {
      await this.attach(image, 'image/png');
    }
  } catch (err) {
    logger.warn(`[HOOKS] Failed to capture screenshot: ${err}`);
  }
});

AfterAll(async function () {
  logger.info('[HOOKS] Closing browser after all tests');
  try {
    await browser?.close();
    logger.info('[HOOKS] Browser closed successfully');
  } catch (e) {
    logger.error(`[HOOKS] Error closing browser: ${e}`);
  }
});
