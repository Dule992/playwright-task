import { Page } from "@playwright/test";

export abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
    async open(url: string) {
        await this.page.goto(url);
    }

    async getUrl() {
        return this.page.url();
    }

    async clickButton(selector: string) {
        await this.page.click(selector);
    }

    async fillInput(selector: string, value: string) {
        await this.page.fill(selector, value);
    }

    async getText(selector: string) {
        return this.page.textContent(selector);
    }
}
