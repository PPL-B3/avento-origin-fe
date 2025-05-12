'use client';

import { useMutation } from 'react-query';
import { useDocumentService } from '../services/document-service';

/**
 * Custom hook for verifying document access with OTP
 * Refactored to use the Service/Facade pattern which handles toast notifications
 */
export const useAccessDocument = (onSuccessCallback?: () => void) => {
  const documentService = useDocumentService();

  const { mutateAsync: accessDocument, isLoading: isLoadingAccessDocument } =
    useMutation(['verify-access'], {
      mutationFn: async (data: { qrId: string; otp: string }) => {
        await documentService.verifyAccess(data.qrId, data.otp);
      },
      onSuccess: () => {
        onSuccessCallback?.();
      },
    });

  return {
    accessDocument,
    isLoadingAccessDocument,
  };
};
