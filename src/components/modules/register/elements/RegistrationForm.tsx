'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './Button';
import { InputField } from './InputField';

export const RegistrationForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
    toast.success('Registrasi berhasil!');
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button text="Registrasi" onClick={handleSubmit} />
        </AlertDialogTrigger>
        <AlertDialogContent className="flex flex-col items-center px-12">
          <AlertDialogHeader className="flex flex-col items-center">
            <AlertDialogTitle className="font-bold">
              REGISTRASI BERHASIL!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-950 pt-2 pb-4">
              Akun anda telah berhasil dibuat. Silahkan gunakan kredensial Anda
              untuk masuk ke dalam sistem!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogAction
              asChild
              className="w-full"
              onClick={() => router.push('/login')}
            >
              <Button text="Log in" onClick={handleSubmit} />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
