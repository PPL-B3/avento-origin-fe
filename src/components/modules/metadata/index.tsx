'use client';

import { TransferDocumentModal } from '@/components/core/elements/TransferDocument';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { OTPVerificationCard } from '../shared/OTPVerification/OTPVerificationCard';
import { UseMetadata } from './hooks/use-metadata';
import { useOtpVerification } from './hooks/use-otp-verification';
import { HistoryType } from './types';
import { getSignedUrlFromSpaces } from './utils/getSignedUrl';

export function InformationRow({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 md:gap-3 px-3">
      <p className="font-bold text-base md:text-lg break-words">{label}</p>
      <p className="text-sm md:text-base break-words">{value}</p>
    </div>
  );
}

export function encryptEmail(email: string) {
  if (!email?.includes('@')) return '';

  const [localPart, domain] = email.split('@');

  let maskedLocalPart;
  if (localPart.length <= 2) {
    maskedLocalPart = localPart;
  } else if (localPart.length <= 4) {
    maskedLocalPart =
      localPart[0] + localPart[1] + '*'.repeat(localPart.length - 2);
  } else {
    maskedLocalPart =
      localPart.substring(0, 2) +
      '*'.repeat(localPart.length - 4) +
      localPart.substring(localPart.length - 2);
  }

  const domainParts = domain.split('.');
  const maskedDomain = domainParts
    .map((part) => {
      if (part.length <= 2) return part;
      return part[0] + '*'.repeat(part.length - 2) + part[part.length - 1];
    })
    .join('.');

  return `${maskedLocalPart}@${maskedDomain}`;
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = date.toLocaleDateString('id-ID', options);
  const formattedTime = date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
};

/* istanbul ignore next */
export function MetadataModule() {
  const { qr_code } = useParams<{
    qr_code: string;
  }>();

  const { data, isFetching } = UseMetadata(qr_code);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (!data?.filePath) return;
      const url = await getSignedUrlFromSpaces(data.filePath);
      setSignedUrl(url);
    };

    if (isModalOpen && data?.filePath) {
      fetchSignedUrl();
    }
  }, [isModalOpen, data?.filePath]);

  const renderDocumentContent = () => {
    if (!signedUrl) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">Loading document...</p>
        </div>
      );
    }
    return (
      <iframe
        src={`${signedUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        title="Document Viewer"
        className="w-full h-full border-0"
      />
    );
  };

  const {
    otp,
    setOtp,
    isOtpVerified,
    responseMessage,
    handleSubmit,
    handleResend,
    isLoadingRequestAccess,
    isLoadingAccessDocument,
  } = useOtpVerification(qr_code, data);

  /* istanbul ignore next */
  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      {data?.filePath &&
      !isOtpVerified &&
      !isFetching &&
      !isLoadingRequestAccess ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 text-neutral-950">
          <OTPVerificationCard
            title="Verify Document Ownership"
            description="Please enter the 6-digit code sent to your email to confirm ownership"
            otp={otp}
            setOtp={setOtp}
            isLoading={isLoadingAccessDocument}
            onSubmit={handleSubmit}
            onResend={handleResend}
            responseMessage={responseMessage}
          />
        </div>
      ) : (
        <div className="bg-neutral-50 text-neutral-950 p-5 rounded-lg w-full md:w-2/3 h-fit py-12 px-10">
          {isFetching ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-neutral-950">Loading...</p>
            </div>
          ) : isLoadingRequestAccess ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-neutral-950">Requesting access...</p>
            </div>
          ) : data ? (
            <div className="flex flex-col gap-y-5">
              <h2 className="text-neutral-950 pb-8 font-extrabold">
                DOCUMENT DETAIL {data?.filePath && ' (Owner)'}
              </h2>
              <InformationRow label="Document Name" value={data.documentName} />
              <div
                data-testid="divider"
                className="w-full h-0.5 bg-neutral-950"
              />
              <InformationRow
                label="Document Owner"
                value={encryptEmail(data.currentOwner)}
              />

              {data?.filePath && (
                <>
                  <div
                    data-testid="divider"
                    className="w-full h-0.5 bg-neutral-950"
                  />
                  <div className="grid grid-cols-1 gap-3 px-3">
                    <p className="font-bold">Transfer History</p>
                    {[...data.ownershipHistory]
                      .reverse()
                      .map((history: HistoryType) => (
                        <div
                          key={`${history.owner}-${history.generatedDate}`}
                          className="flex gap-x-2"
                        >
                          <p>
                            {encryptEmail(history.owner)} |{' '}
                            {formatDateTime(history.generatedDate)}
                          </p>
                        </div>
                      ))}
                  </div>
                </>
              )}

              {data?.filePath && (
                <div className="flex w-full justify-center md:justify-end mt-6">
                  <div className="w-fit flex flex-col gap-4">
                    {data?.documentId && (
                      <TransferDocumentModal documentId={data.documentId} />
                    )}
                    <Button
                      size="lg"
                      variant="secondary"
                      onClick={() => setIsModalOpen(true)}
                    >
                      View Document
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-neutral-950">Document not found</p>
            </div>
          )}
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-7xl p-0 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold text-blue-600">
                  {data?.documentName}
                </h2>
              </div>
              <div className="w-full h-[80vh]">{renderDocumentContent()}</div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </section>
  );
}
