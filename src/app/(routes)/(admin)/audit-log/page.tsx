'use client';

import { AuditLogModule } from '@/components';
import { auditLogParamsSchema } from '@/components/modules/audit-log/list/types';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function AuditLogPage() {
  return (
    <Suspense fallback={<div>Loading params...</div>}>
      <AuditLogPageContent />
    </Suspense>
  );
}

function AuditLogPageContent() {
  const searchParams = useSearchParams();
  const params = auditLogParamsSchema.parse(Object.fromEntries(searchParams));

  return <AuditLogModule queryParams={params} />;
}
