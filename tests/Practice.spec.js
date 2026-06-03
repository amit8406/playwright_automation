const {test,expect} = require('@playwright/test');

test.only('Login Test', async ({browser}) => {
    const context =  await browser.newContext();
    const page = await context.newPage();
    console.log("Login test started");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    console.log(await page.title());

    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator("#login");
    //

    await username.fill("amit.tiparadi1@gmail.com");
    await password.fill("Amit@1234");
    await loginButton.click();
    await page.locator(".card-body b").first().waitFor({ state: "visible" });
   // await page.waitForURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
   // await page.locator(".card-body b").first().waitFor();
    const cardTitles = page.locator('.card-body b');
    //page.locator('.card-body b').first.waitFor;
    console.log("Count:", await cardTitles.count());
    //await expect(cardTitles).toHaveCount(3);
    console.log("User logged in successfully!");
   // console.log(await cardTitles.count());
   // console.log(await cardTitles.nth(2).waitFor());
   // console.log(await cardTitles.first().textContent());
    const titles = await cardTitles.allTextContents();
    console.log(titles);
    //expect(titles).toEqual(['ADIDAS ORIGINAL', 'ZARA COAT 3', 'ROCKPORT SANDAL']);

});