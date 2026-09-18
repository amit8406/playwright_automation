const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../pageObjects/POManager');
const { chromium, expect } = require('@playwright/test');

Given('A login to the Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {


    const loginPage = this.poManager.getLoginPage();
    await loginPage.gotoURL();
    await loginPage.validLogin(username, password);
});

When('Add a {string} to Cart', { timeout: 100 * 1000 }, async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddToCart(productName);
    await this.dashboardPage.navigateToOrders();
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart page', { timeout: 100 * 1000 }, async function (productName) {
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.checkoutButtonClick();
});

When('Enter valid details and place the order', async function () {
    this.checkoutPage = this.poManager.getCheckoutPage();
    await this.checkoutPage.countrySelection("ind");
    this.orderId = await this.checkoutPage.SubmitAndGetOrderId();
    console.log("OrderId: ", this.orderId);
});

Then('Verify order is present in the OrderHistory page', async function () {
    await this.dashboardPage.navigateToOrders();
    const orderHistoryPage = this.poManager.getOrderHistoryPage();
    await orderHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
});

Given('A login to the Ecommerce2 application with {string} and {string}', async function (username, password) {
    const userName = this.page.locator('#username');
    const signinbtn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());

    const cardTitles = this.page.locator('.card-body a');

    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signinbtn.click();

});

Then('Verify error message is displayed.', async function () {
    console.log(await this.page.locator("[style*=block]").textContent());//content extraction
    await expect(this.page.locator("[style*=block]")).toContainText('Incorrect');

});

//
//     console.log(await page.locator("[style*=block]").textContent());//content extraction
//     await expect(page.locator("[style*=block]")).toContainText('Incorrect');