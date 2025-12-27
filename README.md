# Playwright Simple Project

A complete Playwright test automation framework with JavaScript, featuring Page Object Model (POM), custom fixtures, utilities, and multi-browser support.

## Project Structure

```
PlaywrightSimpleProject/
├── tests/                    # Test files
│   ├── api.spec.js           # API tests (JSONPlaceholder)
│   ├── example.spec.js       # Basic example tests
│   ├── home.spec.js          # Home page tests
│   └── login.spec.js         # Login page tests
├── pages/                    # Page Object Model
│   ├── BasePage.js           # Base page with common methods
│   ├── HomePage.js           # Home page object
│   ├── LoginPage.js          # Login page object
│   └── index.js              # POM exports
├── fixtures/                 # Custom Playwright fixtures
│   ├── baseFixture.js        # Page object fixtures
│   ├── apiFixture.js         # API testing fixtures
│   └── index.js              # Fixtures exports
├── utils/                    # Utility functions
│   ├── helpers.js            # General helper functions
│   ├── apiHelper.js          # API testing utilities
│   ├── constants.js          # Shared constants
│   └── index.js              # Utils exports
├── playwright.config.ts      # Playwright configuration
├── package.json              # Dependencies and scripts
└── .gitignore                # Git ignore file
```

## Features

- **Page Object Model (POM)**: Maintainable and reusable page objects
- **Custom Fixtures**: Pre-configured page instances and authentication states
- **Multi-Browser Testing**: Chrome and Firefox support out of the box
- **API Testing**: REST API test examples using JSONPlaceholder
- **Utility Functions**: Helpers for common operations
- **HTML Reports**: Built-in test reporting

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/01Saida/PlaywrightSimpleProject.git
   cd PlaywrightSimpleProject
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

```bash
# Run all tests (Chrome + Firefox)
npm test

# Run tests on Chrome only
npm run test:chromium

# Run tests on Firefox only
npm run test:firefox

# Run tests with visible browser
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with Playwright UI
npm run test:ui

# View HTML report
npm run report
```

## Test Sites Used

- **UI Tests**: [https://the-internet.herokuapp.com](https://the-internet.herokuapp.com) - A practice website for testing
- **API Tests**: [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) - A free fake REST API

### Test Credentials (for the-internet.herokuapp.com)
- Username: `tomsmith`
- Password: `SuperSecretPassword!`

## Configuration

The `playwright.config.ts` file contains:
- Base URL configuration
- Browser settings (Chrome, Firefox)
- Timeout settings
- Reporter configuration
- Screenshot and video on failure

## Writing New Tests

### Using Page Objects

```javascript
const { test, expect } = require('../fixtures/baseFixture');

test('example test', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('username', 'password');
  expect(await loginPage.isLoggedIn()).toBeTruthy();
});
```

### Using Fixtures

```javascript
const { test, expect } = require('../fixtures/baseFixture');

test('authenticated test', async ({ authenticatedPage }) => {
  // Page is already logged in
  await authenticatedPage.goto('/secure');
});
```

## Next Steps

### Immediate Improvements
1. **Add more page objects** - Create page objects for other pages you want to test
2. **Add test data management** - Implement data-driven testing with JSON/CSV files
3. **Add environment configuration** - Use `.env` files for different environments (dev, staging, prod)

### Advanced Features
4. **Add visual regression testing** - Use `@playwright/test` screenshot comparison
5. **Add accessibility testing** - Integrate `@axe-core/playwright` for a11y checks
6. **Add performance testing** - Use Playwright's built-in performance metrics
7. **Implement parallel execution** - Configure sharding for faster test runs

### CI/CD Integration
8. **GitHub Actions** - Add workflow for automated testing on PR/push
9. **Docker support** - Create Dockerfile for containerized test execution
10. **Slack/Teams notifications** - Add reporting to communication channels

### Code Quality
11. **Add ESLint** - Enforce code style and catch errors
12. **Add Prettier** - Consistent code formatting
13. **Add TypeScript** - Convert to TypeScript for better type safety
14. **Add JSDoc comments** - Improve documentation coverage

## Example: Adding a New Page Object

1. Create a new file in `pages/`:
   ```javascript
   // pages/CheckboxPage.js
   const { BasePage } = require('./BasePage');

   class CheckboxPage extends BasePage {
     constructor(page) {
       super(page);
       this.checkboxes = 'input[type="checkbox"]';
     }

     async goto() {
       await this.navigate('/checkboxes');
     }

     async toggleCheckbox(index) {
       await this.page.locator(this.checkboxes).nth(index).click();
     }
   }

   module.exports = { CheckboxPage };
   ```

2. Add to fixtures if needed
3. Write tests using the new page object

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
