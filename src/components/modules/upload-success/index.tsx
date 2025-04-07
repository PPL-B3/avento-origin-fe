// Pastikan kamu sudah install library dengan: npm install qrcode.react
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

export function UploadSuccessModule() {
  const [qrData, setQrData] = useState({ primaryQR: '', secondaryQR: '' });

  useEffect(() => {
    // Fetch QR codes from the API
    async function fetchQRCodes() {
      try {
        const primaryQRResponse = await fetch(
          'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example'
        );
        const secondaryQRResponse = await fetch(
          'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example'
        );

        setQrData({
          primaryQR: primaryQRResponse.url,
          secondaryQR: secondaryQRResponse.url,
        });
      } catch (error) {
        console.error('Failed to fetch QR codes:', error);
      }
    }

    fetchQRCodes();
  }, []);

  // Fungsi untuk mengunduh QR code sebagai gambar
  function downloadQRCode(elementId: string, fileName: string) {
    const svgElement = document.getElementById(elementId);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = `${fileName}.png`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }

  return (
    <div className="min-h-screen bg-[#001D3D] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">
            UPLOAD SUCCESSFUL!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* QR Code Utama Section */}
          <div className="flex flex-col items-center">
            <p className="font-medium mb-4 text-center">QR Code Utama</p>
            <div
              className="bg-gray-100 w-40 h-40 flex items-center justify-center mb-4 cursor-pointer hover:shadow-md transition-all"
              onClick={() => downloadQRCode('primary-qr', 'qr-code-utama')}
              title="Klik untuk download"
            >
              <QRCodeSVG
                id="primary-qr"
                value={qrData.primaryQR}
                size={150}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-center text-sm max-w-xs">
              Penggunaan PRIBADI. Untuk transfer dokumen & lihat dokumen
            </p>
          </div>

          {/* QR Code Kedua Section */}
          <div className="flex flex-col items-center">
            <p className="font-medium mb-4 text-center">QR Code Kedua</p>
            <div
              className="bg-gray-100 w-40 h-40 flex items-center justify-center mb-4 cursor-pointer hover:shadow-md transition-all"
              onClick={() => downloadQRCode('secondary-qr', 'qr-code-kedua')}
              title="Klik untuk download"
            >
              <QRCodeSVG
                id="secondary-qr"
                value={qrData.secondaryQR}
                size={150}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="text-center text-sm max-w-xs">
              Untuk disebarluaskan. Berisi email pemilik dokumen dan riwayat
              transfer dokumen
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Klik QR code untuk download
          </p>
        </div>
      </div>
    </div>
  );
}
