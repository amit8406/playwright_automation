const { test, expect, request } = require('@playwright/test');
const { loginAs } = require('../utils/loginAs');
// console.log(require.resolve('../utils/loginAs'));
// console.log(require('../utils/loginAs'));
// const helper = require('../utils/loginAs');
// console.log(helper);
const BASE_URL = "https://api.eventhub.rahulshettyacademy.com";
const API_URL = BASE_URL + "/api";
const USER_EMAIL = "amit.t@gmail.com";
const USER_PASSWORD = "*******";
const GMAIL_USER = {
    email: "amit.tiparadi1@gmail.com",
    password: "********"
}
//const loginPayLoad ={"email": "amit.t@gmail.com","password": "Amitsan785"};
let token;
let eventId;
let yahooBookingId;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginRes = await apiContext.post(`${API_URL}/auth/login`, {
        data:
        {
            email: USER_EMAIL,
            password: USER_PASSWORD
        }
    });
    expect(loginRes.ok()).toBeTruthy();
    const loginResponse = await loginRes.json();
    token = loginResponse.token;
    const eventResp = await apiContext.get(`${API_URL}/events`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    expect(eventResp.ok()).toBeTruthy();
    const eventsResponse = await eventResp.json();
    eventId = eventsResponse.data[1].id;
    //console.log("EventId: ",eventId);
    // reuse apiContext created above for booking
    const bookingResp = await apiContext.post(`${API_URL}/bookings`, {
        data: {
            eventId: eventId,
            customerName: "Yahoo User",
            customerEmail: "amit.t@yahoo.com",
            customerPhone: "+91-9876541210",
            quantity: 1
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    // console.log(bookingResp.status());
    // console.log("Status Text:", bookingResp.statusText());

    // const responseBody = await bookingResp.text();
    // console.log("Response:", responseBody);
    expect(bookingResp.ok()).toBeTruthy();
    const bookingResponse = await bookingResp.json();
    yahooBookingId = bookingResponse.data.id;
    console.log("Yahoo Booking Id: ", yahooBookingId);
});

test('Login as Gmail User', async ({ page }) => {
    await loginAs(page, GMAIL_USER);
    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`,
        { waitUntil: 'networkidle' });
    await expect(page.getByText('Access Denied')).toBeVisible();
    console.log("Access Denied message is displayed successfully!");
    await expect(page.getByText('You are not authorized to view this booking.')).toBeVisible();
    console.log("You are not authorized to view this booking message is displayed successfully!");
});

test('My Test', async ({ page }) => {
    console.log("Token: ", token);
    console.log("EventId: ", eventId);

});

