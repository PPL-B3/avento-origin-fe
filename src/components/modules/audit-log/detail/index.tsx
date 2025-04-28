'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { encryptEmail, formatDateTime, InformationRow } from '../../metadata';
import { UseAdminDocDetail } from './hooks';
import { HistoryType } from './types';

/* istanbul ignore next */
export function AuditLogDetailModule() {
  const { doc_id } = useParams<{
    doc_id: string;
  }>();

  const { data, isFetching, onRevert } = UseAdminDocDetail(doc_id);

  const handleRevert = (owner: string) => {
    if (!data) return;

    onRevert({
      documentId: doc_id,
      index: data?.ownershipHistory.findIndex(
        (history: HistoryType) => history.owner === owner
      ),
    });
  };

  /* istanbul ignore next */
  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      <div className="bg-neutral-50 text-neutral-950 p-5 rounded-lg w-2/3 h-fit py-12 px-10">
        <h2 className="text-neutral-950 pb-8 font-extrabold">
          DOCUMENT DETAIL (Admin)
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
                    <div className="grid grid-cols-1 px-3 pb-8">
                      <p className="font-bold pb-2">Transfer History</p>
                      {[...data.ownershipHistory]
                        .reverse()
                        .map((history: HistoryType) => (
                          <div
                            key={`${history.owner}-${history.generatedDate}`}
                            className="flex justify-between gap-x-2 bg-neutral-300 items-center hover:bg-neutral-200 p-2 rounded-lg mt-2 transition-colors duration-200"
                          >
                            <p>
                              {history.owner} |{' '}
                              {formatDateTime(history.generatedDate)}
                            </p>
                            <Button
                              variant="default"
                              className="w-fit h-fit"
                              onClick={() => handleRevert(history.owner)}
                            >
                              Revert
                            </Button>
                          </div>
                        ))}
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
      </div>
    </section>
  );
}
