'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { UserProps } from '../../hooks';

interface AuthButtonsProps {
  user: UserProps;
  logout: () => void;
}

export function AuthButtons({ user, logout }: AuthButtonsProps) {
  const router = useRouter();

  return user ? (
    <Button
      onClick={logout}
      className="px-6 py-2 bg-red-500 text-white hover:bg-red-600"
    >
      Logout
    </Button>
  ) : (
    <Button
      onClick={() => router.push('/login')}
      className="px-6 py-2 bg-blue-600 text-white hover:scale-105 transition-transform duration-200 hover:bg-blue-700"
    >
      Login
    </Button>
  );
}
