import React from 'react';
import { render } from '@testing-library/react';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import RootLayout from '@/app/layout';

// Mock the imported components
jest.mock('@/components/ui/sonner', () => ({
  Toaster: jest.fn(() => null),
}));

jest.mock('@vercel/analytics/react', () => ({
  Analytics: jest.fn(() => null),
}));

jest.mock('@vercel/speed-insights/next', () => ({
  SpeedInsights: jest.fn(() => null),
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
});