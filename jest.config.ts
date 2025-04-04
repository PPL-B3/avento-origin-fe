import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Ignore Playwright test files
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/',
    '/.next/',
    '\\.playwright\\.ts$',
    '\\.spec\\.ts$',
    '\\.e2e\\.ts$',
  ],
  // Collect coverage from all source files except these
  collectCoverageFrom: [
    'src/**/*.{js,jsx,tsx}',
    '!src/**/*.d.ts',
    '!src/**/_*.{js,jsx,ts,tsx}',
    '!src/components/core/providers/**',
    '!src/middleware.ts',
    '!src/**/types/**',
    '!**/*.config.ts',
    '!**/node_modules/**',
    '!src/lib/**',
    '!src/components/ui/**',
    '!src/components/core/elements/data-table/**',
    '!src/app/**',
  ],
  // Output directory for coverage reports
  coverageDirectory: 'coverage',
  // Coverage reports formats for SonarQube
  coverageReporters: ['lcov', 'text', 'cobertura'],
  // Minimum threshold enforcement for coverage results
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config
export default createJestConfig(customJestConfig);
