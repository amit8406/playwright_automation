const { test, expect } = require('@playwright/test'); 
const { futureDateValue } = require('../utils/dateUtils');
test('@webTests Event App login', async ({ page }) => {
   const eventTitle = `Test Event ${Date.now()}`;
   const email = "amit.tiparadi1@gmail.com";
   const allEvents = page.locator("#event-card");
   const BASE_URL = "https://eventhub.rahulshettyacademy.com";
   await page.goto("https://eventhub.rahulshettyacademy.com/login");
   await page.getByPlaceholder("you@email.com").fill(email);
   await page.getByLabel("Password").type("Amitsan@785");
   await page.locator("#login-btn").click();
   await page.waitForLoadState('networkidle');
   await expect(page.getByText("Browse Events →")).toBeVisible();
   await page.locator("button:has-text('Admin')").click();
   await page.locator("a").filter({hasText : 'Manage Events'}).first().click();
   await page.waitForLoadState('networkidle');
   console.log(eventTitle);
   await page.locator("#event-title-input").fill(eventTitle);
   await page.locator("#admin-event-form textarea").fill("Test Event created for XX");
   await page.getByLabel("City").fill("Solapur");
   await page.getByLabel("Venue").fill("Hutatma Smriti Mandir");
   await page.getByLabel("Category").selectOption("Festival");
   await page.getByLabel("Event Date & Time").fill(futureDateValue());
   await page.getByLabel("Price ($)").fill("150");
   await page.getByLabel("Total Seats").fill("50");
   await page.locator("#add-event-btn").click();
   await expect(page.getByText("✓Event created!")).toBeVisible();
   await page.locator("#nav-events").click();
   const eventCards = page.locator('[data-testid="event-card"]');
   await expect(eventCards.first()).toBeVisible({timeout: 10000});
   const totalc = await eventCards.count();
   let seatsBeforeBooking;
   console.log(totalc);
   for (let i=0; i< totalc; i++)
   {
      const card = eventCards.nth(i);
      const cardText = await card.textContent();
      if(cardText && cardText.includes(eventTitle))
      {
         console.log("Event Found!!");
         const seatText = await card.locator("span.text-emerald-600").innerText();
         console.log(seatText);
         seatsBeforeBooking = parseInt(seatText , 10);
         console.log("Seats before Booking: ",seatsBeforeBooking);
         await card.getByTestId("book-now-btn").click();
         break;
      }
   }
   await page.waitForLoadState('networkidle');
   const lc = await page.locator("#ticket-count").filter({hasText : '1'});
   await expect(lc).toBeVisible();
   await page.getByLabel("Full Name").fill("Zack Crewley");
   await page.locator("#customer-email").fill("abc@gmail.com");
   await page.getByPlaceholder("+91 98765 43210").fill("+91 8983561289");
   await page.getByRole('button', { name: 'Confirm Booking' }).click();
   await page.waitForLoadState('networkidle');
   await expect(page.locator(".booking-ref")).toBeVisible();
   const refText = (await page.locator(".booking-ref").innerText()).trim();
   console.log("Booking Reference:",refText);
   await page.getByRole('button', { name: 'View My Bookings' }).click();
   await page.waitForLoadState('networkidle');
   await expect(page).toHaveURL(`${BASE_URL}/bookings`);
   const bookingCard = await page.locator("#booking-card").filter({has : page.locator(".booking-ref"), hasText : refText});
   await expect(bookingCard).toBeVisible();
   await expect(bookingCard).toContainText(eventTitle);
   await page.locator("#nav-events").click();
   await expect(eventCards.filter({ hasText: eventTitle }).first()).toBeVisible({ timeout: 5000 });
   const matchedCard = eventCards.filter({ hasText: eventTitle }).first();
   await expect(matchedCard).toBeVisible();
   const seatText=await matchedCard.locator("span.text-emerald-600").innerText();
   const seatsAfterBooking = parseInt(seatText , 10);
   console.log("Seats after Booking: ",seatsAfterBooking);
   expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);
   console.log("Ticket count is updated");
   
})