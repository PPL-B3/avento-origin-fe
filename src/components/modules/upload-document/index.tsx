'use client';

import { FileInput, useAuth } from '@/components/core';
import { SubmissionProps } from '@/components/core/elements/FileInput/interface';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { z } from 'zod';
import { useUploadDocument } from './hooks/use-upload-document';
import { uploadDocumentSchema } from './schema';

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
      await onUploadDocument(values);
      setShowQR(true);
    } catch (error) {
      toast.error('Failed to upload document');
      console.error(error);
    }
  };

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

  const downloadQRCode = (id: string, filename: string) => {
    const svg = document.getElementById(id);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const url = URL.createObjectURL(svgBlob);

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
        <div className="w-3/4 flex flex-col items-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="flex flex-col items-center bg-white p-6 rounded-lg">
              <h5 className="text-black text-xl font-semibold mb-4">
                Private QR Code
              </h5>
              {qrCodes.privateId && (
                <>
                  <div id="private-qr-container">
                    <QRCode
                      id="private-qr"
                      value={`${baseUrl}${qrCodes.privateId}`}
                      size={200}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                      }}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(qrCodes.privateId);
                        toast.success('Copied to clipboard');
                      }}
                      className="text-xs"
                    >
                      Copy URL
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        downloadQRCode(
                          'private-qr',
                          `private-${qrCodes.privateId}`
                        )
                      }
                      className="text-xs"
                    >
                      Download QR
                    </Button>
                  </div>
                  <p className="text-black mt-4 text-center break-all font-bold">
                    URL: {baseUrl}
                    {qrCodes.privateId}
                  </p>
                  <p className="mt-3">
                    Penggunaan PRIBADI. Untuk transfer dokumen & lihat dokumen
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-col items-center bg-white p-6 rounded-lg">
              <h5 className="text-black text-xl font-semibold mb-4">
                Public QR Code
              </h5>
              {qrCodes.publicId && (
                <>
                  <div id="public-qr-container">
                    <QRCode
                      id="public-qr"
                      value={`${baseUrl}${qrCodes.publicId}`}
                      size={200}
                      style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                      }}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(qrCodes.publicId);
                        toast.success('Copied to clipboard');
                      }}
                      className="text-xs"
                    >
                      Copy URL
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() =>
                        downloadQRCode(
                          'public-qr',
                          `public-${qrCodes.publicId}`
                        )
                      }
                      className="text-xs"
                    >
                      Download QR
                    </Button>
                  </div>
                  <p className="text-black mt-4 text-center break-all font-bold">
                    URL: {baseUrl}
                    {qrCodes.publicId}
                  </p>
                  <p className="mt-3">
                    Untuk disebarluaskan. Berisi email pemilik dokumen dan
                    riwayat transfer dokumen
                  </p>
                </>
              )}
            </div>
          </div>

          <Button
            onClick={() => setShowQR(false)}
            className="mt-8 bg-[#0067CC]"
            variant="default"
          >
            Upload Another Document
          </Button>
        </div>
      )}
    </section>
  );
}
