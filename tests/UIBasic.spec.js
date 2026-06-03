const {test , expect} = require('@playwright/test');

test('First Playwright Test', async ({browser}) => {
    console.log("Hello World");
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await expect(page).toHaveTitle("Test Login | Practice Test Automation");
    console.log(await page.title());
    await page.locator('#username').fill("student");
    await page.locator('#password').fill("Password123");
    await page.locator('#submit').click();
})

test('Page Playwright Test', async ({page}) => {
    //console.log("Hello World");
    await page.goto("https://www.google.com/");
    console.log(await page.title());

})