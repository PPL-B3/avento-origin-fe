'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../../login/components';
import { useRegister } from '../hooks/use-register';
import { InputField } from './InputField';

export const RegistrationForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const [isSuccess, setIsSuccess] = useState(false);

  const { onRegister, isLoadingRegister } = useRegister(setIsSuccess);

  const handleSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error('Semua field harus diisi!');
      return;
    }

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

    if (password.search(/\d/) < 0) {
      toast.error('Password harus memiliki minimal 1 angka!');
      return;
    }

    if (password.search(/[a-zA-Z]/) < 0) {
      toast.error('Password harus memiliki minimal 1 huruf!');
      return;
    }

    if (password.search(/[!@#$%^&*]/) < 0) {
      toast.error('Password harus memiliki minimal 1 karakter spesial!');
      return;
    }

    if (password.search(/[a-z]/) < 0) {
      toast.error('Password harus memiliki minimal 1 huruf kecil!');
      return;
    }

    if (password.search(/[A-Z]/) < 0) {
      toast.error('Password harus memiliki minimal 1 huruf besar!');
      return;
    }

    /* istanbul ignore next */
    try {
      onRegister({ email, password });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'An error occurred during registration'
      );
    }
  };

  /* istanbul ignore next */
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
      <div className="flex flex-col gap-1">
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password"
          aria-label="Password"
        />
        <p className="text-xs">
          * Password minimal 8 karakter, mengandung huruf besar, huruf kecil,
          angka, dan karakter spesial
        </p>
      </div>
      <InputField
        label="Konfirmasi Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Konfirmasi password"
        aria-label="Konfirmasi Password"
      />
      <Button
        text="Registrasi"
        onClick={handleSubmit}
        disabled={isLoadingRegister}
      />
      <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
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
              <Button
                onClick={() => router.push('/login')}
                text="Log in"
                disabled={isLoadingRegister}
              />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
