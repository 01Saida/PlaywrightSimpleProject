const { test: base } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { HomePage } = require('../pages/HomePage');

/**
 * Custom fixtures that extend the base Playwright test
 * These fixtures provide page objects and common setup/teardown logic
 *
 * Uses https://the-internet.herokuapp.com for testing
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
const test = base.extend({
  /**
   * Login Page fixture
   * Automatically provides an instance of LoginPage
   */
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  /**
   * Home Page fixture
   * Automatically provides an instance of HomePage
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  /**
   * Authenticated page fixture
   * Provides a page that is already logged in
   */
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Valid credentials for the-internet.herokuapp.com
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await use(page);
  },
});

const { expect } = require('@playwright/test');

module.exports = { test, expect };
