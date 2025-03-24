'use client';

import { useParams } from 'next/navigation';

function InformationRow({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 px-3">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
}

export function MetadataModule() {
  const { qr_code } = useParams<{
    qr_code: string;
  }>();

  const DOCUMENT_NAME = 'Akte Kelahiran';
  const DOCUMENT_OWNER = 'natnanda04@gmail.com';
  const DOCUMENT_TYPE = 'Tipe';

  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex items-center flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      <div className="bg-neutral-50 text-neutral-950 p-5 rounded-lg w-2/3 h-fit py-12 px-10">
        <h2 className="text-neutral-950 pb-8 font-extrabold">
          DOCUMENT DETAIL {qr_code}
        </h2>
        <div className="flex flex-col gap-y-5">
          <InformationRow label="Document Name" value={DOCUMENT_NAME} />
          <div data-testid="divider" className="w-full h-0.5 bg-neutral-950" />
          <InformationRow label="Document Owner" value={DOCUMENT_OWNER} />
          <div data-testid="divider" className="w-full h-0.5 bg-neutral-950" />
          <InformationRow label="Document Type" value={DOCUMENT_TYPE} />
        </div>
      </div>
    </section>
  );
}
