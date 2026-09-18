import {test, expect, Locator, Page } from "@playwright/test";
export class CheckoutPage {

    page: Page;
    country: Locator;
    dropDown: Locator;
    emailId: Locator;
    submitBtn: Locator;
    orderConfirmationText: Locator;
    orderId: Locator;
    constructor(page: Page) {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropDown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.submitBtn = page.locator(".action__submit");
        this.orderConfirmationText = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

    async countrySelection(countryName:string) {
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

    async verifyEmailId(username:string) {
        await expect(this.emailId).toHaveText(username);
    }

    async SubmitAndGetOrderId(): Promise<string> {
    await this.submitBtn.click();
  const orderId = await this.orderId.textContent();
  if (!orderId) {
    throw new Error('Order ID not found on confirmation page');
  }
  return orderId;
}

    // async submitOrder() {
    //     await this.submitBtn.click();

    // }
}

module.exports = { CheckoutPage };