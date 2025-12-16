import { Page } from 'playwright';
import logger from '../utils/logger';

export class CommonPageMethods {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async loggerInfo(message: string) {
        logger.info(message);
    }

    async loggerError(message: string) {
        logger.error(message);
    }

    async loggerWarn(message: string) {
        logger.warn(message);
    }

    async navigateTo(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        this.loggerInfo(`Navigated to URL: ${url}`);
    }

    async waitforPageLoad() {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector);
    }

    async getElementText(selector: string): Promise<string> {
        const element = await this.page.$(selector);
        return await element?.textContent() || '';
    }

    async getElement(selector: string) {
        return await this.page.$(selector);
    }

    async getElements(selector: string) {
        return await this.page.$$(selector);
    }

    async clickElement(selector: string) {
        await this.page.click(selector);
    }

    async typeText(selector: string, text: string) {
        await this.page.fill(selector, text);
    }   

    async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector);
    }

    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
    }   

    async waitForSelectorAndClick(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    }

    async waitForSelectorAndType(selector: string, text: string) {
        await this.page.waitForSelector(selector);
        await this.page.fill(selector, text);
    }

    async waitForSelectorAndSetText(selector: string, text: string) {
        await this.page.waitForSelector(selector);
        await this.page.fill(selector, text);
    }

    async waitForSelectorAndSelectOption(selector: string, option: string) {
        await this.page.waitForSelector(selector);
        await this.page.selectOption(selector, option);
    }

    async waitForSelectorAndCheck(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.check(selector);
    }

    async waitForSelectorAndUncheck(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.uncheck(selector);
    }

    async waitForSelectorAndScrollIntoView(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.locator(selector).scrollIntoViewIfNeeded();
    }

    async waitForSelectorAndHover(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.hover(selector);
    }

    async waitForSelectorAndPressKey(selector: string, key: string) {
        await this.page.waitForSelector(selector);
        await this.page.press(selector, key);
    }

    async waitForSelectorAndDblClick(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.dblclick(selector);
    }

    async waitForSelectorAndRightClick(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector, { button: 'right' });
    }

    async waitForSelectorAndDragAndDrop(selector1: string, selector2: string) {
        await this.page.waitForSelector(selector1);
        await this.page.waitForSelector(selector2);
        await this.page.dragAndDrop(selector1, selector2);
    }

    async waitForSelectorAndUploadFile(selector: string, filePath: string) {
        await this.page.waitForSelector(selector);
        await this.page.setInputFiles(selector, filePath);
    }   

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async getPageSource(): Promise<string> {
        return this.page.content();
    }

    async closePage() {
        await this.page.close();
    }   

    async refreshPage() {
        await this.page.reload({ waitUntil: 'domcontentloaded' });
    }

    async goBack() {
        await this.page.goBack({ waitUntil: 'domcontentloaded' });
    }

    async goForward() {
        await this.page.goForward({ waitUntil: 'domcontentloaded' });
    }

    async sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    async getWindowsCount(): Promise<Page[]> {
        const pages = this.page.context().pages();
        return pages;
    }

    async switchToChildWindow(index: number): Promise<Page> {
        const pages = this.page.context().pages();
        return pages[index];
    }

    async switchToParentWindow(): Promise<Page> {
        const pages = this.page.context().pages();
        return pages[0];
    }

    async closeAllChildWindows() {
        const pages = this.page.context().pages();
        for (const page of pages) {
            if (page !== this.page) {
                await page.close();
            }
        }
    }

    async closeAllWindows() {
        const pages = this.page.context().pages();
        for (const page of pages) {
            await page.close();
        }
    }

    async closeAllButFirstWindow() {
        const pages = this.page.context().pages();
        for (let i = 1; i < pages.length; i++) {
            await pages[i].close();
        }
    }

    async closeAllButLastWindow() {
        const pages = this.page.context().pages();
        for (let i = 0; i < pages.length - 1; i++) {
            await pages[i].close();
        }
    }

    async takeScreenshot(path: string) {
        await this.page.screenshot({ path: path, fullPage: true });
    }

    async takeScreenshotOfElement(selector: string, path: string) {
        const element = await this.page.$(selector);
        if (element) {
            await element.screenshot({ path: path });
        }
    }

    async getElementCount(selector: string): Promise<number> {
        const elements = await this.page.$$(selector);
        return elements.length;
    }

    async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
        const element = await this.page.$(selector);
        return await element?.getAttribute(attribute) || null;
    }

}