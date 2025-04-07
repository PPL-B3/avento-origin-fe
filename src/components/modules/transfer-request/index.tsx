import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { encryptEmail } from '../metadata';
import { UseMetadata } from '../metadata/hooks/use-metadata';
import { useClaimDocument } from './hooks/use-claim-document';

export function TransferRequestModule() {
  const { qr_code } = useParams<{
    qr_code: string;
  }>();

  const { data, isFetching } = UseMetadata(qr_code);
  const [showQR, setShowQR] = useState(false);
  const { onClaimDocument, isLoadingClaimDocument, qrCodes } =
    useClaimDocument();

  const [otp, setOtp] = useState('');

  const handleSubmit = async () => {
    onClaimDocument({
      documentId: data?.documentId ?? '',
      otp: otp,
    });
    setShowQR(true);
  };

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/`;

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

  if (isFetching) {
    return null;
  }

  return (
    <section
      data-testid="transfer-request-module"
      className="pb-20 max-md:px-5 min-h-screen w-full flex items-center justify-center flex-col bg-primary-1 md:pt-28 md:px-20 pt-28"
    >
      {!showQR ? (
        <div className="bg-white p-16 rounded-xl w-full max-w-md text-center space-y-4">
          <p className="text-2xl font-extrabold text-primary-1">
            Transfer Request
          </p>
          <p className="text-sm">A transfer request has been sent to you</p>

          <div>
            <p className="text-xs">
              From:{' '}
              <span className="font-semibold">
                {encryptEmail(data?.currentOwner ?? '')}
              </span>
            </p>
            <p className="text-xs">
              Document Name:{' '}
              <span className="font-semibold">{data?.documentName}</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 w-full ">
            <p className="text-primary-1 font-bold">Enter OTP:</p>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(val) => setOtp(val)}
              >
                <InputOTPGroup className="gap-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-14 w-12 text-2xl bg-secondary-1 rounded-md"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              type="submit"
              variant="default"
              className="w-full"
              onClick={handleSubmit}
              disabled={otp.length !== 6 || isLoadingClaimDocument}
            >
              {isLoadingClaimDocument ? 'Verifying...' : 'Verify'}
            </Button>
          </div>
        </div>
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
                        navigator.clipboard.writeText(
                          `${baseUrl}${qrCodes.privateId}`
                        );
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
                        navigator.clipboard.writeText(
                          `${baseUrl}${qrCodes.publicId}`
                        );
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
