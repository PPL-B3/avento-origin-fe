'use client';

import { Suspense } from 'react';
import { AuditLogTable } from './elements';
import { AuditLogEntry } from './types';

export function AuditLogModule() {
  const currentDateTime = new Date();

  const DUMMY_DATA: AuditLogEntry[] = [
    {
      timestamp: String(currentDateTime),
      activity: 'User login',
      detail: "User 'admin' logged in",
      new_user: '',
      previous_user: '',
    },
    {
      timestamp: String(currentDateTime),
      activity: 'Transfer dokumen',
      detail: 'Lorem Ipsum',
      new_user: 'Tuan Krab',
      previous_user: 'Plankton',
    },
  ];

  return (
    <section className="pb-20 max-md:px-5 min-h-screen w-full flex flex-col bg-[#001D3D] md:pt-32 md:px-20 pt-28 text-neutral-50">
      <h2 className="text-neutral-50 font-bold">Audit Log</h2>
      <Suspense fallback={<div>Loading audit logs...</div>}>
        <AuditLogTable data={DUMMY_DATA} pageCount={3} isFetching={false} />
      </Suspense>
    </section>
  );
}
