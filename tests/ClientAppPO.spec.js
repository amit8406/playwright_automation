const { test,expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageObjects/POManager');
//JSON->String->js object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for(const data of dataset)
{
test(`@Web Client App end to end test for product ${data.productName}`, async ({ page }) => {
   const poManager = new POManager(page)
   const loginPage = poManager.getLoginPage();
   await loginPage.gotoURL();
   await loginPage.validLogin(data.username, data.password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddToCart(data.productName);
   await dashboardPage.navigateToOrders();
   await dashboardPage.navigateToCart();
   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(data.productName);
   await cartPage.checkoutButtonClick();

   const checkoutPage = poManager.getCheckoutPage();
   await checkoutPage.countrySelection("ind");
   const orderId = await checkoutPage.SubmitAndGetOrderId();
   console.log("OrderId: ",orderId);
   await dashboardPage.navigateToOrders();
   const orderHistoryPage = poManager.getOrderHistoryPage();
   await orderHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

});
}
customtest(`Client App Login`, async ({page, testDataForOrder})=>
{
   const poManager = new POManager(page);

   const loginPage = poManager.getLoginPage();
   await loginPage.gotoURL();
   await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddToCart(testDataForOrder.productName);
   await dashboardPage.navigateToOrders();
   await dashboardPage.navigateToCart();
   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
   await cartPage.checkoutButtonClick();

   const checkoutPage = poManager.getCheckoutPage();
   await checkoutPage.countrySelection("ind");
   const orderId = await checkoutPage.SubmitAndGetOrderId();
   console.log("OrderId: ",orderId);
   await dashboardPage.navigateToOrders();
   const orderHistoryPage = poManager.getOrderHistoryPage();
   await orderHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();

})
