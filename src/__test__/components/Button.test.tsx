import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../../app/components/Button'; // Sesuaikan dengan path Button.tsx

describe('Button Component', () => {
  it('renders correctly with given text', () => {
    render(<Button text="Click Me" onClick={() => {}} />);
    expect(
      screen.getByRole('button', { name: /Click Me/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button text="Click Me" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: /Click Me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has the correct Tailwind CSS classes', () => {
    render(<Button text="Click Me" onClick={() => {}} />);
    const button = screen.getByRole('button', { name: /Click Me/i });

    expect(button).toHaveClass(
      'btn-primary',
      'w-full',
      'rounded-2xl',
      'h-12',
      'mt-4'
    );
  });
});
