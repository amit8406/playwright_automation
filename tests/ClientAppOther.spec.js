const { test, expect } = require('@playwright/test'); 

test('Client App end to end test 2', async ({ page }) => {
   const email = "amit.tiparadi1@gmail.com";
   const productName = 'iphone 13 pro';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill("amitsan785");
   await page.getByRole('button', {name : "Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   await page.locator(".card-body").filter({hasText : "iphone 13 pro"}).getByRole('button', {name : "Add to Cart"}).click();
   await page.getByRole("listitem").getByRole('button',{name: "Cart"}).click();


   await page.locator("div li").first().waitFor();
   await expect(page.getByText("iphone 13 pro")).toBeVisible();

   await page.getByRole('button',{name : "Checkout"}).click();
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
   await page.getByRole("button",{name : "Ind"}).nth(1).click();

   //await page.pause();

   await page.getByText("PLACE ORDER").click();
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

   
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

   // await expect(page.locator(".ng-star-inserted").first()).toHaveText(orderId);
})