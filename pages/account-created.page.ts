import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountCreatedPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    locators = {
        titleMessage: this.page.getByTestId('account-created'),
        continueButton: this.page.getByTestId('continue-button'),
    };  

    async getTitleMessage() {
        return await this.locators.titleMessage.textContent();
    }

    async clickContinueButton() {
        await this.locators.continueButton.click();
    }
}
