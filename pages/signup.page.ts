import { BasePage } from './base.page';
import { Page } from '@playwright/test';

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
    }

    async enterLastName(lastname: string) {
        await this.locators.lastNameInput.fill(lastname);
    }

    async enterCompany(conpany: string) {
        await this.locators.companyInput.fill(conpany);
    }

    async enterAddress(address: string) {
        await this.locators.addressInput.fill(address);
    }

    async enterCity(city: string) {
        await this.locators.cityInput.fill(city);
    }

    async enterState(state: string) {
        await this.locators.stateInput.fill(state);
    }

    async enterZipcode(zipcode: string) {
        await this.locators.zipcodeInput.fill(zipcode);
    }

    async selectCountry(country: string) {
        await this.locators.countrySelectDropdown.selectOption({ label: country });
    }

    async enterMobileNumber(number: string) {
        await this.locators.mobileNumberInput.fill(number);
    }

    async clickOnCreateAccountButton() {
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
