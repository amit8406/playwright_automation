const {test, expect} = require ('@playwright/test');

test.only('Check DropDown Test', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");
    //const passWord = page.locator("#password");
    const signIn = page.locator("#signInBtn");
    const dropDown = page.locator("select.form-control");
    const pageLink= page.locator("[href*= 'documents-request']");
    await dropDown.selectOption("Consultant");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy;
    (await expect(pageLink).toHaveAttribute("class", 'blinkingText'));//Will check the link present on page
    //await page.pause();


})