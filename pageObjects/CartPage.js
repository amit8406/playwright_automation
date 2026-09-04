const {test, expect} = require('@playwright/test');
class CartPage
{
    constructor(page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async VerifyProductIsDisplayed(productName)
    {
        await this.cartProducts.waitFor();
        const bool =await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();

    }

    async checkoutButtonClick()
    {
        await this.checkoutBtn.click();
    }

    getProductLocator(productName)
    {
        return this.page.locator("h3:has-text('"+productName+"')");
    }

}

module.exports = {CartPage}