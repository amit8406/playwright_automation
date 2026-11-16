const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');

test('retrieve a post with an HTTP GET request', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1', {
    headers: {
      Accept: 'application/json',
    },
  });

  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toMatchObject({
    id: 1,
    userId: 1,
    title: expect.any(String),
    body: expect.any(String),
  });
});
