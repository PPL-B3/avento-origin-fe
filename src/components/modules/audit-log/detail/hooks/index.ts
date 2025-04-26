'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useQuery } from 'react-query';
import { DocumentAdminMetadataResponse } from '../types';

export const UseAdminDocDetail = (doc_id: string) => {
  const client = useAventoClient();

  const { data, isFetching, error } = useQuery<DocumentAdminMetadataResponse, Error>(
    ['get-admin-doc-detail', doc_id],
    {
      queryFn: async () => {
        const apiUrl = `${ENDPOINTS.METADATA}/${doc_id}`;

        const { data } = await client.get(apiUrl);
        return data as DocumentAdminMetadataResponse;
      },
      enabled: !!doc_id,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    error,
    isFetching,
  };
};
