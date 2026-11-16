const {test } = require('@playwright/test');
const { POManager1 } = require('../pageObjects/POManager1');
const dataset = require('../utils/placeOrderTestData1.json');

for(const data of dataset)
{
    test(`@Web Order place - ${data.productName}`, async ({ page })=>{
        const poManager =  new POManager1(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.GotoURL();
        await loginPage.validLogin(data.username, data.password);
        const dashboardPage = poManager.getDashboardPage();

        
    });
}
