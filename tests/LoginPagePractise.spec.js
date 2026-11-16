const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');

test('@Web Login practice page displays iPhone X', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();

    await loginPage.gotoPracticeURL();
    await loginPage.practiceLogin('rahulshettyacademy', 'Learning@830$3mK2');

    const dashboardPage = poManager.getDashboardPage();
    await expect(dashboardPage.product('iPhone X')).toBeVisible();
});