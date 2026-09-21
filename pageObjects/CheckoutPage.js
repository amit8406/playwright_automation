const {test, expect} = require('@playwright/test');
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropDown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submitBtn = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async countrySelection(countryName) {
        //this.country.pre 
        await this.country.pressSequentially(countryName);
        await this.dropDown.waitFor({ state: "visible" });

        const optionsCount = await this.dropDown.locator("button").count();
        //options.locator("button")
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropDown.locator("button").nth(i).textContent();
            if (text === " India") {
                await this.dropDown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async verifyEmailId(username) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId() {
        await this.submitBtn.click();
        await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
        return await this.orderId.textContent();
    }

    // async submitOrder() {
    //     await this.submitBtn.click();

    // }
}
//File export
module.exports = { CheckoutPage };