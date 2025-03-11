import BaseLayout from '@/app/(routes)/layout';
import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock the QueryProvider component
jest.mock('@/components', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-query-provider">{children}</div>
  ),
}));

describe('BaseLayout', () => {
  it('renders children within QueryProvider', () => {
    const testChild = <div data-testid="test-child">Test Child Content</div>;

    render(<BaseLayout>{testChild}</BaseLayout>);

    // Check if QueryProvider is rendered
    const queryProvider = screen.getByTestId('mock-query-provider');
    expect(queryProvider).toBeInTheDocument();

    // Check if children are rendered
    const child = screen.getByTestId('test-child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Test Child Content');
  });

  it('has the correct CSS classes', () => {
    const testChild = <div>Test Child</div>;

    render(<BaseLayout>{testChild}</BaseLayout>);

    // Find the main container div
    const divElement =
      screen.getByText('Test Child').parentElement?.parentElement;
    expect(divElement).toHaveClass('relative');
    expect(divElement).toHaveClass('transition-all');
    expect(divElement).toHaveClass('ease-in-out');
    expect(divElement).toHaveClass('duration-1000');
    expect(divElement).toHaveClass('flex');
    expect(divElement).toHaveClass('h-screen');
    expect(divElement).toHaveClass('overflow-y-auto');
    expect(divElement).toHaveClass('overflow-hidden');
    expect(divElement).toHaveClass('flex-col');

    // Check if main element has the correct class
    const mainElement = screen.getByText('Test Child').parentElement;
    expect(mainElement).toHaveClass('w-screen');
  });
});
