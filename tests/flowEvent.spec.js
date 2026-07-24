const { test, expect } = require('@playwright/test'); 
const { futureDateValue } = require('../utils/dateUtils');
test('@Web Event App login', async ({ page }) => {
   //js file- Login js, DashboardPage
   const eventTitle = `Test Event ${Date.now()}`;
   const email = "amit.tiparadi1@gmail.com";
   //const productName = 'zara coat 3';
   //const products = page.locator(".card-body");
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
   //await page.locator("event-card")
   const eventCards = page.locator('[data-testid="event-card"]');
   await expect(eventCards.first()).toBeVisible({timeout: 10000});
   //console.log(eventCards);
   const totalc = await eventCards.count();
   let seatsBeforeBooking;
   console.log(totalc);
   for (let i=0; i< totalc; i++)
   {
      const card = eventCards.nth(i);
      const cardText = await card.textContent();
      //const cardText = await eventCards.nth(i).textContent();
      if(cardText && cardText.includes(eventTitle))
      {
         console.log("Event Found!!");
         const seatText = await card.locator("span.text-emerald-600").innerText();
         console.log(seatText);
         seatsBeforeBooking = parseInt(seatText , 10);
         console.log("Seats before Booking: ",seatsBeforeBooking);
         break;
      }
   }

   //await page.getByText("✓Event created!")
})

// test('Client App end to end test', async ({ page }) => {
//    const email = "amit.tiparadi1@gmail.com";
//    const productName = 'iphone 13 pro';
//    const products = page.locator(".card-body");
//    await page.goto("https://rahulshettyacademy.com/client");
//    await page.locator("#userEmail").fill(email);
//    await page.locator("#userPassword").type("amitsan785");
//    await page.locator("[value='Login']").click();
//    await page.waitForLoadState('networkidle');
//    await page.locator(".card-body b").first().waitFor();
//    const titles= await page.locator(".card-body b").allTextContents();
//    console.log(titles);
//    const count = await products.count();
//    for(let i =0; i< count; ++i)
//    {
//       if(await products.nth(i).locator("b").textContent()=== productName)
//       {
//          //await products.nth(i).locator("text= Add To Cart").click();
//          await products.nth(i).getByText("Add To Cart").click();
//          console.log("Item clicked!");
//          break;
//       }

//    }
//    await page.locator("[routerlink*='cart']").click();
//    await page.locator("div li").first().waitFor();
//    const bool= await page.locator("h3:has-text('iphone 13 pro')").isVisible();
//    expect(bool).toBeTruthy();
//    await page.locator("text=Checkout").click();
//    await page.locator("[placeholder*='Country']").pressSequentially("ind");
//    const dropDown = page.locator(".ta-results");
//    await dropDown.waitFor();
//    const optionsCount = await dropDown.locator("button").count();
//    //options.locator("button")
//    for(let i=0; i<optionsCount;++i)
//    {
//       const text = await dropDown.locator("button").nth(i).textContent();
//       if(text===" India")
//       {
//          await dropDown.locator("button").nth(i).click();
//          break;
//       }
//    }
//    //await page.pause();

//    await expect(page.locator(".user__name [type = text]").first()).toHaveText(email);
//    await page.locator(".action__submit").click();
//    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//    console.log(orderId);
//    await page.locator("[routerlink*='/dashboard/myorders']").first().click();
//    await page.locator("tbody").waitFor();
//    const rows = page.locator("tbody tr");
// const rowCount = await rows.count();

// for (let i = 0; i < rowCount; i++) 
//    {
//    const rowOrderId = (await rows.nth(i).locator("th").textContent()).trim();

//    if (orderId.includes(rowOrderId)) 
//       {
//       await rows.nth(i).getByRole("button", { name: "View" }).click();
//       break;
//       }
//    }
   
//    const orderIdDetails = await page.locator(".col-text").textContent();
//    expect(orderId.includes(orderIdDetails)).toBeTruthy();

//    // await expect(page.locator(".ng-star-inserted").first()).toHaveText(orderId);
// })