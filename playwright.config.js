const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries: 2,

  timeout: 30 * 1000, //overall timeout for each test

  expect: {
    timeout: 5000,  //timeout for each expect assertion
  },

  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright']
],
      

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot : 'on',
    trace: 'on'
    
  },
});
