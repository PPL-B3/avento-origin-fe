'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import * as Sentry from '@sentry/nextjs';
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
      const promise = client.post(ENDPOINTS.LOGIN, { email, password });

      toast.promise(promise, {
        loading: 'Loading...',
        success: () => {
          return `Login successful!`;
        },
        error: (error) => {
          const errorMessage = error.response?.data?.message;
          if (Array.isArray(errorMessage)) {
            return errorMessage[0] || 'Something went wrong';
          } else if (typeof errorMessage === 'string') {
            return errorMessage;
          } else {
            return 'Something went wrong';
          }
        },
      });

      const { data } = await promise;

      return data;
    },
    {
      onSuccess: async (data) => {
        // Simpan token di cookies supaya bisa dikirim sebagai `Authorization: Bearer`
        setCookie('token', data.access_token, { maxAge: 3600, path: '/' });

        // Simpan user info di cookies biasa
        setCookie('user', JSON.stringify(data.user), {
          maxAge: 3600,
          path: '/',
        });

        // Update React Query cache with the user data
        queryClient.setQueryData('user', data.user);

        router.push('/upload-document');
      },
      onError: (error) => {
        console.error(error);
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
        router.push('/auth/login');
      },
      onError: () => {
        toast.error('Logout failed');
      },
    }
  );

  const login = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });

      // Track successful login event in Sentry
      Sentry.captureEvent({
        message: 'User login successful',
        level: 'info',
        tags: {
          action: 'login',
        },
        extra: {
          email: email, // Include email to track unique users
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error(error);

      // Track failed login attempt
      Sentry.captureEvent({
        message: 'User login failed',
        level: 'error',
        tags: {
          action: 'login_failed',
        },
        extra: {
          error,
        },
      });
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();

      // Track logout event in Sentry
      Sentry.captureEvent({
        message: 'User logout successful',
        level: 'info',
        tags: {
          action: 'logout',
        },
      });
    } catch (error) {
      console.error(error);

      // Track failed logout attempt
      Sentry.captureEvent({
        message: 'User logout failed',
        level: 'error',
        tags: {
          action: 'logout_failed',
        },
        extra: {
          error,
        },
      });
    }
  };

  return {
    user,
    isLoading: isLoading || loginMutation.isLoading || logoutMutation.isLoading,
    login,
    logout,
  };
};
