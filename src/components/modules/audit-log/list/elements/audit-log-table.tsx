'use client';

import { DataTable, useDataTable } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { AuditLogEntry } from '../types';
import {
  fetchAuditLogTableColumnDefs,
  filterableColumns,
  searchableColumns,
} from './audit-log-table-columns-def';

interface AuditLogTableProps {
  data: AuditLogEntry[];
  pageCount: number;
  isFetching: boolean;
}

/* istanbul ignore next */
export const AuditLogTable = ({
  data,
  pageCount,
  isFetching,
}: AuditLogTableProps) => {
  /* istanbul ignore next */
  const columns = useMemo<ColumnDef<AuditLogEntry, unknown>[]>(
    () => fetchAuditLogTableColumnDefs(),
    []
  );

  /* istanbul ignore next */
  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

  /* istanbul ignore next */
  return (
    <DataTable
      table={table}
      columns={columns}
      searchableColumns={searchableColumns}
      filterableColumns={filterableColumns}
      isFetching={isFetching}
    />
  );
};
