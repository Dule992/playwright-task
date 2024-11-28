import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    
    constructor(public readonly page: Page) {
        super(page);
    }

    locators = {
        nameInput: this.page.getByTestId('signup-name'),
        emailAddressInput:  this.page.getByTestId('signup-email'),
        signUpButton: this.page.getByTestId('signup-button'),
        loginEmailInput: this.page.getByTestId('login-email'),
        loginPasswordInput: this.page.getByTestId('login-password'),
        loginButton: this.page.getByTestId('login-button'),
    };

    async enterName(name: string) {
        await this.locators.nameInput.fill(name);
    }

    async enterEmail(email: string) {
        await this.locators.emailAddressInput.fill(email);
    }

    async clickSignUpButton() {
        await this.locators.signUpButton.click();
    }

    async enterLoginEmail(email: string) {
        await this.locators.loginEmailInput.fill(email);
    }

    async enterLoginPassword(password: string) {
        await this.locators.loginPasswordInput.fill(password);
    }

    async clickLoginButton() {
        await this.locators.loginButton.click();
    }
}
