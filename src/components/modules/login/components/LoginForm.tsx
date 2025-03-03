'use client';

import { useState } from 'react';
import Button from './Button';
import InputField from './InputField';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!isValidEmail(email)) {
      alert('Email tidak valid!');
      return;
    }

    if (password.length < 6) {
      alert('Password harus memiliki setidaknya 6 karakter!');
      return;
    }

    console.log({ email, password });
    alert('Login berhasil!');
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

export default LoginForm;
