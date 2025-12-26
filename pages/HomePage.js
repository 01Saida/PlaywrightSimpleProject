const { BasePage } = require('./BasePage');

/**
 * Home Page Object Model
 * Uses https://the-internet.herokuapp.com
 */
class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Selectors for the-internet.herokuapp.com
    this.heading = 'h1.heading';
    this.subheading = 'h2';
    this.availableExamples = 'ul li a';
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await this.navigate('/');
  }

  /**
   * Get the main heading text
   * @returns {Promise<string|null>}
   */
  async getHeading() {
    return await this.getText(this.heading);
  }

  /**
   * Get the subheading text
   * @returns {Promise<string|null>}
   */
  async getSubheading() {
    return await this.getText(this.subheading);
  }

  /**
   * Get count of available examples
   * @returns {Promise<number>}
   */
  async getExamplesCount() {
    return await this.page.locator(this.availableExamples).count();
  }

  /**
   * Click on a specific example link by text
   * @param {string} linkText
   */
  async clickExample(linkText) {
    await this.page.locator(this.availableExamples, { hasText: linkText }).click();
  }

  /**
   * Check if heading is visible
   * @returns {Promise<boolean>}
   */
  async isHeadingVisible() {
    return await this.isVisible(this.heading);
  }
}

module.exports = { HomePage };
