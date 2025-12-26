/**
 * Constants used across tests
 */

// Test timeouts
const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  EXTRA_LONG: 60000,
};

// Common URLs
const URLS = {
  LOGIN: '/login',
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

// Test user credentials (for demo purposes only)
const TEST_USERS = {
  ADMIN: {
    username: 'admin@test.com',
    password: 'admin123',
  },
  STANDARD: {
    username: 'user@test.com',
    password: 'user123',
  },
};

// HTTP Status codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

// Viewport sizes
const VIEWPORTS = {
  DESKTOP: { width: 1920, height: 1080 },
  LAPTOP: { width: 1366, height: 768 },
  TABLET: { width: 768, height: 1024 },
  MOBILE: { width: 375, height: 667 },
};

module.exports = {
  TIMEOUTS,
  URLS,
  TEST_USERS,
  HTTP_STATUS,
  VIEWPORTS,
};
