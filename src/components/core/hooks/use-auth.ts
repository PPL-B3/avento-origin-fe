'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export interface UserProps {
  id: string;
  email: string;
  role: string;
  lastLogout: string;
}

export const useAuth = () => {
  const client = useAventoClient();
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = getCookie('user');
    const token = getCookie('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser as string));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await client.post(ENDPOINTS.LOGIN, { email, password });

      if (!data.access_token)
        throw new Error('Login failed: No token received');

      setUser(data.user);

      // Simpan token di cookies supaya bisa dikirim sebagai `Authorization: Bearer`
      setCookie('token', data.access_token, { maxAge: 3600, path: '/' });

      // Simpan user info di cookies biasa
      setCookie('user', JSON.stringify(data.user), { maxAge: 3600, path: '/' });

      toast.success('Login successful!');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Login failed');
    }
  };

  const logout = async () => {
    try {
      if (!user) return;

      await client.post(ENDPOINTS.LOGOUT, { userId: user.id });

      // Hapus cookies setelah logout
      deleteCookie('token');
      deleteCookie('user');

      setUser(null);
      toast.success('Logout successful!');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Logout failed');
    }
  };

  return { user, isLoading, login, logout };
};
