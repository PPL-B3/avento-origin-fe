'use client';

import { z } from 'zod';
import { AuditLogTable } from './elements';
import { UseAuditLog } from './hooks';
import { auditLogParamsSchema } from './types';

type QueryParamsType = z.infer<typeof auditLogParamsSchema>;

interface AuditLogModuleProps {
  queryParams: QueryParamsType;
}

export function AuditLogModule({ queryParams }: AuditLogModuleProps) {
  const { data, isFetching } = UseAuditLog(
    queryParams.q,
    queryParams.limit,
    queryParams.page
  );

  /* istanbul ignore next */
  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      <h2 className="text-neutral-50 font-bold">Audit Log</h2>
      {isFetching || !data ? (
        <div>Loading audit logs...</div>
      ) : (
        <AuditLogTable
          data={data.data}
          pageCount={data.meta.totalPages}
          isFetching={isFetching}
        />
      )}
    </section>
  );
}
