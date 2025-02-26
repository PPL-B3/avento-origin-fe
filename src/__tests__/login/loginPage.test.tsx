import LoginPage from '@/app/auth/login/page';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  it('renders the login form', () => {
    render(<LoginPage />);
    expect(
      screen.getByText(
        'Selamat Datang! Silahkan input email dan password untuk login. Belum punya akun? silahkan registrasi'
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('abc@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('LOGIN')).toBeInTheDocument();
    expect(screen.getByText('REGISTRASI')).toBeInTheDocument();
  });

  it('navigates to register page when registrasi button is clicked', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({
      push: pushMock,
    }));

    render(<LoginPage />);
    fireEvent.click(screen.getByText('REGISTRASI'));
    expect(pushMock).toHaveBeenCalledWith('/auth/register');
  });

  it('submits the form with email and password', () => {
    render(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('abc@gmail.com');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Login');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
  });
});
