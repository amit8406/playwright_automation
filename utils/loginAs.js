const { expect } = require('@playwright/test');
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

async function loginAs(page, user) {
    await page.goto(`${BASE_URL}/login`);
    await page.getByPlaceholder('you@email.com').fill(user.email);
    await page.getByLabel('Password').fill(user.password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

module.exports = {loginAs};
