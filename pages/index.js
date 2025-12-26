/**
 * Page Objects Index - Export all page objects from a single file
 */
const { BasePage } = require('./BasePage');
const { LoginPage } = require('./LoginPage');
const { HomePage } = require('./HomePage');

module.exports = {
  BasePage,
  LoginPage,
  HomePage,
};
