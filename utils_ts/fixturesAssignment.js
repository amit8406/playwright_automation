const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { expect } = base;


const LOGIN_URL = 'https://eventhub.rahulshettyacademy.com/login';
const API_BASE_URL = 'https://api.eventhub.rahulshettyacademy.com'

const credentials = {
    email: 'amit.tiparadi1@gmail.com',
    password: 'Amitsan@785'
};

exports.test = base.test.extend({

    //UI Login Fixture
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(LOGIN_URL);
        await page.getByPlaceholder('you@email.com').fill(credentials.email);
        await page.getByLabel('Password').fill(credentials.password);
        await page.locator('#login-btn').click();
        await expect(page.getByText('Featured Events')).toBeVisible();
        await page.waitForLoadState('networkidle');
        await use(page);
        await page.close();
    },

    //API Event creation fixture
    createEvent: async ({ playwright }, use) => {
        const apiContext = await request.newContext({ baseURL: API_BASE_URL });
        // const apiUtils = new APIUtils(apiContext,loginPayload);
        const loginResp = await apiContext.post('/api/auth/login', { data: credentials });
        const loginBody = await loginResp.json();
        const token = loginBody.token;
        const eventPayLoad = {
            "title": "QA Summit 2026",
            "description": "A premier technology conference.",
            "category": "Conference",
            "venue": "Bangalore International Centre",
            "city": "Bangalore",
            "eventDate": "2026-09-15T09:00:00.000Z",
            "price": 1200,
            "totalSeats": 600,
            "imageUrl": "https://example.com/banner.jpg"
        };

            const createRes = await apiContext.post('/api/events',{
            data: eventPayLoad, 
            headers: { Authorization : `Bearer ${token}`},
         });
         const body = await createRes.json();
         const event= body.data
         await use(event);
        
         await apiContext.dispose();
    }

});

exports.expect = expect;
