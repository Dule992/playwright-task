import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    navigtionMap : { [key: string]: string } = {
        loginLink: 'Signup / Login',
        cartLink: 'Cart',
        loggedInAsUser: 'Logged in as',
        deleteAccount: 'Delete Account',
    };

    locators = {
        linkNavigation: (link: string) => {return this.page.getByRole('link', { name: `${link}` })},
    };

    async navigateToLink(link: string) {
        await this.locators.linkNavigation(this.navigtionMap[link]).click();
    }
}

