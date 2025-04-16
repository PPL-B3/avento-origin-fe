import { z } from 'zod';

export interface ValidationRule {
  validate: (value: string) => boolean;
  errorMessage: string;
}

export const emailValidation = {
  validate: (email: string): boolean => {
    const emailSchema = z.string().email();
    try {
      emailSchema.parse(email);
      return true;
    } catch {
      console.error('Email validation error');
      return false;
    }
  },
  errorMessage: 'Email tidak valid!',
};

export const passwordValidationRules: ValidationRule[] = [
  {
    validate: (password) => password.length >= 8,
    errorMessage: 'Password harus memiliki minimal 8 karakter!',
  },
  {
    validate: (password) => /\d/.test(password),
    errorMessage: 'Password harus memiliki minimal 1 angka!',
  },
  {
    validate: (password) => /[a-zA-Z]/.test(password),
    errorMessage: 'Password harus memiliki minimal 1 huruf!',
  },
  {
    validate: (password) => /[!@#$%^&*]/.test(password),
    errorMessage: 'Password harus memiliki minimal 1 karakter spesial!',
  },
  {
    validate: (password) => /[a-z]/.test(password),
    errorMessage: 'Password harus memiliki minimal 1 huruf kecil!',
  },
  {
    validate: (password) => /[A-Z]/.test(password),
    errorMessage: 'Password harus memiliki minimal 1 huruf besar!',
  },
];

export const validatePassword = (password: string): string | null => {
  for (const rule of passwordValidationRules) {
    if (!rule.validate(password)) {
      return rule.errorMessage;
    }
  }
  return null;
};

export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): string | null => {
  return password === confirmPassword ? null : 'Password tidak cocok!';
};

export const validateRequiredFields = (
  fields: Record<string, string>
): string | null => {
  const emptyField = Object.values(fields).some((value) => !value);
  return emptyField ? 'Semua field harus diisi!' : null;
};
