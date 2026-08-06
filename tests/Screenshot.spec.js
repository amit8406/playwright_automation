const {test, expect} = require('@playwright/test');

test('Screenshot Test',async ({page}) => {
    await page.goto("https://google.com");
    await page.screenshot({path: 'screenshot.png', fullPage: true});

})

test.only("@Field Screenshot Test", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#login').screenshot({path: 'field_screenshot.png'});
    await expect(page.locator('#login')).toBeVisible();
    await page.locator('#login').screenshot({path: 'partial_field.png'});
})