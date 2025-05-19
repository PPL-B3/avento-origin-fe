'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { UserProps } from '../../hooks';

interface AuthButtonsProps {
  user: UserProps | null;
  logout: () => void;
}

export function AuthButtons({ user, logout }: AuthButtonsProps) {
  const router = useRouter();

  return user ? (
    <Button onClick={logout} variant="destructive">
      Logout
    </Button>
  ) : (
    <Button
      onClick={() => router.push('/auth/login')}
      variant="primary"
      className="px-6"
    >
      Login
    </Button>
  );
}
