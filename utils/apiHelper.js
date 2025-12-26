/**
 * API Helper utilities for Playwright tests
 */

/**
 * Make an API request using Playwright's request context
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} method
 * @param {string} endpoint
 * @param {object} options
 * @returns {Promise<import('@playwright/test').APIResponse>}
 */
async function makeRequest(request, method, endpoint, options = {}) {
  const { data, headers = {} } = options;

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    requestOptions.data = data;
  }

  switch (method.toUpperCase()) {
    case 'GET':
      return await request.get(endpoint, requestOptions);
    case 'POST':
      return await request.post(endpoint, requestOptions);
    case 'PUT':
      return await request.put(endpoint, requestOptions);
    case 'PATCH':
      return await request.patch(endpoint, requestOptions);
    case 'DELETE':
      return await request.delete(endpoint, requestOptions);
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
}

/**
 * Get response body as JSON
 * @param {import('@playwright/test').APIResponse} response
 * @returns {Promise<object>}
 */
async function getJsonResponse(response) {
  return await response.json();
}

/**
 * Verify response status
 * @param {import('@playwright/test').APIResponse} response
 * @param {number} expectedStatus
 * @returns {boolean}
 */
function verifyStatus(response, expectedStatus) {
  return response.status() === expectedStatus;
}

/**
 * Create authentication headers
 * @param {string} token
 * @returns {object}
 */
function createAuthHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

module.exports = {
  makeRequest,
  getJsonResponse,
  verifyStatus,
  createAuthHeaders,
};
