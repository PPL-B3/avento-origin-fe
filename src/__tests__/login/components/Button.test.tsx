import { Button } from '@/components/ui/button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button Component', () => {
  let mockOnClick: jest.Mock;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  // POSITIVE TEST CASES
  test('renders button with correct text', () => {
    render(<Button onClick={mockOnClick}>Submit</Button>);

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick function when clicked', () => {
    render(<Button onClick={mockOnClick}>Click Me</Button>);

    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // NEGATIVE TEST CASES
  test('does not crash if onClick is not provided', () => {
    expect(() => render(<Button>No Action</Button>)).not.toThrow();
  });

  test('does not call onClick if button is not clicked', () => {
    render(<Button onClick={mockOnClick}>Don&apos;t Click</Button>);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
