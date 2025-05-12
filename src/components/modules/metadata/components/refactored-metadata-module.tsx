'use client';

import { TransferDocumentModal } from '@/components/core/elements/TransferDocument';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useParams } from 'next/navigation';
import { encryptEmail, formatDateTime, InformationRow } from '..';
import { OTPVerificationCard } from '../../shared/OTPVerification/OTPVerificationCard';
import { HistoryType } from '../types';
import { useDocumentViewModel } from '../view-models/document-view-model';

/**
 * MetadataModule Component - Refactored using:
 * 1. MVVM Pattern - Data & UI logic in ViewModel
 * 2. Component composition to reduce complexity
 * 3. Clean separation of concerns
 */
export function RefactoredMetadataModule() {
  const { qr_code } = useParams<{
    qr_code: string;
  }>();

  // Use the view model to handle all state and logic
  const viewModel = useDocumentViewModel(qr_code);

  // Render document viewer content
  const renderDocumentContent = () => {
    if (!viewModel.signedUrl) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500">Loading document...</p>
        </div>
      );
    }
    return (
      <iframe
        src={`${viewModel.signedUrl}#toolbar=0&navpanes=0&scrollbar=0`}
        title="Document Viewer"
        className="w-full h-full border-0"
      />
    );
  };

  // Show OTP verification form if needed
  if (viewModel.showOtpForm) {
    return (
      <section className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4 text-neutral-950">
          <OTPVerificationCard
            title="Verify Document Ownership"
            description="Please enter the 6-digit code sent to your email to confirm ownership"
            otp={viewModel.otp}
            setOtp={viewModel.setOtp}
            isLoading={viewModel.isLoadingAccessDocument}
            onSubmit={viewModel.handleSubmit}
            onResend={viewModel.handleResend}
            responseMessage={viewModel.responseMessage}
          />
        </div>
      </section>
    );
  }

  // Show metadata content
  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      <div className="bg-neutral-50 text-neutral-950 p-5 rounded-lg w-full md:w-2/3 h-fit py-12 px-10">
        {viewModel.isFetching ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-neutral-950">Loading...</p>
          </div>
        ) : viewModel.isLoadingRequestAccess ? (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-neutral-950">Requesting access...</p>
          </div>
        ) : viewModel.data ? (
          <div className="flex flex-col gap-y-5">
            <h2 className="text-neutral-950 pb-8 font-extrabold">
              DOCUMENT DETAIL {viewModel.data?.filePath && ' (Owner)'}
            </h2>
            <InformationRow
              label="Document Name"
              value={viewModel.data.documentName}
            />
            <div
              data-testid="divider"
              className="w-full h-0.5 bg-neutral-950"
            />
            <InformationRow
              label="Document Owner"
              value={encryptEmail(viewModel.data.currentOwner)}
            />

            {viewModel.data?.filePath && (
              <>
                <div
                  data-testid="divider"
                  className="w-full h-0.5 bg-neutral-950"
                />
                <div className="grid grid-cols-1 gap-3 px-3">
                  <p className="font-bold">Transfer History</p>
                  {[...viewModel.data.ownershipHistory]
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

            {viewModel.data?.filePath && (
              <div className="flex w-full justify-center md:justify-end mt-6">
                <div className="w-fit flex flex-col gap-4">
                  {viewModel.data?.documentId && (
                    <TransferDocumentModal
                      documentId={viewModel.data.documentId}
                    />
                  )}
                  <Button
                    size="lg"
                    variant="secondary"
                    onClick={viewModel.openModal}
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

        <Dialog
          open={viewModel.isModalOpen}
          onOpenChange={(open) =>
            open ? viewModel.openModal() : viewModel.closeModal()
          }
        >
          <DialogContent className="max-w-7xl p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold text-blue-600">
                {viewModel.data?.documentName}
              </h2>
            </div>
            <div className="w-full h-[80vh]">{renderDocumentContent()}</div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
