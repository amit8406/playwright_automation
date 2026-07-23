const {test, expect} = require ('@playwright/test');

test('Check DropDown Test', async ({page})=>{

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
    //Here in below line action is performed insided hence await is added inside
    expect(await page.locator("#terms").isChecked()).toBeFalsy;
    (await expect(pageLink).toHaveAttribute("class", 'blinkingText'));//Will check the link present on page
    //await page.pause();
});

test('Child window handling', async ({browser})=>{
    const context =  await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const pageLink= page.locator("[href*= 'documents-request']");

    const [newPage]= await Promise.all(
    [
    context.waitForEvent('page'),//listener for any new page to open, this will be added just before the action on the new page
    await pageLink.click(),//new page is opened

    ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0]
    console.log(text);
    //console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();
    console.log(await page.locator("#username").inputValue());
    
});