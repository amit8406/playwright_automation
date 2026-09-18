import {test, expect} from "@playwright/test";
import { POManager } from "../pageObjects_ts/POManager";
import { customTest, testDataArray, TestDataForOrder } from '../utils_ts/test-base';

//JSON->String->js object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for (const data of dataset) {
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
      let orderId:any;
      orderId = await checkoutPage.SubmitAndGetOrderId();
      console.log("OrderId: ", orderId);
      await dashboardPage.navigateToOrders();
      const orderHistoryPage = poManager.getOrderHistoryPage();
      await orderHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
   });
}

for (const testDataForOrder of testDataArray) {
   customTest(`Client App Login - ${testDataForOrder.productName}`, async ({ page }) => {
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
      console.log("OrderId: ", orderId);
      await dashboardPage.navigateToOrders();
      const orderHistoryPage = poManager.getOrderHistoryPage();
      await orderHistoryPage.searchOrderAndSelect(orderId);
      expect(orderId.includes(await orderHistoryPage.getOrderId())).toBeTruthy();
   });
}