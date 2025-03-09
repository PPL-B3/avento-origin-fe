import '@testing-library/jest-dom';
import React, { createElement } from 'react';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return {
      get: jest.fn(),
      getAll: jest.fn(),
      has: jest.fn(),
      forEach: jest.fn(),
      entries: jest.fn(),
      keys: jest.fn(),
      values: jest.fn(),
      toString: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useParams() {
    return {};
  },
}));

// Mock sonner toast
jest.mock('sonner', () => {
  return {
    toast: {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      info: jest.fn(),
    },
    Toaster: jest
      .fn()
      .mockImplementation(() =>
        createElement('div', { 'data-testid': 'toaster' })
      ),
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return createElement('img', props);
  },
}));

// Add any other mocks needed for your application
