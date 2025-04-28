'use client';

import { useSearchParams } from 'next/navigation';
import { AuditLogTable } from './elements';
import { UseAuditLog } from './hooks';
import { auditLogParamsSchema } from './types'; // Make sure this import exists

export function AuditLogModule() {
  const searchParams = useSearchParams();
  const params = auditLogParamsSchema.parse(Object.fromEntries(searchParams));
  console.log('Audit Log Params:', params);
  const { data, isFetching } = UseAuditLog(
    params.query,
    params.limit,
    params.page
  );

  /* istanbul ignore next */
  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      <h2 className="text-neutral-50 font-bold">Audit Log</h2>
      {isFetching || !data ? (
        <div>Loading audit logs...</div>
      ) : (
        <AuditLogTable data={data} pageCount={3} isFetching={isFetching} />
      )}
    </section>
  );
}
