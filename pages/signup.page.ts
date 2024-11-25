import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class SignupPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public selectors = {
        titleRadioButton(gender: string) { return `input[value='${gender}']` },
        passwordInput: '[data-qa="password"]',
        daySelectDropdown: '[data-qa="days"]',
        monthSelectDropdown: '[data-qa="months"]',
        yearSelectDropdown: '[data-qa="years"]',
        firstNameInput: '[data-qa="first_name"]',
        lastNameInput: '[data-qa="last_name"]',
        companyInput: '[data-qa="company"]',
        addressInput: '[data-qa="address"]',
        countrySelectDropdown: '[data-qa="country"]',
        stateInput: '[data-qa="state"]',
        cityInput: '[data-qa="city"]',
        zipcodeInput: '[data-qa="zipcode"]',
        mobileNumberInput: '[data-qa="mobile_number"]',
        createAccountButton: '[data-qa="create-account"]',
    };

    async populateUserRegistrationForm(userData: any) {
        await this.page.click(this.selectors.titleRadioButton(userData.title));
        await this.page.fill(this.selectors.firstNameInput, userData.firstName);
        await this.page.fill(this.selectors.lastNameInput, userData.lastName);
        await this.page.fill(this.selectors.passwordInput, userData.password);
        await this.page.selectOption(this.selectors.daySelectDropdown, { label: userData.birthday });
        await this.page.selectOption(this.selectors.monthSelectDropdown, { label: userData.birthmonth });
        await this.page.selectOption(this.selectors.yearSelectDropdown, { label: userData.birthyear });
        await this.page.fill(this.selectors.companyInput, userData.company);
        await this.page.fill(this.selectors.addressInput, userData.address);
        await this.page.fill(this.selectors.cityInput, userData.city);
        await this.page.fill(this.selectors.stateInput, userData.state);
        await this.page.fill(this.selectors.zipcodeInput, userData.zipcode);
        await this.page.fill(this.selectors.mobileNumberInput, userData.mobileNumber);
        await this.page.click(this.selectors.createAccountButton);
    }
}
