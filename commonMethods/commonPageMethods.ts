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
        this.loggerInfo('Page loaded');
    }

    async waitForElement(selector: string) {
        await this.page.waitForSelector(selector);
        this.loggerInfo(`Element appeared: ${selector}`);
    }

    async getElementText(selector: string): Promise<string> {
        const element = await this.page.$(selector);
        this.loggerInfo(`Element text retrieved: ${selector}`);
        return await element?.textContent() || '';
    }

    async getElement(selector: string) {
        await this.page.waitForSelector(selector);
        this.loggerInfo(`Element found: ${selector}`);
        return await this.page.$(selector);
    }

    async getElements(selector: string) {
        await this.page.waitForSelector(selector);
        this.loggerInfo(`Elements found: ${selector}`);
        return await this.page.$$(selector);
    }

    async clickElement(selector: string) {
        await this.page.click(selector);
        this.loggerInfo(`Clicked element: ${selector}`);
    }

    async typeText(selector: string, text: string) {
        await this.page.fill(selector, text);
        this.loggerInfo(`Typed text into element: ${selector}`);
    }   

    async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector);
        this.loggerInfo(`Waited for selector: ${selector}`);
    }

    async waitForTimeout(timeout: number) {
        await this.page.waitForTimeout(timeout);
        this.loggerInfo(`Waited for timeout: ${timeout} ms`);
    }   

    async waitForSelectorAndClick(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
        this.loggerInfo(`Waited for and clicked selector: ${selector}`);
    }

    async waitForSelectorAndType(selector: string, text: string) {
        await this.page.waitForSelector(selector);
        await this.page.fill(selector, text);
        this.loggerInfo(`Waited for selector and typed text: ${selector}`);
    }

    async waitForSelectorAndSetText(selector: string, text: string) {
        await this.page.waitForSelector(selector);
        await this.page.fill(selector, text);
        this.loggerInfo(`Waited for selector and set text: ${selector}`);
    }

    async waitForSelectorAndSelectOption(selector: string, option: string) {
        await this.page.waitForSelector(selector);
        await this.page.selectOption(selector, option);
        this.loggerInfo(`Waited for selector and selected option: ${selector}`);
    }

    async waitForSelectorAndCheck(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.check(selector);
        this.loggerInfo(`Waited for selector and checked: ${selector}`);
    }

    async waitForSelectorAndUncheck(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.uncheck(selector);
        this.loggerInfo(`Waited for selector and unchecked: ${selector}`);
    }

    async waitForSelectorAndScrollIntoView(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.locator(selector).scrollIntoViewIfNeeded();
        this.loggerInfo(`Waited for selector and scrolled into view: ${selector}`);
    }

    async waitForSelectorAndHover(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.hover(selector);
        this.loggerInfo(`Waited for selector and hovered: ${selector}`);
    }

    async waitForSelectorAndPressKey(selector: string, key: string) {
        await this.page.waitForSelector(selector);
        await this.page.press(selector, key);
        this.loggerInfo(`Waited for selector and pressed key '${key}': ${selector}`);
    }

    async waitForSelectorAndDblClick(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.dblclick(selector);
        this.loggerInfo(`Waited for selector and double clicked: ${selector}`);
    }

    async waitForSelectorAndRightClick(selector: string) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector, { button: 'right' });
        this.loggerInfo(`Waited for selector and right clicked: ${selector}`);
    }

    async waitForSelectorAndDragAndDrop(selector1: string, selector2: string) {
        await this.page.waitForSelector(selector1);
        await this.page.waitForSelector(selector2);
        await this.page.dragAndDrop(selector1, selector2);
        this.loggerInfo(`Waited for selectors and performed drag and drop from ${selector1} to ${selector2}`);
    }

    async waitForSelectorAndUploadFile(selector: string, filePath: string) {
        await this.page.waitForSelector(selector);
        await this.page.setInputFiles(selector, filePath);
        this.loggerInfo(`Waited for selector and uploaded file: ${selector}`);
    }   

    async getCurrentURL(): Promise<string> {
        const currentPageURL: string = this.page.url();
        this.loggerInfo(`Current URL: ${currentPageURL}`);
        return currentPageURL;
    }

    async getPageTitle(): Promise<string> {
        const pageTitle: string = await this.page.title();
        this.loggerInfo(`Page Title: ${pageTitle}`);
        return pageTitle;
    }

    async getPageSource(): Promise<string> {
        const pageSource: string = await this.page.content();
        this.loggerInfo('Retrieved page source');
        return pageSource;
    }

    async closePage() {
        await this.page.close();
        this.loggerInfo('Closed the page');
    }   

    async refreshPage() {
        await this.page.reload({ waitUntil: 'domcontentloaded' });
        this.loggerInfo('Refreshed the page');
    }

    async goBack() {
        await this.page.goBack({ waitUntil: 'domcontentloaded' });
        this.loggerInfo('Navigated back');
    }

    async goForward() {
        await this.page.goForward({ waitUntil: 'domcontentloaded' });
        this.loggerInfo('Navigated forward');
    }

    async sleep(milliseconds: number) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
        this.loggerInfo(`Sleeping for ${milliseconds} milliseconds`);
    }

    async getWindowsCount(): Promise<Page[]> {
        const pages = this.page.context().pages();
        this.loggerInfo(`Number of open windows: ${pages.length}`);
        return pages;
    }

    async switchToChildWindow(index: number): Promise<Page> {
        const pages = this.page.context().pages();
        this.loggerInfo(`Switching to window ${index}`);
        return pages[index];
    }

    async switchToParentWindow(): Promise<Page> {
        const pages = this.page.context().pages();
        this.loggerInfo('Switching to parent window');
        return pages[0];
    }

    async closeAllChildWindows() {
        const pages = this.page.context().pages();
        for (const page of pages) {
            if (page !== this.page) {
                await page.close();
            }
        }
        this.loggerInfo('Closed all child windows');
    }

    async closeAllWindows() {
        const pages = this.page.context().pages();
        for (const page of pages) {
            await page.close();
        }
        this.loggerInfo('Closed all windows');
    }

    async takeScreenshot(path: string) {
        await this.page.screenshot({ path: path, fullPage: true });
        this.loggerInfo(`Screenshot taken: ${path}`);
    }

    async takeScreenshotOfElement(selector: string, path: string) {
        const element = await this.page.$(selector);
        if (element) {
            await element.screenshot({ path: path });
        }
        this.loggerInfo(`Screenshot of element taken: ${path}`);
    }

    async getElementCount(selector: string): Promise<number> {
        const elements = await this.page.$$(selector);
        this.loggerInfo(`Number of elements found for ${selector}: ${elements.length}`);
        return elements.length;
    }

    async getElementAttribute(selector: string, attribute: string): Promise<string | null> {
        const element = await this.page.$(selector);
        this.loggerInfo(`Retrieved attribute '${attribute}' for element: ${selector}`);
        return await element?.getAttribute(attribute) || null;
    }

}