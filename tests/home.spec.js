const { test, expect } = require('../fixtures/baseFixture');

/**
 * Home Page Test Suite
 * Uses https://the-internet.herokuapp.com
 */
test.describe('Home Page Tests', () => {
  test('should display home page heading', async ({ homePage }) => {
    await homePage.goto();

    // Verify heading is visible
    const isHeadingVisible = await homePage.isHeadingVisible();
    expect(isHeadingVisible).toBeTruthy();
  });

  test('should have correct page title', async ({ homePage }) => {
    await homePage.goto();

    const title = await homePage.getTitle();
    expect(title).toContain('The Internet');
  });

  test('should display available examples', async ({ homePage }) => {
    await homePage.goto();

    // Verify there are multiple example links
    const count = await homePage.getExamplesCount();
    expect(count).toBeGreaterThan(10);
  });

  test('should navigate to Form Authentication page', async ({ homePage, page }) => {
    await homePage.goto();

    await homePage.clickExample('Form Authentication');

    // Verify navigation to login page
    await expect(page).toHaveURL(/login/);
  });

  test('should navigate to Checkboxes page', async ({ homePage, page }) => {
    await homePage.goto();

    await homePage.clickExample('Checkboxes');

    // Verify navigation
    await expect(page).toHaveURL(/checkboxes/);
  });

  test('should navigate to Dropdown page', async ({ homePage, page }) => {
    await homePage.goto();

    await homePage.clickExample('Dropdown');

    // Verify navigation
    await expect(page).toHaveURL(/dropdown/);
  });

  test('should display subheading', async ({ homePage }) => {
    await homePage.goto();

    const subheading = await homePage.getSubheading();
    expect(subheading).toContain('Available Examples');
  });
});
