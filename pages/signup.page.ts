import { BasePage } from './base.page';
import { expect, Page } from '@playwright/test';

export class SignupPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    locators = {
        titleRadioButton: (gender: string) => { return this.page.getByRole('radio', { name: gender }) },
        passwordInput: this.page.getByTestId("password"),
        daySelectDropdown: this.page.getByTestId('days'),
        monthSelectDropdown: this.page.getByTestId('months'),
        yearSelectDropdown: this.page.getByTestId('years'),
        firstNameInput: this.page.getByTestId('first_name'),
        lastNameInput: this.page.getByTestId('last_name'),
        companyInput: this.page.getByTestId('company'),
        addressInput: this.page.getByTestId('address'),
        countrySelectDropdown: this.page.getByTestId('country'),
        stateInput: this.page.getByTestId('state'),
        cityInput: this.page.getByTestId('city'),
        zipcodeInput: this.page.getByTestId('zipcode'),
        mobileNumberInput: this.page.getByTestId('mobile_number'),
        createAccountButton: this.page.getByTestId('create-account'),
    };

    async checkTitleRadioButton(title: string) {
        await this.locators.titleRadioButton(title).click();
    }

    async enterPassword(password: string) {
        await this.locators.passwordInput.fill(password);
    }

    async selectDay(day: string) {
        await this.locators.daySelectDropdown.selectOption({ label: day });
    }

    async selectMonth(month: string) {
        await this.locators.monthSelectDropdown.selectOption({ label: month });
    }

    async selectYear(year: string) {
        await this.locators.yearSelectDropdown.selectOption({ label: year });
    }

    async enterFirstName(firstname: string) {
        await this.locators.firstNameInput.fill(firstname);
        await expect(this.locators.firstNameInput).toHaveValue(firstname)
    }

    async enterLastName(lastname: string) {
        await this.locators.lastNameInput.fill(lastname);
        await expect(this.locators.lastNameInput).toHaveValue(lastname)
    }

    async enterCompany(company: string) {
        await this.locators.companyInput.fill(company);
        await expect(this.locators.companyInput).toHaveValue(company)
    }

    async enterAddress(address: string) {
        await this.locators.addressInput.fill(address);
        await expect(this.locators.addressInput).toHaveValue(address)
    }

    async enterCity(city: string) {
        await this.locators.cityInput.fill(city);
        await expect(this.locators.cityInput).toHaveValue(city)
    }

    async enterState(state: string) {
        await this.locators.stateInput.fill(state);
        await expect(this.locators.stateInput).toHaveValue(state)
    }

    async enterZipcode(zipcode: string) {
        await this.locators.zipcodeInput.fill(zipcode);
        await expect(this.locators.zipcodeInput).toHaveValue(zipcode)
    }

    async selectCountry(country: string) {
        await this.locators.countrySelectDropdown.selectOption({ label: country });
    }

    async enterMobileNumber(number: string) {
        await this.locators.mobileNumberInput.fill(number);
        await expect(this.locators.mobileNumberInput).toHaveValue(number)
    }

    async clickOnCreateAccountButton() {
        await this.locators.createAccountButton.waitFor({ state: "visible" });
        await this.locators.createAccountButton.scrollIntoViewIfNeeded();
        return this.locators.createAccountButton.click();
    }

    async populateUserRegistrationForm(userData: any) {
        this.checkTitleRadioButton(userData.title);
        this.enterPassword(userData.password);
        this.selectDay(userData.birthday);
        this.selectMonth(userData.birthmonth);
        this.selectYear(userData.birthyear);
        this.enterFirstName(userData.firstName);
        this.enterLastName(userData.lastName);
        this.enterCompany(userData.company);
        this.enterAddress(userData.address);
        this.enterCity(userData.city);
        this.enterState(userData.state);
        this.enterZipcode(userData.zipcode);
        this.selectCountry(userData.country);
        this.enterMobileNumber(userData.mobileNumber);
        this.clickOnCreateAccountButton();
    }
}
