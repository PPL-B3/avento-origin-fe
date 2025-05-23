'use client';

import { useAuth } from '@/components/core';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { InputField } from '../../register/elements';
import { Button } from './Button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading } = useAuth();

  const isValidEmail = (email: string) => {
    const emailSchema = z.string().email();
    try {
      emailSchema.parse(email);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!isValidEmail(email)) {
      toast.error('Email tidak valid!');
      return;
    }
    if (password.length < 8) {
      toast.error('Password harus memiliki minimal 8 karakter!');
      return;
    }

    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-6">
      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="abc@gmail.com"
        aria-label="Email"
      />
      <InputField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan password"
        aria-label="Password"
      />
      <Button text="Login" onClick={handleSubmit} disabled={isLoading} />
    </div>
  );
};
