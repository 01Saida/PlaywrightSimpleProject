/**
 * Base Page Object - Contains common methods for all pages
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param {string} url
   */
  async navigate(url) {
    await this.page.goto(url);
  }

  /**
   * Get the page title
   * @returns {Promise<string>}
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Wait for an element to be visible
   * @param {string} selector
   * @param {number} timeout
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  /**
   * Click an element
   * @param {string} selector
   */
  async click(selector) {
    await this.page.click(selector);
  }

  /**
   * Fill a text input
   * @param {string} selector
   * @param {string} text
   */
  async fill(selector, text) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content from an element
   * @param {string} selector
   * @returns {Promise<string|null>}
   */
  async getText(selector) {
    return await this.page.textContent(selector);
  }

  /**
   * Check if an element is visible
   * @param {string} selector
   * @returns {Promise<boolean>}
   */
  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  /**
   * Take a screenshot
   * @param {string} name
   */
  async screenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}

module.exports = { BasePage };
