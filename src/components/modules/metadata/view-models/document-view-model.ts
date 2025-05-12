/**
 * Document View Model - MVVM Pattern
 *
 * The Model-View-ViewModel (MVVM) pattern separates UI elements and UI logic
 * from business logic and data access.
 *
 * Benefits:
 * - Separation of concerns
 * - Improved testability
 * - Better code organization
 * - Cleaner UI components
 */

import { defaultErrorHandler } from '@/lib/strategies/error-handling-strategy';
import { useCallback, useEffect, useState } from 'react';
import { useMetadata } from '../hooks/use-metadata';
import { useOtpVerification } from '../hooks/use-otp-verification';
import { useDocumentService } from '../services/document-service';

export const useDocumentViewModel = (qrId: string) => {
  // State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Services and data
  const documentService = useDocumentService();
  const { data, isFetching } = useMetadata(qrId);
  const {
    otp,
    setOtp,
    isOtpVerified,
    responseMessage,
    handleSubmit,
    handleResend,
    isLoadingRequestAccess,
    isLoadingAccessDocument,
  } = useOtpVerification(qrId, data);

  // Get signed URL when modal is opened
  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!data?.filePath) return;

      setIsLoading(true);
      try {
        const url = await documentService.getSignedUrl(data.filePath);
        setSignedUrl(url);
        setError(null);
      } catch (error) {
        setError(defaultErrorHandler.handleError(error));
        setSignedUrl(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isModalOpen && data?.filePath) {
      fetchSignedUrl();
    }
  }, [isModalOpen, data?.filePath, documentService]);

  // Derived/computed state
  const isContentReady = !isFetching && !isLoadingRequestAccess;
  const showOtpForm = data?.filePath && !isOtpVerified && isContentReady;
  const showMetadata = !showOtpForm && isContentReady;

  // Actions/methods
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return {
    // Data
    data,
    signedUrl,
    error,
    responseMessage,
    otp,

    // State
    isLoading,
    isFetching,
    isOtpVerified,
    isLoadingAccessDocument,
    isLoadingRequestAccess,
    isModalOpen,
    showOtpForm,
    showMetadata,

    // Actions
    setOtp,
    handleSubmit,
    handleResend,
    openModal,
    closeModal,
  };
};
