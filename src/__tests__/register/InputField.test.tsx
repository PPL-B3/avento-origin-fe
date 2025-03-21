import { InputField } from '@/components/modules/register/elements';
import { fireEvent, render, screen } from '@testing-library/react';

describe('InputField Component', () => {
  it('renders correctly with given label and placeholder', () => {
    render(
      <InputField
        label="Email"
        type="text"
        value=""
        onChange={() => {}}
        placeholder="Enter your email"
      />
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('calls onChange when text is entered', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        label="Username"
        type="text"
        value=""
        onChange={handleChange}
        placeholder="Enter your username"
      />
    );

    const input = screen.getByPlaceholderText('Enter your username');
    fireEvent.change(input, { target: { value: 'JohnDoe' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('toggles password visibility', () => {
    render(
      <InputField
        label="Password"
        type="password"
        value=""
        onChange={() => {}}
        placeholder="Enter password"
      />
    );

    const passwordInput = screen.getByPlaceholderText('Enter password');
    const toggleButton = screen.getByRole('button');

    expect(passwordInput).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('generates an id automatically if not provided', () => {
    render(
      <InputField
        label="Username"
        type="text"
        value=""
        onChange={() => {}}
        placeholder="Enter username"
      />
    );

    const input = screen.getByPlaceholderText('Enter username');
    expect(input).toHaveAttribute('id', 'username');
  });
});
