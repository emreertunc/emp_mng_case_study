# ING Employee Management App

An employee management application developed as a case study for ING Hubs

## Live Demo

Test the application at [https://ing-case-study.netlify.app/](https://ing-case-study.netlify.app/)

## Features

- LitElement JS for web components
- View employee list as Table or List
- Add, edit and delete employee records
- Search Employees
- Vaadin Router for client-side routing
- i18n for Localization (TR, EN)
- Unit Tests with 85%+ coverage
- Responsive design

## Setup

```bash
# Node.js and npm are required
npm install

# Install test browsers
npx playwright install

# Start development server
npm run serve
```

## Testing

```bash
# Run tests in development mode
npm run test:dev

# Run tests in production mode
npm run test:prod
```

### Test Coverage

The application has comprehensive test coverage for:

- Components (employee-table, employee-list, employee-form, confirm-dialog)
- Services (employee-service)
- Utils (validators)

Each component is tested for:
- Rendering
- Event handling
- State management
- Edge cases
- Error conditions
