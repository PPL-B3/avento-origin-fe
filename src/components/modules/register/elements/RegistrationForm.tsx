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
import { Button } from '../../login/components';
import { useRegisterForm } from '../hooks/use-form';
import { InputField } from './InputField';

export const RegistrationForm = () => {
  const router = useRouter();
  const {
    formState,
    updateField,
    handleSubmit,
    isSuccess,
    setIsSuccess,
    isLoadingRegister,
  } = useRegisterForm();

  /* istanbul ignore next */
  return (
    <div className="flex flex-col items-center w-full max-w-md gap-6">
      <InputField
        label="Email"
        type="email"
        value={formState.email}
        onChange={(e) => updateField('email', e.target.value)}
        placeholder="abc@gmail.com"
        aria-label="Email"
      />
      <div className="flex flex-col gap-1">
        <InputField
          label="Password"
          type="password"
          value={formState.password}
          onChange={(e) => updateField('password', e.target.value)}
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
        value={formState.confirmPassword}
        onChange={(e) => updateField('confirmPassword', e.target.value)}
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
