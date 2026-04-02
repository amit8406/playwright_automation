const { test, expect } = require('@playwright/test');

test.only('Browser context validating Error Login', async ({ browser }) => {

    // Create fresh context & page
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    const username = page.locator('#username');
    const signinbtn = page.locator('#signInBtn');

    await username.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signinbtn.click();
    console.log(await page.locator("[style*=block]").textContent());
    await expect(page.locator("[style*=block]")).toContainText('Incorrect');

    await username.fill("");
    await username.fill("rahulshettyacademy");
    await signinbtn.click();
});


test('Page Playwright Test', async ({ page }) => {

    // ✅ Use built-in page fixture (no need for context/browser)
    await page.goto("https://www.google.com/");
    console.log(await page.title());

});
