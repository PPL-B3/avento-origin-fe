'use client';

import { signIn } from '@/lib/auth/auth';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { InputField } from '../../register/elements';
import { Button } from './Button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailSchema = z.string().email();
  const [state, action] = useFormState(signIn, undefined);

  const isValidEmail = (email: string) => {
    const result = emailSchema.safeParse(email);
    return result.success;
  };

  // Show toast notifications when state changes and has errors
  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
    if (state?.error?.email) {
      toast.error(state.error.email);
    }
    if (state?.error?.password) {
      toast.error(state.error.password);
    }
  }, [state]);

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      toast.error('Email tidak valid!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password harus memiliki setidaknya 6 karakter!');
      return;
    }

    console.log({ email, password });
    toast.success('Login berhasil!');
  };

  return (
    <form
      action={action}
      className="flex flex-col items-center w-full max-w-md"
    >
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
      <Button text="Login" onClick={handleSubmit} />
    </form>
  );
};
