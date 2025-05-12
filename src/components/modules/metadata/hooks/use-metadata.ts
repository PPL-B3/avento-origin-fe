'use client';

import { useQuery } from 'react-query';
import { useDocumentService } from '../services/document-service';
import { DocumentMetadataResponse } from '../types';

/**
 * Custom hook for fetching document metadata
 * Refactored to use the Repository and Facade patterns
 */
export const useMetadata = (qrId: string) => {
  const documentService = useDocumentService();

  const { data, isFetching, error } = useQuery<DocumentMetadataResponse, Error>(
    ['document-metadata', qrId],
    () => documentService.getMetadata(qrId),
    {
      enabled: !!qrId,
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    error,
    isFetching,
  };
};
