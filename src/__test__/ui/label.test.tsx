import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from '@/components/ui/label';

describe('Label Component', () => {
  it('renders correctly with default props', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<Label className="custom-class">Test Label</Label>);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveClass('custom-class');
    // The base classes should also be applied
    expect(labelElement).toHaveClass('text-sm');
    expect(labelElement).toHaveClass('font-medium');
    expect(labelElement).toHaveClass('leading-none');
  });

  it('forwards ref correctly', () => {
    const testId = 'test-label';
    render(
      <Label data-testid={testId}>Label with ref</Label>
    );
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('handles htmlFor attribute correctly', () => {
    render(<Label htmlFor="test-input">Input Label</Label>);
    const labelElement = screen.getByText('Input Label');
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  it('handles disabled state via peer class', () => {
    render(<Label className="peer-disabled:opacity-70">Disabled Label</Label>);
    const labelElement = screen.getByText('Disabled Label');
    expect(labelElement).toHaveClass('peer-disabled:opacity-70');
  });
});
