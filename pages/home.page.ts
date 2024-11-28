import { Page } from '@playwright/test';
import { BasePage } from './base.page';
export class HomePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    navigtionMap : { [key: string]: string } = {
        signup_login: 'Signup / Login',
        cart: 'Cart',
        loggedInAsUser: 'Logged in as',
        deleteAccount: 'Delete Account',
        logout: 'Logout',
    };

    locators = {
        linkNavigation: (link: string) => {return this.page.getByRole('link', { name: `${link}` })},
    };

    async navigateToLink(link: string) {
        await this.locators.linkNavigation(this.navigtionMap[link]).click();
    }

    async linkNavigationIsVisible(link: string){
        return await this.locators.linkNavigation(this.navigtionMap[link]).isVisible();
    }
}

