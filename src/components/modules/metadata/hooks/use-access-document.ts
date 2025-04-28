'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

export const useAccessDocument = (onSuccessCallback?: () => void) => {
  const client = useAventoClient();
  const { mutateAsync: accessDocument, isLoading: isLoadingAccessDocument } =
    useMutation('access-document', {
      mutationFn: async (data: { qrId: string; otp: string }) => {
        const apiUrl = ENDPOINTS.ACCESS_DOCUMENT;
        const promise = client.post(apiUrl, data);

        toast.promise(promise, {
          loading: 'Verifying OTP...',
          success: () => {
            return `OTP Verified.`;
          },
          error: (error) => {
            const errorMessage = error.response?.data?.message;
            if (Array.isArray(errorMessage)) {
              return errorMessage[0] ?? 'Something went wrong';
            } else if (typeof errorMessage === 'string') {
              return errorMessage;
            } else {
              return 'Something went wrong';
            }
          },
        });

        const response = await promise;
        return response;
      },
      onSuccess: () => {
        onSuccessCallback?.();
      },
    });

  return {
    accessDocument,
    isLoadingAccessDocument,
  };
};
