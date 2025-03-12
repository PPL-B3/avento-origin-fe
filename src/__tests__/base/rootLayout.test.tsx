import RootLayout from '@/app/layout';
import { render, screen } from '@testing-library/react';

// Mock the dependencies
jest.mock('@/components/core/elements/Navbar', () => {
  return function MockedNavbar() {
    return <div data-testid="navbar">Navbar Component</div>;
  };
});

jest.mock('@/components/ui/sonner', () => ({
  Toaster: function MockedToaster() {
    return <div data-testid="toaster">Toaster Component</div>;
  },
}));

jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: 'mocked-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: 'mocked-geist-mono',
  }),
}));

describe('RootLayout Component', () => {
  it('renders the layout with navbar, children, and toaster', () => {
    const testContent = <div data-testid="test-children">Test Content</div>;

    render(<RootLayout>{testContent}</RootLayout>);

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  it('sets the correct html lang attribute', () => {
    const testContent = <div>Test Content</div>;

    const { container } = render(<RootLayout>{testContent}</RootLayout>);

    const htmlElement = document.documentElement;
    expect(htmlElement).toHaveAttribute('lang', 'en');
  });
});
