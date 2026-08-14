const { test, expect } = require("../utils/fixturesAssignment.js");

test('@Newly created event should appear on the Events page', async ({ authenticatedPage, createEvent }) => {
    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(authenticatedPage.getByText(createEvent.title)).toBeVisible();
});