import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/home.page";
import { ProductPage } from "../pages/product.page";
import { SignupPage } from "../pages/signup.page";
import { AccountCreatedPage } from "../pages/account-created.page";
import { CartPage } from "../pages/cart.page";
import { describe } from "node:test";
import * as testData from "../testData.json";


type UserData = {
    name: string;
    email: string;
}

let homePage: HomePage;
let signupPage: SignupPage;
let productPage: ProductPage;
let cartPage: CartPage;
let accountCreatedPage: AccountCreatedPage;
let userData: UserData;


describe('Search and Add Product', () => {
    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        homePage = new HomePage(page);
        signupPage = new SignupPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        accountCreatedPage = new AccountCreatedPage(page);

        await productPage.open(testData.url.product);

        userData = {
            name: testData.user.name,
            email: testData.user.email + '_' + new Date().getTime() + '@test.com'
        };
        console.log("User data", userData);
    });

    test.only('Verify searching and adding certain product to the Cart', async () => {
        expect(await productPage.getUrl()).toBe((testData.url.product));
        await productPage.enterSearchText("T-Shirt");

        expect(await productPage.productItemIsVisible(testData.product.name) === 1);

        await productPage.clickOnAddToCartButton(testData.product.name);

        expect(await productPage.isCartModalVisible()).toBeTruthy();

        expect(await productPage.isCartTitleVisible(testData.message.added_to_cart)).toBeTruthy();

        await productPage.clickCartLinkButton();

        await cartPage.productDescriptionMatches(testData.product.name);
        expect(await cartPage.productPriceMatches(testData.product.name, testData.product.price)).toBeTruthy();
        expect(await cartPage.productQuantityMatches(testData.product.name, testData.product.quantity)).toBeTruthy();

    });
});