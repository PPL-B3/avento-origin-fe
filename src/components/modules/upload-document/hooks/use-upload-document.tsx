'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { uploadDocumentSchema } from '../schema';

export const useUploadDocument = () => {
  const client = useAventoClient();

  const { isLoading: mutateLoadingContent, mutate: onUploadDocument } =
    useMutation('upload-document', {
      mutationFn: async (values: z.infer<typeof uploadDocumentSchema>) => {
        const apiUrl = ENDPOINTS.DOCUMENTS_UPLOAD;
        const promise = client.post(apiUrl, values);
        toast.promise(promise, {
          loading: 'Loading...',
          success: () => {
            return `Document uploaded successfully`;
          },
          error: (error) => {
            return error.response.data.message[0] || 'Something went wrong';
          },
        });
        await promise;
      },
    });

  const isLoadingUploadDocument = mutateLoadingContent;

  return {
    onUploadDocument,
    isLoadingUploadDocument,
  };
};
