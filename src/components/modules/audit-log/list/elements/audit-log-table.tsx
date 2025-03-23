import { DataTable, useDataTable } from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { AuditLogEntry } from '../types';
import {
  fetchAuditLogTableColumnDefs,
  filterableColumns,
  searchableColumns,
} from './audit-log-table-columns-def';

interface AgentsTableProps {
  data: AuditLogEntry[];
  pageCount: number;
  isFetching: boolean;
}

export const AgentsTable = ({
  data,
  pageCount,
  isFetching,
}: AgentsTableProps) => {
  const columns = useMemo<ColumnDef<AuditLogEntry, unknown>[]>(
    () => fetchAuditLogTableColumnDefs(),
    []
  );

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    searchableColumns,
    filterableColumns,
  });

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
