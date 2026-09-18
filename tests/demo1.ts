import { expect, type Locator, type Page } from '@playwright/test';
let message1 : String = "Hello";
message1 = '2';


let age1: number = 34;
let isActive :boolean = true;
console.log(age1);
console.log(isActive);
let numbers1: number[] =[3,5,3,6,74,65]

console.log(numbers1)
let data: any = "This is Done";

data = 45

data = [3,5,3,56,7];
console.log(data);
function add(a: number,b:number):number
{
    return a+b;
    
}

console.log(add(5,7));

let user : {name:string,age:number, location:string} = {name:"Bob",age:34,location: "SolangValley"};

user.location = "Solapur";

const {test, expect} = require('@playwright/test');
class CartPage
{
    page: Page;
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