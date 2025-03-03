import Button from '@/components/modules/login/components/Button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Button Component', () => {
  let mockOnClick: jest.Mock;

  beforeEach(() => {
    mockOnClick = jest.fn();
  });

  // POSITIVE TEST CASES
  test('renders button with correct text', () => {
    render(<Button text="Submit" onClick={mockOnClick} />);

    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls onClick function when clicked', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />);

    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // NEGATIVE TEST CASES
  test('does not crash if onClick is not provided', () => {
    expect(() =>
      render(<Button text="No Action" onClick={() => {}} />)
    ).not.toThrow();
  });

  test('does not call onClick if button is not clicked', () => {
    render(<Button text="Don't Click" onClick={mockOnClick} />);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
