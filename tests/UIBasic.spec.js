const {test} = require('@playwright/test');

test.only('First Playwright Test', async ({browser}) => {
    console.log("Hello World");
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.locator('#username').fill("student");
    await page.locator('#password').fill("Password123");
    await page.locator('#submit').click();
})