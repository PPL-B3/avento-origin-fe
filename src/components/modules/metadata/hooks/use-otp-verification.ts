import { defaultErrorHandler } from '@/lib/strategies/error-handling-strategy';
import { useEffect, useState } from 'react';
import { useDocumentService } from '../services/document-service';
import { DocumentMetadataResponse } from '../types';
import { useAccessDocument } from './use-access-document';
import { useRequestAccess } from './use-request-access';

/**
 * Custom hook for OTP verification workflow
 * Refactored to:
 * 1. Use the Service/Facade pattern for business logic
 * 2. Use the Error Handling Strategy pattern for consistent error handling
 * 3. Separate concerns between UI state and business logic
 */
export const useOtpVerification = (
  qrId: string,
  data: DocumentMetadataResponse | undefined
) => {
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const documentService = useDocumentService();
  const { requestAccess, isLoadingRequestAccess } = useRequestAccess();
  const { accessDocument, isLoadingAccessDocument } = useAccessDocument(() => {
    setIsOtpVerified(true);
  });

  // Request OTP if needed when document data is available
  useEffect(() => {
    const requestOtpIfNeeded = async () => {
      if (data?.filePath && !isOtpVerified) {
        try {
          await documentService.requestAccessIfNeeded(qrId);
        } catch (error) {
          setResponseMessage(defaultErrorHandler.handleError(error));
        }
      }
    };

    requestOtpIfNeeded();
  }, [data?.filePath, isOtpVerified, qrId, documentService]);

  const handleSubmit = async () => {
    try {
      await accessDocument({
        qrId: qrId,
        otp: otp,
      });
    } catch (error) {
      setResponseMessage(defaultErrorHandler.handleError(error));
    }
    setOtp('');
  };

  const handleResend = async () => {
    try {
      await requestAccess(qrId);
      setResponseMessage('OTP has been resent. Please check your email!');
    } catch (error) {
      setResponseMessage(defaultErrorHandler.handleError(error));
    }
  };

  return {
    otp,
    setOtp,
    isOtpVerified,
    responseMessage,
    handleSubmit,
    handleResend,
    isLoadingRequestAccess,
    isLoadingAccessDocument,
  };
};
