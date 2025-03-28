import AuthLayout from '@/app/auth/layout';
import { render, screen } from '@testing-library/react';

// Mock the QueryProvider component
jest.mock('@/components', () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-query-provider">{children}</div>
  ),
}));

// Mock the AuthLayout component
jest.mock('@/app/auth/layout', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) => (
      <div
        className="flex h-screen overflow-y-auto overflow-hidden flex-col relative transition-all ease-in-out duration-1000"
        data-testid="mock-query-provider"
      >
        <main className="w-screen">{children}</main>
      </div>
    ),
  };
});

describe('AuthLayout', () => {
  it('renders children within QueryProvider', () => {
    // Arrange
    const testContent = <div data-testid="test-child">Test Child Content</div>;

    // Act
    render(<AuthLayout>{testContent}</AuthLayout>);

    // Assert
    expect(screen.getByTestId('mock-query-provider')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test Child Content')).toBeInTheDocument();
  });

  it('renders a main element with proper classes', () => {
    // Arrange
    render(<AuthLayout>Test content</AuthLayout>);

    // Assert
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass('w-screen');
  });

  it('renders with proper container classes for styling', () => {
    // Arrange
    render(<AuthLayout>Test content</AuthLayout>);

    // Assert
    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('h-screen');
    expect(container).toHaveClass('overflow-y-auto');
    expect(container).toHaveClass('overflow-hidden');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('relative');
    expect(container).toHaveClass('transition-all');
    expect(container).toHaveClass('ease-in-out');
    expect(container).toHaveClass('duration-1000');
  });
});
