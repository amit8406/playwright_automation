const { test, expect } = require('@playwright/test'); 
const BASE_URL= 'https://eventhub.rahulshettyacademy.com';
const USER_EMAIL = 'amit.tiparadi1@gmail.com';
const USER_PASSWORD = 'Amitsan@785';
async function login(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(USER_EMAIL);
  await page.getByLabel('Password').fill(USER_PASSWORD);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
  
}

test('@Single ticket booking is eligible for refund', async ({page}) =>{
  await login(page);

  await page.getByRole('link',{name : 'Browse Events →'}).click();
  const eventCards = page.getByTestId('event-card');
  await expect(eventCards.first()).toBeVisible();
  await eventCards.last().getByTestId('book-now-btn').click();
  await page.getByLabel("Full Name").fill("Amit Test");
  await page.getByLabel("Email").fill("abc@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 8983561289");
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('button',{name : 'View Details'}).first().click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h2').filter({ hasText: 'Booking Information' })).toBeVisible();
  const refId = (await page.locator('span.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm:visible').innerText()).trim();
  const title = (await page.locator("h1").innerText()).trim();
  await expect(refId.charAt(0)).toBe(title.charAt(0));
  console.log("Characters matched!");
  await page.locator("#check-refund-btn").click();
  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
  await expect(page.locator("#refund-result")).toBeVisible();
  await expect(await page.getByText('Eligible for refund. Single-ticket bookings qualify for a full refund.', { exact: true })).toBeVisible(); 
  console.log("Refund case is validated!");
})

test('@Group ticket booking is NOT eligible for refund', async ({page}) =>{
  await login(page);
  await page.getByRole('link',{name : 'Browse Events →'}).click();
  const eventCards = page.getByTestId('event-card');
  await expect(eventCards.last()).toBeVisible();
  await eventCards.last().getByTestId('book-now-btn').click();
  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();
  await page.getByLabel("Full Name").fill("Amit Test2");
  await page.getByLabel("Email").fill("abcd@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("+91 8983561289");
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('button',{name : 'View Details'}).first().click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h2').filter({ hasText: 'Booking Information' })).toBeVisible();
  const refId = (await page.locator('span.font-mono.font-bold.text-indigo-600.bg-indigo-50.px-3.py-1.rounded-lg.text-sm:visible').innerText()).trim();
  const title = (await page.locator("h1").innerText()).trim();
  await expect(refId.charAt(0)).toBe(title.charAt(0));
  await page.locator("#check-refund-btn").click();
  await expect(page.locator("#refund-spinner")).toBeVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 });
  await expect(await page.getByText('Not eligible for refund. Group bookings (3 tickets) are non-refundable.', { exact: true })).toBeVisible();
  console.log("No refund case is validated!");
})
