'use client';

import { encryptEmail } from '../metadata';
import { OTPVerificationCard } from '../shared/OTPVerification/OTPVerificationCard';
import { QRCodeDisplay } from '../shared/QRCodeDisplay';
import { useTransferRequest } from './hooks/use-transfer-request';

export function TransferRequestModule() {
  const {
    isFetching,
    showQR,
    otp,
    setOtp,
    data,
    isLoadingClaimDocument,
    handleSubmit,
    qrCodes,
  } = useTransferRequest();

  if (isFetching) {
    return null;
  }

  return (
    <section
      data-testid="transfer-request-module"
      className="pb-20 max-md:px-5 min-h-screen w-full flex items-center justify-center flex-col bg-primary-1 md:pt-28 md:px-20 pt-28"
    >
      {!showQR ? (
        <OTPVerificationCard
          title="Transfer Request"
          description="A transfer request has been sent to you"
          currentOwnerEmail={encryptEmail(data?.currentOwner ?? '')}
          documentName={data?.documentName}
          otp={otp}
          setOtp={setOtp}
          isLoading={isLoadingClaimDocument}
          onSubmit={handleSubmit}
        />
      ) : (
        <QRCodeDisplay
          privateId={qrCodes.privateId}
          publicId={qrCodes.publicId}
        />
      )}
    </section>
  );
}
