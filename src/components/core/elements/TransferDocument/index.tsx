'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useTransferDocument } from '../../hooks/use-transfer-document';
import { OtpDialog } from './OtpDialog';
import { TransferDialog } from './TransferDialog';

const emailSchema = z.string().email();

export function TransferDocumentModal({ documentId }: { documentId: string }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const { onTransferDocument, isLoadingTransferDocument } =
    useTransferDocument();

  const handleSubmit = async () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error('Email tidak valid');
      return;
    }

    const res = await onTransferDocument({ documentId, pendingOwner: email });
    setOtp(res.otp);
    setOpenTransferDialog(false);
    setOpenOtpDialog(true);
  };

  return (
    <div>
      <Button
        variant="default"
        size="lg"
        onClick={() => setOpenTransferDialog(true)}
      >
        Transfer Document
      </Button>

      <TransferDialog
        open={openTransferDialog}
        onOpenChange={setOpenTransferDialog}
        email={email}
        setEmail={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoadingTransferDocument}
      />

      <OtpDialog
        open={openOtpDialog}
        onOpenChange={setOpenOtpDialog}
        otp={otp}
        email={email}
      />
    </div>
  );
}
