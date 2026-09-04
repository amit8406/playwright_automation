const { test, expect } = require('@playwright/test');

test.describe.configure({mode: 'parallel'});
test('Browser context validating Error Login', async ({ browser }) => {

    // Create fresh context & page
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log("Starting test1");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    const username = page.locator('#username');
    const signinbtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    await username.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("rahul");
    await signinbtn.click(); 
    console.log(await page.locator("[style*=block]").textContent());//content extraction
    await expect(page.locator("[style*=block]")).toContainText('Incorrect');
    
    await username.fill("");//clears the field

    await username.fill("rahulshettyacademy");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signinbtn.click();
    // console.log(await cardTitles.nth(0).textContent());
    
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    await expect(allTitles).toEqual(['iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry']);
    //await cardTitles.allTextContents().then(values => console.log(values));
});


test('@Web Page Playwright Test', async ({ page }) => {

    console.log("Starting test2");
    // ✅ Use built-in page fixture (no need for context/browser)
    await page.goto("https://www.google.com/");
    expect(page).toHaveTitle("Google");
    console.log(await page.title());

});
