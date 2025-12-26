const { test, expect } = require('@playwright/test');

/**
 * Example Test Suite - Basic Playwright tests
 */
test.describe('Example Tests', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');

    // Check that the page loaded
    await expect(page).not.toHaveURL('about:blank');
  });

  test('should have a title', async ({ page }) => {
    await page.goto('/');

    // Expect the title to contain something meaningful
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should navigate to login page', async ({ page }) => {
    await page.goto('/');

    // Click login link if exists
    const loginLink = page.locator('a[href*="login"]');
    if (await loginLink.count() > 0) {
      await loginLink.first().click();
      await expect(page).toHaveURL(/login/);
    }
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      // Page should still render without errors
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should take screenshot', async ({ page }) => {
    await page.goto('/');

    // Take a screenshot
    await page.screenshot({ path: 'test-results/homepage.png' });
  });
});
