'use client';

import { useTransferDocument } from '@/components/core/hooks/use-transfer-document';
import { useState } from 'react';
import { toast } from 'sonner';
import { emailSchema } from '../emailSchema';

export const useTransferDocumentState = (documentId: string) => {
  // State management
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  const [openOtpDialog, setOpenOtpDialog] = useState(false);

  const { onTransferDocument, isLoadingTransferDocument } =
    useTransferDocument();

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const openTransfer = () => {
    setOpenTransferDialog(true);
  };

  const handleSubmit = async () => {
    // Email validation
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    const loadingToastId = toast.loading(
      'Memproses permintaan transfer dokumen...'
    );

    try {
      // API call for transferring document
      const res = await onTransferDocument({ 
        documentId, 
        pendingOwner: email 
      });
      
      // Update state on success
      setOtp(res.otp);
      setOpenTransferDialog(false);
      setOpenOtpDialog(true);
    } catch (error) {
      console.error(error);
      toast.error('Terjadi kesalahan saat mentransfer dokumen');
    } finally {
      toast.dismiss(loadingToastId);
    }
  };

  return {
    // State
    email,
    otp,
    openTransferDialog,
    openOtpDialog,
    isLoadingTransferDocument,
    
    // Actions
    handleEmailChange,
    openTransfer,
    handleSubmit,
    setOpenTransferDialog,
    setOpenOtpDialog,
  };
};
