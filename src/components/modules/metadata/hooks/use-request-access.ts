'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation } from 'react-query';

export const useRequestAccess = () => {
  const client = useAventoClient();
  const { mutateAsync: requestAccess, isLoading: isLoadingRequestAccess } =
    useMutation('request-access', {
      mutationFn: async (qrId: string) => {
        const apiUrl = `${ENDPOINTS.ACCESS_DOCUMENT}/${qrId}`;
        const { data } = await client.get(apiUrl);
        return data;
      },
    });

  return {
    requestAccess,
    isLoadingRequestAccess,
  };
};
