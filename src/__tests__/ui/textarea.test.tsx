import { Textarea } from '@/components/ui/textarea';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Textarea component', () => {
  test('renders textarea with default props', () => {
    render(<Textarea data-testid="test-textarea" />);
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Textarea data-testid="test-textarea" className="custom-class" />);
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toHaveClass('custom-class');
  });

  test('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} data-testid="test-textarea" />);
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBe(screen.getByTestId('test-textarea'));
  });

  test('passes additional props to textarea element', () => {
    render(
      <Textarea data-testid="test-textarea" placeholder="Enter text here" />
    );
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text here');
  });

  // This test is just to verify displayName is set correctly
  test('has correct displayName', () => {
    expect(Textarea.displayName).toBe('Textarea');
  });
});
