'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

export const useClaimDocument = () => {
  const client = useAventoClient();
  const [qrCodes, setQrCodes] = useState({ privateId: '', publicId: '' });

  const { isLoading, mutate: onClaimDocument } = useMutation('claim-document', {
    mutationFn: async (data: { documentId: string; otp: string }) => {
      const apiUrl = ENDPOINTS.CLAIM_DOCUMENT;

      const promise = client.post(apiUrl, data);

      const response = await promise;
      // Store the QR IDs from the response

      if (response.data?.privateId && response.data?.publicId) {
        setQrCodes({
          privateId: response.data.privateId,
          publicId: response.data.publicId,
        });
      }

      return response;
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      const errorMessage =
        error?.response?.data?.message ??
        error?.message ??
        'Something went wrong.';
      toast.error(errorMessage);
    },
    onSuccess: () => {
      toast.success('OTP Verified. Redirecting...');
    },
  });

  const isLoadingClaimDocument = isLoading;

  return {
    onClaimDocument,
    isLoadingClaimDocument,
    qrCodes,
  };
};
