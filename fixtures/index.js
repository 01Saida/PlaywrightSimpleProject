/**
 * Fixtures Index - Export all fixtures from a single file
 */
const baseFixture = require('./baseFixture');
const apiFixture = require('./apiFixture');

module.exports = {
  baseTest: baseFixture.test,
  apiTest: apiFixture.test,
  expect: baseFixture.expect,
};
