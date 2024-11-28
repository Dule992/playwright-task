import { BasePage } from './base.page';
import { expect, Page } from '@playwright/test';

export class CartPage extends BasePage {

    constructor(public readonly page: Page) {
        super(page);
    }

    locators = {
        cartTable: this.page.locator('table'),
        cartTableRows: this.page.locator('tr'),
        cartTableColumns: this.page.locator('td'),
        decriptionLink: this.page.locator('h4 a')
    };

    async productDescriptionMatches(productName: string) {
        this.locators.decriptionLink.waitFor({state: 'visible'});
        const productMatch = this.locators.cartTableRows
        .filter({
            has: this.locators.cartTableColumns,
            hasText: productName
        })
        if (productMatch) {
            const productDescription = await productMatch.locator('td').nth(1)
            .filter({has: this.locators.decriptionLink}).innerText();
            expect(productDescription).toContain(productName);
        }
    };

    async productPriceMatches(productName: string, price: string) {
        this.locators.decriptionLink.waitFor({state: 'visible'});
        const productMatch = this.locators.cartTableRows
        .filter({
            has: this.locators.cartTableColumns,
            hasText: productName
        })
        if (productMatch) {
            const productPrice = productMatch.locator('td').nth(2)
            .filter({has: this.page.locator('p')}).innerText();
            return await productPrice === price.toString();
        }
    };

    async productQuantityMatches(productName: string, quantity: string) {
        this.locators.decriptionLink.waitFor({state: 'visible'});
        const productMatch = this.locators.cartTableRows
        .filter({
            has: this.locators.cartTableColumns,
            hasText: productName
        })
        if (productMatch) {
            const productQuantity = productMatch.locator('td').nth(3)
            .filter({has: this.page.locator('button')}).innerText();
            return await productQuantity === quantity.toString();
        }
    }
}
