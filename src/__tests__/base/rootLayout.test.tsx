import RootLayout from '@/app/layout';
import { Toaster } from '@/components/ui/sonner';
import { render, screen } from '@testing-library/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Mock the imported components
jest.mock('@/components/ui/sonner', () => ({
  Toaster: jest.fn(() => <div data-testid="mock-toaster" />),
}));

jest.mock('@vercel/analytics/react', () => ({
  Analytics: jest.fn(() => <div data-testid="mock-analytics" />),
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: jest.fn(() => <div data-testid="mock-speed-insights" />),
}));

// Mock next/font/google
jest.mock('next/font/google', () => ({
  Geist: jest.fn(() => ({
    variable: 'mocked-geist-sans',
  })),
  Geist_Mono: jest.fn(() => ({
    variable: 'mocked-geist-mono',
  })),
}));

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('includes Toaster component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(Toaster).toHaveBeenCalled();
  });

  it('includes Analytics component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(Analytics).toHaveBeenCalled();
  });

  it('includes SpeedInsights component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(SpeedInsights).toHaveBeenCalled();
  });

  it('applies correct font classes to body', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = container.querySelector('body');
  });

  it('sets correct language attribute on html', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const html = document.documentElement;
    expect(html).toHaveAttribute('lang', 'en');
  });

  it('renders the layout with children', () => {
    render(
      <RootLayout>
        <div data-testid="test-children">Test Children Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('test-children')).toBeInTheDocument();
    expect(screen.getByText('Test Children Content')).toBeInTheDocument();
  });

  it('renders the Toaster component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('mock-toaster')).toBeInTheDocument();
  });

  it('renders Analytics and SpeedInsights components', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId('mock-analytics')).toBeInTheDocument();
    expect(screen.getByTestId('mock-speed-insights')).toBeInTheDocument();
  });

  it('sets the html lang attribute to "en"', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const html = document.querySelector('html');
    expect(html).toHaveAttribute('lang', 'en');
  });

  it('applies font variables to body classname', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = document.querySelector('body');
    expect(body).toHaveClass('mocked-geist-sans');
    expect(body).toHaveClass('mocked-geist-mono');
    expect(body).toHaveClass('antialiased');
  });
});
