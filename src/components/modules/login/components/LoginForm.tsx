'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { InputField } from '../../register/elements';
import { Button } from './Button';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailSchema = z.string().email();

  const isValidEmail = (email: string) => {
    const result = emailSchema.safeParse(email);
    return result.success;
  };

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
    <div className="flex flex-col items-center w-full max-w-md">
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
    </div>
  );
};
