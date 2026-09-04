const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: 1,

  timeout: 30 * 1000, //overall timeout for each test

  expect: {
    timeout: 5000,  //timeout for each expect assertion
  },

  reporter: 'html',

  projects: [
    {
      name: 'chrome',
      use: {
        browserName : 'chromium',
        headless : false,
        screenshot: 'off',
        video : 'retain-on-failure',
        //ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'on',
       // ...devices['Galaxy A55'], 
        //viewport: {width : 1000, height: 720}
      }
    }
  ]

});
