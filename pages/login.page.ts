import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {

    readonly selectors = {
        nameInput: `[data-qa='signup-name']`,
        emailAddressInput: `[data-qa='signup-email']`,
        signUpButton: `[data-qa='signup-button']`,
    };

    constructor(page: Page) {
        super(page);
    }
}
