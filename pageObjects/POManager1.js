const { DashBoardPage1 } = require('./DashBoardPage1');
const { LoginPage1 } = require('./LoginPage1');
const { CheckoutPage1 } = require('./CheckoutPage')
const { CartPage1 } = require('./CartPage1');
const {OrdersHistoryPage1} = require('./OrdersHistoryPage');
class POManager1 {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage1(this.page);
        this.dashboardPage = new DashBoardPage1(this.page);
        this.cartPage = new CartPage1(this.page);
        this.orderHistoryPage = new OrdersHistoryPage1(this.page);
        this.checkoutPage = new CheckoutPage1(this.page);
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

module.exports = { POManager1 }

