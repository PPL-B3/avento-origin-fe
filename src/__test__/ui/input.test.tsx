import { Input } from '@/components/ui/input';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Input component', () => {
  test('renders input with default props', () => {
    render(<Input data-testid="test-input" />);
    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
  });

  test('applies custom className', () => {
    render(<Input data-testid="test-input" className="custom-class" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveClass('custom-class');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} data-testid="test-input" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('test-input'));
  });

  test('passes type prop to input element', () => {
    render(<Input data-testid="test-input" type="password" />);
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('passes additional props to input element', () => {
    render(
      <Input
        data-testid="test-input"
        placeholder="Enter text"
        aria-label="Input"
      />
    );
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toHaveAttribute('aria-label', 'Input');
  });

  // This test is just to verify displayName is set correctly
  test('has correct displayName', () => {
    expect(Input.displayName).toBe('Input');
  });
});
