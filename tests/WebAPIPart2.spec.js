const {test,expect} = require('@playwright/test');
const email = "amit.tiparadi1@gmail.com";
const pass = "amitsan785";
let webContext;
test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type(pass);
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path:'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
})

test('Client app login', async()=>{
   const productName = 'iphone 13 pro';
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const products = page.locator(".card-body");
   
   //await page.locator(".card-body b").first().waitFor();
   const titles= await page.locator(".card-body b").allTextContents();
   console.log(titles);
   const count = await products.count();
   for(let i =0; i< count; ++i)
   {
      if(await products.nth(i).locator("b").textContent()=== productName)
      {
         //await products.nth(i).locator("text= Add To Cart").click();
         await products.nth(i).getByText("Add To Cart").click();
         console.log("Item clicked!");
         break;
      }

   }
})

test('Get product titles', async()=>{
   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   const titles= await page.locator(".card-body b").allTextContents();
   console.log(titles);
});