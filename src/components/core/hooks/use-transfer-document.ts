'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

export const useTransferDocument = () => {
  const client = useAventoClient();

  const { isLoading, mutateAsync: onTransferDocument } = useMutation(
    'transfer-document',
    {
      mutationFn: async (data: {
        documentId: string;
        pendingOwner: string;
      }) => {
        const res = await client.post(ENDPOINTS.TRANSFER_DOCUMENT, data);
        return res.data as { otp: string };
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
        toast.success('Email valid, OTP dikirim!');
      },
    }
  );

  const isLoadingTransferDocument = isLoading;

  return {
    onTransferDocument,
    isLoadingTransferDocument,
  };
};
