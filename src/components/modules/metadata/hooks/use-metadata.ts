'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useQuery } from 'react-query';
import { DocumentMetadataResponse } from '../types';

export const UseMetadata = (qr_id: string) => {
  const client = useAventoClient();

  const { data, isFetching, error } = useQuery<DocumentMetadataResponse, Error>(
    ['get-my-project'],
    {
      queryFn: async () => {
        const apiUrl = `${ENDPOINTS.METADATA}/${qr_id}`;

        const { data } = await client.get(apiUrl);
        return data as DocumentMetadataResponse;
      },
      enabled: !!qr_id,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    error,
    isFetching,
  };
};
