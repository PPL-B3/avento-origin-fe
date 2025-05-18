'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import * as Sentry from '@sentry/nextjs';
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
              Sentry.captureException(new Error(errorMessage[0]));
              return errorMessage[0] ?? 'Something went wrong';
            } else if (typeof errorMessage === 'string') {
              Sentry.captureException(new Error(errorMessage));
              return errorMessage;
            } else {
              return 'Something went wrong';
            }
          },
        });

        const response = await promise;
        return response;
      },
      onSuccess: (data) => {
        // Track successful document access event in Sentry
        Sentry.captureEvent({
          message: 'Document access successful',
          level: 'info',
          tags: {
            action: 'document_access',
          },
          extra: {
            qrId: data?.config?.data?.qrId,
            timestamp: new Date().toISOString(),
          },
        });

        onSuccessCallback?.();
      },
    });

  return {
    accessDocument,
    isLoadingAccessDocument,
  };
};
