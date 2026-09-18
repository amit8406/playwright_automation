const playwright = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');
const { Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const { AfterStep, BeforeStep, Status } = require('@cucumber/cucumber');
const { setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(30 * 1000);

Before( async function () {
    this.browser = await chromium.launch({ headless: false });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

After(function () {
    console.log("Closed");
});

BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});


AfterStep(async function ({ result, pickleStep }) {
    if (result.status === Status.FAILED && this.page) {
        // console.log('Failed step:', pickleStep.text);
        // console.log('URL at failure:', this.page.url());

        // await this.page.bringToFront();
        // await this.page.waitForTimeout(500);

        const path = require('path');
        const fullPath = path.resolve(`screenshot_${Date.now()}.png`);
        await this.page.screenshot({ path: fullPath, fullPage: true });

        // const fs = require('fs');
        // const stats = fs.statSync(fullPath);
        // console.log('Screenshot file size (bytes):', stats.size);
        // console.log('Saved to:', fullPath);
    }
});