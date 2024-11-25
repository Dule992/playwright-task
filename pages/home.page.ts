import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    readonly selectors = {
        loginLinkNavigation: 'a[href="/login"]',
        cartLinkNavigation: 'a[href="/view_cart"]',
        loggedInAsUser:  '.fa.fa-user',
    };

    async userIsLoggedIn() {
        return await this.page.isVisible(this.selectors.loggedInAsUser);
    }
}
