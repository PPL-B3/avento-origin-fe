import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryProvider } from '@/components';
import BaseLayout from '@/app/(routes)/layout';

// Mock the components used in the layout
jest.mock('@/components', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="query-provider">{children}</div>,
}));

jest.mock('@/components/core/elements/Navbar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar">Navbar</div>,
  };
});

describe('BaseLayout', () => {
  it('renders the layout with QueryProvider', () => {
    render(
      <BaseLayout>
        <div data-testid="child-content">Test Content</div>
      </BaseLayout>
    );
    
    // Check if QueryProvider is rendered
    expect(screen.getByTestId('query-provider')).toBeInTheDocument();
  });

  it('renders the Navbar component', () => {
    render(
      <BaseLayout>
        <div>Test Content</div>
      </BaseLayout>
    );
    
    // Check if Navbar is rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <BaseLayout>
        <div data-testid="child-content">Test Content</div>
      </BaseLayout>
    );
    
    // Check if children are rendered
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('has the correct layout structure', () => {
    const { container } = render(
      <BaseLayout>
        <div>Test Content</div>
      </BaseLayout>
    );
    
    // Check if the main layout elements are present with correct classes
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('w-screen');
    
    const divElement = container.querySelector('div[data-testid="query-provider"] > div');
    expect(divElement).toHaveClass('flex', 'h-screen', 'overflow-y-auto', 'overflow-hidden', 'flex-col');
  });
});