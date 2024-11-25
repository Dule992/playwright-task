import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { SignupPage } from "../pages/signup.page";
import { AccountCreatedPage } from "../pages/accountCreated.page";
import { describe } from "node:test";
import * as testData from "../testData.json";


type UserData = {
    name: string;
    email: string;
}

let homePage: HomePage;
let loginPage: LoginPage;
let signupPage: SignupPage;
let accountCreatedPage: AccountCreatedPage;
let userData: UserData;


describe('User Registration', () => {
    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignupPage(page);
        accountCreatedPage = new AccountCreatedPage(page);
    
        await homePage.open('/');
    
        userData = {
            name: testData.user.name,
            email: testData.user.email + '_' + new Date().getTime() + '@test.com'
        };
        console.log("User data", userData);
    });
    
    test('Successful User Registration', async () => {
        expect(await homePage.getUrl()).toBe((testData.url.home));
        await homePage.clickButton(homePage.selectors.loginLinkNavigation);
        await loginPage.fillInput(loginPage.selectors.nameInput, userData.name);
        await loginPage.fillInput(loginPage.selectors.emailAddressInput, userData.email);
        await loginPage.clickButton(loginPage.selectors.signUpButton);

        expect(await signupPage.getUrl()).toBe(testData.url.signup);

        await signupPage.populateUserRegistrationForm(testData.user);

        expect(await accountCreatedPage.getUrl()).toBe(testData.url.account_created);
        expect(await accountCreatedPage.getText(accountCreatedPage.selectors.titleMessage)).toContain(testData.message.account_created);

        await accountCreatedPage.clickButton(accountCreatedPage.selectors.continueButton);

        expect(await homePage.userIsLoggedIn()).toBeTruthy();
    });
});