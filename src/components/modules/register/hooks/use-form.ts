'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import {
  emailValidation,
  validatePassword,
  validatePasswordMatch,
  validateRequiredFields,
} from '../utils/validation';
import { useRegister } from './use-register';

export interface RegisterFormState {
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegisterForm = () => {
  const [formState, setFormState] = useState<RegisterFormState>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const { onRegister, isLoadingRegister } = useRegister(setIsSuccess);

  const updateField = (field: keyof RegisterFormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    // Check required fields
    const requiredError = validateRequiredFields(
      Object.fromEntries(
        Object.entries(formState).map(([key, value]) => [key, String(value)])
      )
    );
    if (requiredError) {
      toast.error(requiredError);
      return false;
    }

    // Email validation
    if (!emailValidation.validate(formState.email)) {
      toast.error(emailValidation.errorMessage);
      return false;
    }

    // Password validation
    const passwordError = validatePassword(formState.password);
    if (passwordError) {
      toast.error(passwordError);
      return false;
    }

    // Password match validation
    const matchError = validatePasswordMatch(
      formState.password,
      formState.confirmPassword
    );
    if (matchError) {
      toast.error(matchError);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      onRegister({
        email: formState.email,
        password: formState.password,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred during registration'
      );
    }
  };

  return {
    formState,
    updateField,
    handleSubmit,
    isSuccess,
    setIsSuccess,
    isLoadingRegister,
  };
};
