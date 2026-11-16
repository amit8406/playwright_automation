const { test, expect } = require('@playwright/test');

test('create a post with an HTTP POST request', async ({ request }) => {
  const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'Playwright API test',
      body: 'Created using an HTTP POST request',
      userId: 1,
    },
    headers: {
      Accept: 'application/json',
    },
  });

  expect(response.status()).toBe(201);

  const responseBody = await response.json();
  expect(responseBody).toMatchObject({
    title: 'Playwright API test',
    body: 'Created using an HTTP POST request',
    userId: 1,
  });
});
