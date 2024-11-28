import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class ProductPage extends BasePage {

    constructor(public readonly page: Page) {
        super(page);
    }

    locators = {
        searchBar: this.page.locator('#search_product'),
        searchSubmitButton: this.page.locator('#submit_search'),
        productHover: (productName: string) => this.page.locator('.productinfo p').filter({ hasText: productName }).first(),
        productItem: (productName: string) => {return this.page.getByRole('paragraph', {name: productName}).first() },
        addToCartButton: this.page.getByRole('link', { name: 'Add to cart' }),
        cartModal: this.page.locator('#cartModal'),
        cartModalTitle: this.page.locator('.modal-title'),
        cartLinkButton: this.page.getByRole('link', { name: 'View Cart' }),
    };

    async enterSearchText(searchText: string) {
        await this.locators.searchBar.fill(searchText);
        await this.locators.searchSubmitButton.click();
    }

    async productItemIsVisible(productName: string) {
        const product = this.page.getByRole('paragraph').filter({ hasText: productName }).first();
        return await product.count();
    }

    async clickOnAddToCartButton(productName: string) {
        await this.page.waitForSelector('.productinfo p');
        const productHover = this.locators.productHover(productName);
        await productHover.hover();

        const addToCartButton = this.page.locator('.productinfo p').filter({ hasText: productName }).locator('..').locator('a:has-text("Add to cart")');
        await addToCartButton.click();
    }

    async isCartModalVisible() {
        await this.locators.cartModal.waitFor({state:"visible"});
        return await this.locators.cartModal.isVisible();
    }

    async isCartTitleVisible(title: string) {
        await this.locators.cartModalTitle.waitFor({state:"visible"});
        const cartTitle = await this.locators.cartModalTitle.textContent();
        return cartTitle === title;
    }

    async clickCartLinkButton() {
        await this.locators.cartLinkButton.waitFor({state:"visible"});
        await this.locators.cartLinkButton.click();
    }
}
