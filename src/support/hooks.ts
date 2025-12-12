import { BeforeAll, AfterAll, Before, After, AfterStep } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import fs from 'fs-extra';
import path from 'path';

let browser: any = null;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: true });
});

Before(async function (this: any) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: any) {
  await this.context?.close();
});

AfterStep(async function (this: any, { result }) {
  if (!this.page) return;
  try {
    const image = await this.page.screenshot();
    const screenshotsDir = path.join(process.cwd(), 'reports', 'screenshots');
    await fs.mkdirp(screenshotsDir);
    const filename = `screenshot-${Date.now()}.png`;
    const filepath = path.join(screenshotsDir, filename);
    await fs.writeFile(filepath, image);
    if (this.attach) {
      await this.attach(image, 'image/png');
    }
  } catch (err) {
    // ignore screenshot failures
  }
});

AfterAll(async function () {
  try {
    await browser?.close();
  } catch (e) {
    // ignore
  }
});
