'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

export const useClaimDocument = () => {
  const client = useAventoClient();
  const router = useRouter();

  const { isLoading, mutate: onClaimDocument } = useMutation('claim-document', {
    mutationFn: async (data: { documentId: string; otp: string }) => {
      const apiUrl = ENDPOINTS.CLAIM_DOCUMENT;

      await client.post(apiUrl, data);
    },
    onError: (error: {
      response?: { data?: { message?: string } };
      message?: string;
    }) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong.';
      toast.error(errorMessage);
    },
    onSuccess: () => {
      toast.success('OTP Verified. Redirecting...');
      router.push('/');
    },
  });

  const isLoadingClaimDocument = isLoading;

  return {
    onClaimDocument,
    isLoadingClaimDocument,
  };
};
