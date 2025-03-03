'use client';

import { useState } from 'react';
import Button from './Button';
import InputField from './InputField';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      <Button
        text="Login"
        onClick={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </div>
  );
};

export default LoginForm;
