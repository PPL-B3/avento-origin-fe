import LoginForm from '@/components/modules/login/components/LoginForm';
import { fireEvent, render, screen } from '@testing-library/react';

describe('LoginForm Component', () => {
  test('renders email and password input fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  test('allows user to type in email and password fields', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('shows alert for invalid email', () => {
    window.alert = jest.fn(); // Mock alert

    render(<LoginForm />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith('Email tidak valid!');
  });

  test('shows alert for password shorter than 6 characters', () => {
    window.alert = jest.fn(); // Mock alert

    render(<LoginForm />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } }); // Password too short
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith(
      'Password harus memiliki setidaknya 6 karakter!'
    );
  });

  test('shows success message for valid credentials', () => {
    window.alert = jest.fn(); // Mock alert

    render(<LoginForm />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    expect(window.alert).toHaveBeenCalledWith('Login berhasil!');
  });
});
