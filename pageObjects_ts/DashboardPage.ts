import {test, expect, Locator, Page } from "@playwright/test";
export class DashboardPage
{

    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    orders: Locator;
    constructor(page:Page)
    {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        //this.cart =  page.locator("[routerlink*='cart']");
        this.cart = page.getByRole('button', { name: /Cart/ }).first();
        this.orders = page.locator("button[routerlink*='myorders']");
    }
    async searchProductAddToCart(productName: string)
    {
        await this.products.first().waitFor({ state: "visible" });
        const titles= await this.productsText.allTextContents();
           console.log(titles);
           const count = await this.products.count();
           for(let i =0; i< count; ++i)
           {
              if(await this.products.nth(i).locator("b").textContent()=== productName)
              {
                 //await products.nth(i).locator("text= Add To Cart").click();
                 await this.products.nth(i).locator("text= Add To Cart").click();
                 console.log("Item clicked!");
                 break;
              }
        
           }
    }
    async navigateToOrders()
    {
        await this.orders.click();
    }

    async navigateToCart()
    {
        await this.cart.click();
    }

}

module.exports = {DashboardPage};