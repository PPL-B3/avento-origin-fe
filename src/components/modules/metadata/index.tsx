'use client';

import { useParams } from 'next/navigation';

export function MetadataModule() {
  const { qr_code } = useParams<{
    qr_code: string;
  }>();

  return (
    <section
      data-testid="upload-document-module"
      className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50"
    >
      <h4 className="w-full text-center text-4xl font-bold">{qr_code}</h4>
    </section>
  );
}
