'use client';

import LoginForm from '@/components/modules/login/components/LoginForm';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { toast } from 'sonner';

// Mock the toast library
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('LoginForm', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders login form with all elements', () => {
    render(<LoginForm />);

    // Check that all form elements are present
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('abc@gmail.com')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Masukkan password')
    ).toBeInTheDocument();
  });

  test('validates email format correctly', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    // Input invalid email first
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    // Submit form with invalid email
    act(() => {
      fireEvent.click(loginButton);
    });

    // First assertion for invalid email case
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid!');
    expect(toast.success).not.toHaveBeenCalled();

    jest.clearAllMocks(); // Clear the toast calls

    // Now try with valid email
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    });

    // Submit form again with valid email
    act(() => {
      fireEvent.click(loginButton);
    });

    // Email should now be valid, so should not see that error
    expect(toast.error).not.toHaveBeenCalledWith('Email tidak valid!');
    // But we might see password error, so we're not checking toast.error was never called
  });

  test('validates password length correctly', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    // Valid email but short password first
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'pass' } });
    });

    // Submit form with short password
    act(() => {
      fireEvent.click(loginButton);
    });

    // First assertion for short password case
    expect(toast.error).toHaveBeenCalledWith(
      'Password harus memiliki setidaknya 6 karakter!'
    );
    expect(toast.success).not.toHaveBeenCalled();

    jest.clearAllMocks(); // Clear the toast calls

    // Now try with valid password
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    // Submit form again with valid password
    act(() => {
      fireEvent.click(loginButton);
    });

    // Password should now be valid
    expect(toast.error).not.toHaveBeenCalledWith(
      'Password harus memiliki setidaknya 6 karakter!'
    );
    // Now we should see success toast
    expect(toast.success).toHaveBeenCalledWith('Login berhasil!');
  });

  test('shows success toast on valid form submission', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');

    // Enter valid credentials
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    // Mock console.log
    const consoleSpy = jest.spyOn(console, 'log');

    // Submit the form
    act(() => {
      fireEvent.click(loginButton);
    });

    // Check success toast is shown
    expect(toast.success).toHaveBeenCalledWith('Login berhasil!');
    expect(toast.error).not.toHaveBeenCalled();

    // Check form data was logged
    expect(consoleSpy).toHaveBeenCalledWith({
      email: 'valid@example.com',
      password: 'password123',
    });

    consoleSpy.mockRestore();
  });

  test('updates state when input values change', () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    // Type into inputs using fireEvent
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    });

    // Check updated values
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('testpassword');
  });
});
