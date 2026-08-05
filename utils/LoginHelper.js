const { expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const USER_EMAIL = 'amit.tiparadi1@gmail.com';
const USER_PASSWORD = 'Amitsan@785';

async function loginAndGoToEvents(page) {
    await page.goto(`${BASE_URL}/login`);

    await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
    await page.getByLabel('Password').fill(USER_PASSWORD);

    await page.locator('#login-btn').click();

    await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();

    await page.goto(`${BASE_URL}/events`);
}
module.exports = { loginAndGoToEvents };