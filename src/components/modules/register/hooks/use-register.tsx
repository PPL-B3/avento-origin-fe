'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { registerSchema } from '../schema';

export const useRegister = () => {
  const client = useAventoClient();

  const { isLoading: mutateLoadingContent, mutate: onRegister } = useMutation(
    'register-user',
    {
      mutationFn: async (values: z.infer<typeof registerSchema>) => {
        const apiUrl = ENDPOINTS.REGISTER;
        const promise = client.post(apiUrl, values);
        toast.promise(promise, {
          loading: 'Loading...',
          success: () => {
            return `Registration successful!`;
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
        await promise;
      },
    }
  );

  const isLoadingRegister = mutateLoadingContent;

  return {
    onRegister,
    isLoadingRegister,
  };
};
