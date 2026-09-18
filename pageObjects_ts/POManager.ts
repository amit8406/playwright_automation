import { DashboardPage } from './DashboardPage';
import { LoginPage } from './LoginPage';
import { CheckoutPage } from './CheckoutPage';
import { CartPage } from './CartPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { Page } from '@playwright/test';


export class POManager {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    orderHistoryPage: OrdersHistoryPage;
    checkoutPage: CheckoutPage;
    page: Page;
    constructor(page:Page) {
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