import { test, expect, selectors } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { describe } from "node:test";
import * as testData from "../testData.json";

type UserData = {
    name: string;
    email: string;
}

let homePage: HomePage;
let loginPage: LoginPage;
let userData: UserData;


describe('Login and Logout', () => {
    test.beforeEach(async ({ browser }) => {
        selectors.setTestIdAttribute("data-qa");
        const page = await browser.newPage();
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);

        await homePage.open('/');
    });

    test.beforeEach(async ({ request }) => {
        userData = {
            name: testData.user.name,
            email: testData.user.email + '_' + new Date().getTime() + '@test.com'
        };
        console.log("User data", userData);

        // Create the user
        const response = (await request.post(`/api/createAccount`, {
            multipart: {
                "name": userData.name,
                "email": userData.email,
                "password": testData.user.password,
                title: testData.user.title,
                birth_date: testData.user.birthday,
                birth_month: testData.user.birthmonth,
                birth_year: testData.user.birthyear,
                firstname: testData.user.firstName,
                lastname: testData.user.lastName,
                company: testData.user.company,
                address1: testData.user.address,
                address2: testData.user.address,
                country: testData.user.country,
                zipcode: testData.user.zipcode,
                state: testData.user.state,
                city: testData.user.city,
                mobile_number: testData.user.mobileNumber
            }
        }));
        console.log(response.headers().multipart);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.ok).toBeTruthy();
        expect(responseBody.message).toBe(testData.message.user_created);
    });

    test('Successful User Login', async () => {
        expect(await homePage.getUrl()).toBe((testData.url.home));
        await homePage.navigateToLink(testData.navigtion.signup_login);
        await loginPage.enterLoginEmail(userData.email);
        await loginPage.enterLoginPassword(testData.user.password);
        await loginPage.clickLoginButton();

        expect((homePage.linkNavigationIsVisible(testData.navigtion.loggedInAsUser))).toBeTruthy();
        expect((homePage.loggedInUserIsVisible(userData.name))).toBeTruthy();

        await homePage.navigateToLink(testData.navigtion.logout);

        expect((homePage.linkNavigationIsVisible(testData.navigtion.signup_login))).toBeTruthy();
    });

    test.afterEach(async ({ request }) => {
        // Delete the user
        const response = (await request.delete(`/api/deleteAccount`, {
            multipart: {
                email: userData.email,
                password: testData.user.password
            }
        }));
        console.log(response.headers().multipart);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(response.ok).toBeTruthy();
        expect(responseBody.message).toBe(testData.message.account_deleted);
    });
});