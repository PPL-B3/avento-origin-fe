'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation } from 'react-query';

export const useTransferDocument = () => {
  const client = useAventoClient();

  return useMutation(
    async ({ documentId, email }: { documentId: string; email: string }) => {
      const { data } = await client.post(ENDPOINTS.TRANSFER_DOCUMENT, {
        documentId,
        email,
      });

      return data as { otp: string };
    }
  );
};
