'use client';

import { AuditLogTable } from './elements';
import { UseAuditLog } from './hooks';

/* istanbul ignore next */
export function AuditLogModule() {
  /* istanbul ignore next */
  const { data, isFetching } = UseAuditLog();

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
