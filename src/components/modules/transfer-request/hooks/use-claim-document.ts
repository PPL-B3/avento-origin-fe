'use client';

import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ENDPOINTS, useAventoClient } from '@/components/core';

export const useClaimDocument = () => {
  const client = useAventoClient();
  const router = useRouter();

  const { isLoading, mutate: onClaimDocument } = useMutation(
    'claim-document',
    {
      mutationFn: async (data: { documentId: string; otp: string }) => {
        const apiUrl = ENDPOINTS.CLAIM_DOCUMENT;
        
        await client.post(apiUrl, data);
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || error?.message || 'Something went wrong.';
        toast.error(errorMessage);
      },
      onSuccess: () => {
        toast.success('OTP Verified. Redirecting...');
        router.push('/');
      },
    }
  );

  const isLoadingClaimDocument = isLoading;

  return {
    onClaimDocument,
    isLoadingClaimDocument,
  };
};
