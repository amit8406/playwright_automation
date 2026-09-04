const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');
const { CheckoutPage } = require('./CheckoutPage')
const { CartPage } = require('./CartPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderHistoryPage = new OrdersHistoryPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }


    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage()
    {
        return this.checkoutPage;
    }

    getOrderHistoryPage()
    {
        return this.orderHistoryPage;
    }

}

module.exports = { POManager }