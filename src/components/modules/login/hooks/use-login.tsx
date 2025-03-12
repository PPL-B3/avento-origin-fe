'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { registerSchema } from '../../register/schema';

export const useLogin = () => {
  const client = useAventoClient();

  const { isLoading: mutateLoadingContent, mutate: onLogin } = useMutation(
    'login-user',
    {
      mutationFn: async (values: z.infer<typeof registerSchema>) => {
        const apiUrl = ENDPOINTS.LOGIN;
        const promise = client.post(apiUrl, values);
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
        return await promise;
      },
    }
  );

  const isLoadingLogin = mutateLoadingContent;

  return {
    onLogin,
    isLoadingLogin,
  };
};
