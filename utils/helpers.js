/**
 * Helper utilities for Playwright tests
 */

/**
 * Generate a random string
 * @param {number} length
 * @returns {string}
 */
function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email
 * @param {string} domain
 * @returns {string}
 */
function generateRandomEmail(domain = 'test.com') {
  return `test_${generateRandomString(8)}@${domain}`;
}

/**
 * Wait for a specified duration
 * @param {number} ms - milliseconds to wait
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

/**
 * Parse JSON safely
 * @param {string} jsonString
 * @param {*} defaultValue
 * @returns {*}
 */
function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch {
    return defaultValue;
  }
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn
 * @param {number} maxRetries
 * @param {number} delay
 * @returns {Promise<*>}
 */
async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await sleep(delay * Math.pow(2, i));
    }
  }
}

module.exports = {
  generateRandomString,
  generateRandomEmail,
  sleep,
  formatDate,
  safeJsonParse,
  retryWithBackoff,
};
