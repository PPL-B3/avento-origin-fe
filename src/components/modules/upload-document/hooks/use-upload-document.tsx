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
        const formData = new FormData();

        formData.append('documentName', values.documentName);
        formData.append('ownerName', values.ownerName);
        formData.append('file', values.file as File);

        const promise = client.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.promise(promise, {
          loading: 'Loading...',
          success: () => {
            return `Document uploaded successfully`;
          },
          error: (error) => {
            return error.response?.data?.message?.[0] || 'Something went wrong';
          },
        });

        return await promise;
      },
    });

  const isLoadingUploadDocument = mutateLoadingContent;

  return {
    onUploadDocument,
    isLoadingUploadDocument,
  };
};
