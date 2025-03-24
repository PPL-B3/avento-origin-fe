export function UploadSuccessModule() {
  return (
    <div className="min-h-screen bg-[#001D3D] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-navy-900">
            UPLOAD SUCCESSFUL!
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* QR Code Utama Section */}
          <div className="flex flex-col items-center">
            <p className="font-medium mb-4 text-center">QR Code Utama</p>
            <div className="bg-gray-100 w-40 h-40 flex items-center justify-center mb-4">
              {/* QR placeholder */}
              <div className="text-gray-400 text-xs">QR Code Area</div>
            </div>
            <p className="text-center text-sm max-w-xs">
              Penggunaan PRIBADI. Untuk transfer dokumen & lihat dokumen
            </p>
          </div>

          {/* QR Code Kedua Section */}
          <div className="flex flex-col items-center">
            <p className="font-medium mb-4 text-center">QR Code Kedua</p>
            <div className="bg-gray-100 w-40 h-40 flex items-center justify-center mb-4">
              {/* QR placeholder */}
              <div className="text-gray-400 text-xs">QR Code Area</div>
            </div>
            <p className="text-center text-sm max-w-xs">
              Untuk disebarluaskan. Berisi email pemilik dokumen dan riwayat
              transfer dokumen
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Klik QR code untuk download
          </button>
        </div>
      </div>
    </div>
  );
}
