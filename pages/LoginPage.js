const { BasePage } = require('./BasePage');

/**
 * Login Page Object Model
 * Uses https://the-internet.herokuapp.com/login
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Selectors for the-internet.herokuapp.com/login
    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.loginButton = 'button[type="submit"]';
    this.flashMessage = '#flash';
    this.logoutButton = 'a.button[href="/logout"]';
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await this.navigate('/login');
  }

  /**
   * Enter username
   * @param {string} username
   */
  async enterUsername(username) {
    await this.fill(this.usernameInput, username);
  }

  /**
   * Enter password
   * @param {string} password
   */
  async enterPassword(password) {
    await this.fill(this.passwordInput, password);
  }

  /**
   * Click login button
   */
  async clickLogin() {
    await this.click(this.loginButton);
  }

  /**
   * Perform complete login
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Get flash message text
   * @returns {Promise<string|null>}
   */
  async getFlashMessage() {
    return await this.getText(this.flashMessage);
  }

  /**
   * Check if flash message is displayed
   * @returns {Promise<boolean>}
   */
  async isFlashMessageDisplayed() {
    return await this.isVisible(this.flashMessage);
  }

  /**
   * Check if login was successful (logout button visible)
   * @returns {Promise<boolean>}
   */
  async isLoggedIn() {
    return await this.isVisible(this.logoutButton);
  }

  /**
   * Logout
   */
  async logout() {
    await this.click(this.logoutButton);
  }
}

module.exports = { LoginPage };
