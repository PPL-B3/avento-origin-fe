'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'sonner';

export interface UserProps {
  id: string;
  email: string;
  role: string;
  lastLogout: string;
}

export const useAuth = () => {
  const client = useAventoClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery(
    'user',
    async () => {
      const storedUser = getCookie('user');
      const token = getCookie('token');

      if (storedUser && token) {
        return JSON.parse(storedUser as string) as UserProps;
      }
      return null;
    },
    {
      staleTime: Infinity, // Don't refetch automatically
      cacheTime: Infinity, // Keep in cache
    }
  );

  // Login mutation
  const loginMutation = useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      const { data } = await client.post(ENDPOINTS.LOGIN, { email, password });

      if (!data.access_token) {
        throw new Error('Login failed: No token received');
      }

      return data;
    },
    {
      onSuccess: (data) => {
        // Simpan token di cookies supaya bisa dikirim sebagai `Authorization: Bearer`
        setCookie('token', data.access_token, { maxAge: 3600, path: '/' });

        // Simpan user info di cookies biasa
        setCookie('user', JSON.stringify(data.user), {
          maxAge: 3600,
          path: '/',
        });

        // Update React Query cache with the user data
        queryClient.setQueryData('user', data.user);

        toast.success('Login successful!');
        router.push('/');
      },
      onError: (error) => {
        console.log(error);
        toast.error('Login failed');
      },
    }
  );

  // Logout mutation
  const logoutMutation = useMutation(
    async () => {
      if (!user) return;
      return await client.post(ENDPOINTS.LOGOUT, { userId: user.id });
    },
    {
      onSuccess: () => {
        // Hapus cookies setelah logout
        deleteCookie('token');
        deleteCookie('user');

        // Clear the user from React Query cache
        queryClient.setQueryData('user', null);

        toast.success('Logout successful!');
        router.push('/');
      },
      onError: () => {
        toast.error('Logout failed');
      },
    }
  );

  const login = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user,
    isLoading: isLoading || loginMutation.isLoading || logoutMutation.isLoading,
    login,
    logout,
  };
};
