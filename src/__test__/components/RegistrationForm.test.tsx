import { fireEvent, render, screen } from '@testing-library/react';
import RegistrationForm from '../../app/components/RegistrationForm'; // Sesuaikan path dengan proyekmu

describe('RegistrationForm Component', () => {
  it('renders all input fields and button', () => {
    render(<RegistrationForm />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Konfirmasi Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Registrasi/i })
    ).toBeInTheDocument();
  });

  it('allows user to type into input fields', () => {
    render(<RegistrationForm />);

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      'Konfirmasi Password'
    ) as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
  });

  it('shows an alert if passwords do not match', () => {
    window.alert = jest.fn(); // Mock alert

    render(<RegistrationForm />);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password456' },
    });
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith('Password tidak cocok!');
  });

  it('shows an alert if registration is successful', () => {
    window.alert = jest.fn();

    render(<RegistrationForm />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(registerButton);

    expect(window.alert).toHaveBeenCalledWith('Registrasi berhasil!');
  });
});
