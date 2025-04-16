'use client';

import { FileInput, useAuth } from '@/components/core';
import { SubmissionProps } from '@/components/core/elements/FileInput/interface';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { QRCodeDisplay } from '../shared/QRCodeDisplay';
import { useUploadDocument } from './hooks/use-upload-document';
import { uploadDocumentSchema } from './schema';

/* istanbul ignore next */
export const downloadQRCode = (id: string, filename: string) => {
  const svg = document.getElementById(id);
  /* istanbul ignore next */
  if (!svg) return;

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const img = new Image();
  const svgBlob = new Blob([svgData], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const url = URL.createObjectURL(svgBlob);

  /* istanbul ignore next */
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx?.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);

    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${filename}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  img.src = url;
};

export function UploadDocumentModule() {
  const [file, setFile] = useState<SubmissionProps>({
    file: null,
    error: false,
    loading: false,
  });
  const [showQR, setShowQR] = useState(false);

  const { isLoadingUploadDocument, onUploadDocument, qrCodes } =
    useUploadDocument();
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      documentName: 'a document name',
      ownerName: user?.email ?? 'owner name not detected',
    },
  });

  /* istanbul ignore next */
  const onSubmit = async (values: z.infer<typeof uploadDocumentSchema>) => {
    values.ownerName = user?.email ?? 'owner name not detected';
    values.documentName = file.file?.name ?? 'a document name';

    if (file.file === null) {
      toast.error('Please select a file to upload');
      return;
    }

    values.file = file.file;
    setShowQR(false);

    try {
      onUploadDocument(values);
    } catch (error) {
      toast.error('Failed to upload document');
      console.error(error);
    }
  };

  /* istanbul ignore next */
  useEffect(() => {
    if (qrCodes.privateId && qrCodes.publicId) {
      setShowQR(true);
    }
  }, [qrCodes]);

  /* istanbul ignore next */
  return (
    <section
      data-testid="upload-document-module"
      className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50"
    >
      <h4 className="w-full text-center text-4xl font-bold">
        {!showQR ? 'UPLOAD HERE!' : 'UPLOAD SUCCESSFUL!'}
      </h4>

      {!showQR ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-3/4 flex flex-col"
          >
            <div className="flex flex-col gap-2 mb-4 mt-12 text-neutral-950">
              <FileInput
                label=""
                maxSize={8}
                name="image"
                fileTypes={['pdf']}
                required
                submission={file}
                setSubmission={setFile}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0067CC]"
              variant="default"
              disabled={file.file === null || isLoadingUploadDocument}
              data-testid="upload-button"
            >
              Upload
            </Button>
          </form>
        </Form>
      ) : (
        <QRCodeDisplay
          privateId={qrCodes.privateId}
          publicId={qrCodes.publicId}
          onBack={() => setShowQR(false)}
          showBackButton={true}
          backButtonText="Upload Another Document"
        />
      )}
    </section>
  );
}
