'use client';
import { RevertDocumentSchema } from './../types/index';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'sonner';
import { DocumentAdminMetadataResponse } from '../types';

export const UseAdminDocDetail = (doc_id: string) => {
  const client = useAventoClient();
  const query = useQueryClient();

  const { data, isFetching, error } = useQuery<
    DocumentAdminMetadataResponse,
    Error
  >(['get-admin-doc-detail', doc_id], {
    queryFn: async () => {
      const apiUrl = `${ENDPOINTS.ADMIN_METADATA}/${doc_id}`;

      const { data } = await client.get(apiUrl);
      return data as DocumentAdminMetadataResponse;
    },
    enabled: !!doc_id,
    refetchOnWindowFocus: false,
  });

  const { mutate: onRevert } = useMutation('revert-document-owner', {
    mutationFn: async (values: RevertDocumentSchema) => {
      const apiUrl = `${ENDPOINTS.REVERT}`;
      const promise = client.post(apiUrl, values);
      toast.promise(promise, {
        loading: 'Loading...',
        success: () => {
          return `Document owner reverted`;
        },
        error: 'Something went wrong',
      });
      await promise;
    },
    onSuccess: () => {
      query.invalidateQueries(['get-admin-doc-detail', doc_id]);
      query.removeQueries({ queryKey: 'revert-document-owner' });
    },
  });

  return {
    data,
    error,
    isFetching,
    onRevert,
  };
};
