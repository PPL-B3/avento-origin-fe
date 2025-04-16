import { Button } from '@/components/ui/button';
import QRCode from 'react-qr-code';
import { toast } from 'sonner';
import { downloadQRCode } from '../upload-document';

interface QRCodesProps {
  privateId?: string;
  publicId?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  backButtonText?: string;
}

export function QRCodeDisplay({
  privateId,
  publicId,
  onBack,
  showBackButton = false,
  backButtonText = 'Upload Another Document',
}: Readonly<QRCodesProps>) {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/metadata/`;

  return (
    <div className="w-3/4 flex flex-col items-center mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg">
          <h5 className="text-black text-xl font-semibold mb-4">
            Private QR Code
          </h5>
          {privateId && (
            <>
              <div id="private-qr-container">
                <QRCode
                  id="private-qr"
                  value={`${baseUrl}${privateId}`}
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
                    navigator.clipboard.writeText(`${baseUrl}${privateId}`);
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
                    downloadQRCode('private-qr', `private-${privateId}`)
                  }
                  className="text-xs"
                >
                  Download QR
                </Button>
              </div>
              <p className="text-black mt-4 text-center break-all font-bold">
                URL: {baseUrl}
                {privateId}
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
          {publicId && (
            <>
              <div id="public-qr-container">
                <QRCode
                  id="public-qr"
                  value={`${baseUrl}${publicId}`}
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
                    navigator.clipboard.writeText(`${baseUrl}${publicId}`);
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
                    downloadQRCode('public-qr', `public-${publicId}`)
                  }
                  className="text-xs"
                >
                  Download QR
                </Button>
              </div>
              <p className="text-black mt-4 text-center break-all font-bold">
                URL: {baseUrl}
                {publicId}
              </p>
              <p className="mt-3">
                Untuk disebarluaskan. Berisi email pemilik dokumen dan riwayat
                transfer dokumen
              </p>
            </>
          )}
        </div>
      </div>

      {showBackButton && (
        <Button
          onClick={onBack}
          className="mt-8 bg-[#0067CC]"
          variant="default"
        >
          {backButtonText}
        </Button>
      )}
    </div>
  );
}
