# Test Structure for Precision Typography Toolkit

## Overview
This directory contains unit tests for the Precision Typography Toolkit using Vitest.

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Organization

Tests are co-located with their source files using the `.test.ts` or `.test.tsx` naming convention:

```
src/
  utils/
    getCorrectedMetrics.ts
    getCorrectedMetrics.test.ts  ← Unit test
    getFontCategory.ts
    getFontCategory.test.ts      ← Unit test
```

## Test Structure

### Unit Tests (Utils)
- **getCorrectedMetrics.test.ts**: Tests font metric correction logic
- **getFontCategory.test.ts**: Tests font classification algorithm

### Component Tests (To be added)
Component tests should follow this pattern:
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { YourComponent } from './YourComponent';

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Coverage Goals
- Aim for >80% coverage on utility functions
- Focus on edge cases and error handling
- Test component rendering and user interactions

## Best Practices
1. **Descriptive test names**: Use clear, behavior-focused descriptions
2. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification
3. **Test edge cases**: Don't just test happy paths
4. **Avoid implementation details**: Test behavior, not internal structure
5. **Use meaningful assertions**: Prefer specific matchers over generic ones

## Configuration
- Setup file: `src/test/setup.ts`
- Config file: `vitest.config.ts`
- CSS Modules: Automatically mocked
- Path aliases: Fully supported (@utils, @components, etc.)
