class DashBoardPage1
{
    constructor(page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        //this.pProducts = page.getByRole('link', { name: /iphone X/i });
        this.cart = page.getByRole('button', {name : /Cart/}).first();
        this.orders = page.locator("//button[@routerlink='/dashboard/myorders']");

    }
    async searchProductAddToCart(productName)
    {
        this.page.locator("")
    }
}
module.exports = {DashBoardPage1}