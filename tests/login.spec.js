const { test, expect } = require('../fixtures/baseFixture');

/**
 * Login Page Test Suite
 * Uses https://the-internet.herokuapp.com/login
 * Valid credentials: tomsmith / SuperSecretPassword!
 */
test.describe('Login Page Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display login form', async ({ loginPage }) => {
    await expect(loginPage.page.locator(loginPage.usernameInput)).toBeVisible();
    await expect(loginPage.page.locator(loginPage.passwordInput)).toBeVisible();
    await expect(loginPage.page.locator(loginPage.loginButton)).toBeVisible();
  });

  test('should login with valid credentials', async ({ loginPage }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Verify successful login - logout button should be visible
    const isLoggedIn = await loginPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  test('should show error message with invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invaliduser', 'wrongpassword');

    // Verify error message is displayed
    const isFlashDisplayed = await loginPage.isFlashMessageDisplayed();
    expect(isFlashDisplayed).toBeTruthy();

    const flashMessage = await loginPage.getFlashMessage();
    expect(flashMessage).toContain('Your username is invalid!');
  });

  test('should show error for invalid password', async ({ loginPage }) => {
    await loginPage.login('tomsmith', 'wrongpassword');

    // Verify error message
    const flashMessage = await loginPage.getFlashMessage();
    expect(flashMessage).toContain('Your password is invalid!');
  });

  test('should logout successfully', async ({ loginPage }) => {
    // First login
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Verify logged in
    expect(await loginPage.isLoggedIn()).toBeTruthy();

    // Logout
    await loginPage.logout();

    // Verify logout success message
    const flashMessage = await loginPage.getFlashMessage();
    expect(flashMessage).toContain('You logged out of the secure area!');
  });

  test('should redirect to secure area after login', async ({ loginPage, page }) => {
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Verify redirect to secure page
    await expect(page).toHaveURL(/secure/);
  });
});
