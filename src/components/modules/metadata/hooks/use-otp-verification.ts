import { useEffect, useState } from 'react';
import { DocumentMetadataResponse } from '../types';
import { useAccessDocument } from './use-access-document';
import { useRequestAccess } from './use-request-access';

export const useOtpVerification = (
  qr_code: string,
  data: DocumentMetadataResponse | undefined
) => {
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string>('');

  const { requestAccess, isLoadingRequestAccess } = useRequestAccess();
  const { accessDocument, isLoadingAccessDocument } = useAccessDocument(() => {
    const cacheKey = `requestAccess_${qr_code}`;
    setIsOtpVerified(true);
    localStorage.removeItem(cacheKey);
  });

  useEffect(() => {
    const cacheKey = `requestAccess_${qr_code}`;
    const now = Date.now();
    const cachedRequest = localStorage.getItem(cacheKey);

    const fetchRequestAccess = async () => {
      if (data?.filePath && !isOtpVerified) {
        if (!cachedRequest || now - Number(cachedRequest) > 8 * 60 * 1000) {
          try {
            await requestAccess(qr_code);
            localStorage.setItem(cacheKey, now.toString());
          } catch (error: unknown) {
            if (error && typeof error === 'object' && 'response' in error) {
              const err = error as { response: { data: { message: string } } };
              setResponseMessage(err.response.data.message);
            } else {
              setResponseMessage('Failed to request OTP.');
            }
          }
        }
      }
    };

    fetchRequestAccess();
  }, [data?.filePath, isOtpVerified, requestAccess, qr_code]);

  const handleSubmit = async () => {
    try {
      await accessDocument({
        qrId: qr_code,
        otp: otp,
      });
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response: { data: { message: string } } };
        setResponseMessage(err.response.data.message);
      }
      localStorage.clear();
    }
    setOtp('');
  };

  const handleResend = async () => {
    try {
      await requestAccess(qr_code);
      setResponseMessage('OTP has been resent. Please check your email!');
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response: { data: { message: string } } };
        setResponseMessage(err.response.data.message);
      }
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
