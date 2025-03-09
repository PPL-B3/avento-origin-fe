'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRegister } from '../hooks/use-register';
import { Button } from './Button';
import { InputField } from './InputField';

export const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const { onRegister } = useRegister();

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      toast.error('Email tidak valid!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password tidak cocok!');
      return;
    }

    if (password.length < 8) {
      toast.error('Password harus memiliki minimal 8 karakter!');
      return;
    }

    if (password.search(/[0-9]/) < 0) {
      toast.error('Password harus memiliki minimal 1 angka!');
      return;
    }

    if (password.search(/[a-zA-Z]/) < 0) {
      toast.error('Password harus memiliki minimal 1 huruf!');
      return;
    }

    onRegister({ email, password });
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
      <InputField
        label="Konfirmasi Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Konfirmasi password"
        aria-label="Konfirmasi Password"
      />
      <Button text="Registrasi" onClick={handleSubmit} />
    </div>
  );
};
