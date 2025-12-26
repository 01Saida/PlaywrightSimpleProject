const { test: base } = require('@playwright/test');
const { createAuthHeaders } = require('../utils/apiHelper');

/**
 * API-specific fixtures for API testing
 */
const test = base.extend({
  /**
   * API context fixture with base configuration
   */
  apiContext: async ({ playwright }, use) => {
    const apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://api.example.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    await use(apiContext);
    await apiContext.dispose();
  },

  /**
   * Authenticated API context fixture
   */
  authenticatedApiContext: async ({ playwright }, use) => {
    // First, get authentication token
    const authContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://api.example.com',
    });

    // Login to get token (adjust endpoint as needed)
    const loginResponse = await authContext.post('/auth/login', {
      data: {
        email: 'testuser@example.com',
        password: 'password123',
      },
    });

    let token = '';
    if (loginResponse.ok()) {
      const body = await loginResponse.json();
      token = body.token || body.access_token || '';
    }

    await authContext.dispose();

    // Create authenticated context
    const apiContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL || 'https://api.example.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...createAuthHeaders(token),
      },
    });

    await use(apiContext);
    await apiContext.dispose();
  },

  /**
   * Test data fixture - provides reusable test data
   */
  testData: async ({}, use) => {
    const data = {
      user: {
        email: 'testuser@example.com',
        password: 'password123',
        name: 'Test User',
      },
      product: {
        id: 1,
        name: 'Test Product',
        price: 99.99,
      },
    };

    await use(data);
  },
});

const { expect } = require('@playwright/test');

module.exports = { test, expect };
