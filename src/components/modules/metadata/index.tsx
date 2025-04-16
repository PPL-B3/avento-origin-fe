'use client';

import { TransferDocumentModal } from '@/components/core/elements/TransferDocument';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { UseMetadata } from './hooks/use-metadata';
import { HistoryType } from './types';

export function InformationRow({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
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

  /* istanbul ignore next */
  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      <div className="bg-neutral-50 text-neutral-950 p-5 rounded-lg w-2/3 h-fit py-12 px-10">
        <h2 className="text-neutral-950 pb-8 font-extrabold">
          DOCUMENT DETAIL {data?.filePath && ' (Owner)'}
        </h2>
        {isFetching ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-neutral-950">Loading...</p>
          </div>
        ) : (
          <>
            {data ? (
              <div className="flex flex-col gap-y-5">
                <InformationRow
                  label="Document Name"
                  value={data.documentName}
                />
                <div
                  data-testid="divider"
                  className="w-full h-0.5 bg-neutral-950"
                />
                <InformationRow
                  label="Document Owner"
                  value={encryptEmail(data.currentOwner)}
                />
                {/* <div
              data-testid="divider"
              className="w-full h-0.5 bg-neutral-950"
            />
            <InformationRow label="Document Type" value={data.} /> */}
                {data?.filePath && (
                  <>
                    <div
                      data-testid="divider"
                      className="w-full h-0.5 bg-neutral-950"
                    />
                    <div className="grid grid-cols-1 gap-3 px-3">
                      <p className="font-bold">Transfer History</p>
                      {data.ownershipHistory.map(
                        (history: HistoryType) => (
                          <div key={`${history.owner}-${history.generatedDate}`} className="flex gap-x-2">
                            <p>
                              {history.owner} |{' '}
                              {formatDateTime(history.generatedDate)}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p className="text-neutral-950">Document not found</p>
              </div>
            )}
          </>
        )}
        {data?.filePath && (
          <div className="flex w-full justify-end">
            <div className="w-fit flex flex-col gap-4">
              {data?.documentId && (
                <TransferDocumentModal documentId={data.documentId} />
              )}
              <Button size="lg" variant="secondary">
                View Document
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
