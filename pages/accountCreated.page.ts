import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountCreatedPage extends BasePage {

    readonly selectors = {
        titleMessage: '[data-qa="account-created"]',
        continueButton: '[data-qa="continue-button"]',
    };

    constructor(page: Page) {
        super(page);
    }
}
