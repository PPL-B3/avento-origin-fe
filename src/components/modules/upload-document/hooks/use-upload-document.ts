'use client';

import { ENDPOINTS, useAventoClient } from '@/components/core';
import * as Sentry from '@sentry/nextjs';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { uploadDocumentSchema } from '../schema';

export const useUploadDocument = () => {
  const client = useAventoClient();
  const [qrCodes, setQrCodes] = useState({ privateId: '', publicId: '' });
  const [uploadCount, setUploadCount] = useState(0);

  const { isLoading: mutateLoadingContent, mutate: onUploadDocument } =
    useMutation('upload-document', {
      mutationFn: async (values: z.infer<typeof uploadDocumentSchema>) => {
        const apiUrl = ENDPOINTS.DOCUMENTS_UPLOAD;
        const formData = new FormData();

        formData.append('documentName', values.documentName);
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
            const errorMessage = error.response?.data?.message;
            if (Array.isArray(errorMessage)) {
              return errorMessage[0] ?? 'Something went wrong';
            } else if (typeof errorMessage === 'string') {
              return errorMessage;
            } else {
              return 'Something went wrong';
            }
          },
        });

        const response = await promise;
        // Store the QR IDs from the response

        if (response.data?.privateId && response.data?.publicId) {
          setQrCodes({
            privateId: response.data.privateId,
            publicId: response.data.publicId,
          });
        }

        // Increment the upload count
        setUploadCount((prevCount) => prevCount + 1);

        // Track document upload in Sentry
        Sentry.captureEvent({
          message: 'Document uploaded',
          level: 'info',
          tags: {
            action: 'document_upload',
          },
          extra: {
            documentName: values.documentName,
            uploadCount: uploadCount + 1,
          },
        });

        return response;
      },
    });

  const isLoadingUploadDocument = mutateLoadingContent;

  return {
    onUploadDocument,
    isLoadingUploadDocument,
    qrCodes,
  };
};
