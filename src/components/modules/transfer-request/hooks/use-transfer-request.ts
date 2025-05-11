'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UseMetadata } from '../../metadata/hooks/use-metadata';
import { useClaimDocument } from './use-claim-document';

export function useTransferRequest() {
  const { qr_code } = useParams<{ qr_code: string }>();
  const { data, isFetching } = UseMetadata(qr_code);
  const { onClaimDocument, isLoadingClaimDocument, qrCodes } =
    useClaimDocument();
  const [otp, setOtp] = useState('');
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    if (qrCodes.privateId && qrCodes.publicId) {
      setOtp('');
      setShowQR(true);
    }
  }, [qrCodes]);

  const handleSubmit = () => {
    onClaimDocument({
      documentId: data?.documentId ?? '',
      otp,
    });
  };

  return {
    isFetching,
    showQR,
    otp,
    setOtp,
    data,
    isLoadingClaimDocument,
    handleSubmit,
    qrCodes,
  };
}
