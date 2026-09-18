import {test, expect, Locator, Page } from "@playwright/test";
export class LoginPage
{
    page:Page;
    signInbutton:Locator;
    uname: Locator;
    pass: Locator;
    constructor(page:Page)
    {
        this.page = page;
        this.signInbutton  = page.locator("[value='Login']");
        this.uname = page.locator("#userEmail");
        this.pass = page.locator("#userPassword");

    }

    async validLogin(uname:string,pass:string)
    {
        await this.uname.fill(uname);
        await this.pass.type(pass);
        await this.signInbutton.click();
    }

    async gotoURL()
    {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
}

module.exports = {LoginPage}