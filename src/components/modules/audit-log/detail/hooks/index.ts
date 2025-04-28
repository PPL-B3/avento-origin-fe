'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { DocumentAdminMetadataResponse } from '../types';

export const UseAdminDocDetail = (doc_id: string) => {
  const client = useAventoClient();
  const query = useQueryClient();

  const { data, isFetching, error } = useQuery<
    DocumentAdminMetadataResponse,
    Error
  >(['get-admin-doc-detail', doc_id], {
    queryFn: async () => {
      const apiUrl = `${ENDPOINTS.METADATA}/${doc_id}`;

      const { data } = await client.get(apiUrl);
      return data as DocumentAdminMetadataResponse;
    },
    enabled: !!doc_id,
    refetchOnWindowFocus: false,
  });

  const { isLoading: mutateLoading, mutate: onRevert } = useMutation(
    'revert-document-owner',
    {
      mutationFn: async (values: z.infer<typeof RevertDocumentSchema>) => {
        const apiUrl = `${ENDPOINTS.METADATA}/${doc_id}`;
        const promise = client.put(apiUrl, values);
        toast.promise(promise, {
          loading: 'Loading...',
          success: () => {
            return `Document owner reverted to ${values.currentOwner}`;
          },
          error: 'Something went wrong',
        });
        await promise;
      },
      onSuccess: () => {
        query.invalidateQueries(['get-admin-doc-detail', doc_id]);
        query.removeQueries({ queryKey: 'revert-document-owner' });
      },
    }
  );

  return {
    data,
    error,
    isFetching,
  };
};
