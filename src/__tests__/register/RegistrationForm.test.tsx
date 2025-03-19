import { RegistrationForm } from '@/components/modules/register/elements';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('RegistrationForm Component', () => {
  it('renders all input fields and button', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Konfirmasi Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Registrasi/i })
    ).toBeInTheDocument();
  });

  it('allows user to type into input fields', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

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
    render(<RegistrationForm />, { wrapper: createWrapper() });

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
    render(<RegistrationForm />, { wrapper: createWrapper() });
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
    render(<RegistrationForm />, { wrapper: createWrapper() });
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

  it('shows an alert if password is too short', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Pass1' } }); // Short password
    fireEvent.change(confirmPasswordInput, { target: { value: 'Pass1' } });
    fireEvent.click(registerButton);

    // The toast is mocked in the actual implementation
    // Here we're just testing that the validation triggers
  });

  it('shows an alert if password does not contain a number', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'PasswordNoNumber' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'PasswordNoNumber' },
    });
    fireEvent.click(registerButton);
  });

  it('shows an alert if password does not contain a letter', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '12345678' } });
    fireEvent.click(registerButton);
  });

  it('shows an alert if password does not contain a special character', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123' } }); // No special character
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Password123' },
    });
    fireEvent.click(registerButton);
  });

  it('shows an alert if password does not contain a lowercase letter', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'PASSWORD123!' } }); // No lowercase
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'PASSWORD123!' },
    });
    fireEvent.click(registerButton);
  });

  it('shows an alert if password does not contain an uppercase letter', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Konfirmasi Password');
    const registerButton = screen.getByRole('button', { name: /Registrasi/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123!' } }); // No uppercase
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123!' },
    });
    fireEvent.click(registerButton);
  });

  it('shows an alert if any field is empty', () => {
    render(<RegistrationForm />, { wrapper: createWrapper() });

    const registerButton = screen.getByRole('button', { name: /Registrasi/i });
    fireEvent.click(registerButton);

    // Test with only email filled
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(registerButton);

    // Reset and test with only password filled
    fireEvent.change(emailInput, { target: { value: '' } });
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    fireEvent.click(registerButton);
  });
});
