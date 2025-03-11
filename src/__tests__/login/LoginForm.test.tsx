import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/modules/login/components/LoginForm';
import { toast } from 'sonner';
import { useAuth } from '@/components/core';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock('@/components/core', () => ({
  useAuth: jest.fn(),
}));

describe('LoginForm', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ login: mockLogin });
  });

  it('renders login form with email and password inputs', () => {
    render(<LoginForm />);
    
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows error when email is invalid', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Email tidak valid!');
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows error when password has no numbers', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'noNumbers' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Password harus memiliki minimal 1 angka!');
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows error when password has no letters', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Password harus memiliki minimal 1 huruf!');
    });
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login when form is valid', async () => {
    render(<LoginForm />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'Password123');
    });
    expect(toast.error).not.toHaveBeenCalled();
  });
});