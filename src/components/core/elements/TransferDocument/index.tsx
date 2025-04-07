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

  const transferMutation = useTransferDocument();

  const handleSubmit = async () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error('Email tidak valid');
      return;
    }

    try {
      const res = await transferMutation.mutateAsync({ documentId, email });
      setOtp(res.otp); // simpan OTP dari backend
      toast.success('Email valid, OTP dikirim!');

      setOpenTransferDialog(false);
      setOpenOtpDialog(true);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
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
