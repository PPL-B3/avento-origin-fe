import { RegistrationForm } from '@/components/modules/register/elements';
import { fireEvent, render, screen } from '@testing-library/react';

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

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password123' },
    });

    expect(emailInput.value).toBe('test@gmail.com');
    expect(passwordInput.value).toBe('Password123');
    expect(confirmPasswordInput.value).toBe('Password123');
  });

  it('shows an alert if email  do not valid', () => {
    render(<RegistrationForm />);

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      'Konfirmasi Password'
    ) as HTMLInputElement;

    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'testgmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password123' },
    });
    fireEvent.click(registerButton);
  });

  it('shows an alert if passwords do not match', () => {
    render(<RegistrationForm />);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;

    const registerButton = screen.getByRole('button', { name: /Registrasi/i });
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123.' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password456.' },
    });
    fireEvent.click(registerButton);
  });

  it('shows an alert if registration is successful', () => {
    render(<RegistrationForm />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123.' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password123.' },
    });
    fireEvent.click(registerButton);
  });
});
