const base = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const {request} = require('@playwright/test');
const loginPayload = {userEmail: "amit.tiparadi1@gmail.com", userPassword: "amitsan785"};
const orderPayLoad = {"orders":[{"country":"Ukraine","productOrderedId":"6960eae1c941646b7a8b3ed3"}]}
exports.customtest = base.test.extend({
    authenticatedPage : async ({browser}, use)=> 
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.locator("#userEmail").fill("amit.tiparadi1@gmail.com");
        await page.locator("#userPassword").fill("amitsan785");
        await page.locator("[value='Login']").click();
        await page.waitForLoadState('networkidle');
        await use(page);

    },
    createOrder : async ({},use) =>
    {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext,loginPayload);
        const response =  await apiUtils.createOrder(orderPayLoad);
        await use(response);
        await apiContext.dispose();
    }
}
);