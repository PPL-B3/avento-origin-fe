import '@testing-library/jest-dom';
import React from 'react';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    prefetch: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => '/'),
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
        React.createElement('div', { 'data-testid': 'toaster' })
      ),
  };
});

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    return React.createElement('img', props);
  },
}));

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
