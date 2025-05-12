'use client';

import { Button } from '@/components/ui/button';
import { useTransferDocumentState } from './hooks/use-transfer-doc-state';
import { OtpDialog } from './OtpDialog';
import { TransferDialog } from './TransferDialog';
import { TransferDocumentProps } from './types';

export function TransferDocumentModal({ documentId }: Readonly<TransferDocumentProps>) {
  const {
    email,
    otp,
    openTransferDialog,
    openOtpDialog,
    isLoadingTransferDocument,
    handleEmailChange,
    openTransfer,
    handleSubmit,
    setOpenTransferDialog,
    setOpenOtpDialog,
  } = useTransferDocumentState(documentId);

  return (
    <div>
      <Button
        variant="default"
        size="lg"
        onClick={openTransfer}
        data-testid="transfer-document-button"
      >
        Transfer Document
      </Button>

      {/* Dialog to collect email */}
      <TransferDialog
        open={openTransferDialog}
        onOpenChange={setOpenTransferDialog}
        email={email}
        setEmail={handleEmailChange}
        onSubmit={handleSubmit}
        isLoading={isLoadingTransferDocument}
      />

      {/* Dialog to display OTP after successful transfer request */}
      <OtpDialog
        open={openOtpDialog}
        onOpenChange={setOpenOtpDialog}
        otp={otp}
        email={email}
      />
    </div>
  );
}
