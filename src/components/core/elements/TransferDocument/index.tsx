'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { OtpDialog } from './OtpDialog';
import { TransferDialog } from './TransferDialog';

const emailSchema = z.string().email('Email tidak valid');

export function TransferDocumentModal() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const handleSubmit = () => {
    // Validasi email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    // Simulasi mendapatkan OTP dari backend
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    toast.success('Email valid, OTP dikirim!');

    // Tutup dialog transfer dan buka dialog OTP
    setOpenTransferDialog(false);
    setOpenOtpDialog(true);
  };

  return (
    <div>
      <Button variant="default" onClick={() => setOpenTransferDialog(true)}>
        Transfer Dokumen
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
