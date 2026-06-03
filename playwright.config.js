const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 30 * 1000, //overall timeout for each test

  expect: {
    timeout: 5000,  //timeout for each expect assertion
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    
  },
});
