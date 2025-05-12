'use client';

import { useMutation } from 'react-query';
import { useDocumentService } from '../services/document-service';

/**
 * Custom hook for requesting document access
 * Refactored to use the Service/Facade pattern
 */
export const useRequestAccess = () => {
  const documentService = useDocumentService();

  const { mutateAsync: requestAccess, isLoading: isLoadingRequestAccess } =
    useMutation(['request-access'], {
      mutationFn: (qrId: string) => documentService.requestAccess(qrId),
    });

  return {
    requestAccess,
    isLoadingRequestAccess,
  };
};
