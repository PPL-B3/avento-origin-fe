import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { AuditLogEntry } from '../types';

export function fetchAuditLogTableColumnDefs(): ColumnDef<
  AuditLogEntry,
  unknown
>[] {
  return [
    {
      accessorKey: 'agent_id',
      header: 'Agents ID',
    },
    {
      accessorKey: 'full_name',
      header: 'Full Name',
    },
    {
      accessorKey: 'fee_in_percentage',
      header: 'Agent Fee',
    },
    {
      accessorKey: 'discount_percentage',
      header: 'Discount',
    },
    {
      accessorKey: 'phone_number',
      header: 'Phone Number',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'nationality',
      header: 'Nationality',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<AuditLogEntry>[] = [];

export const searchableColumns: DataTableSearchableColumn<AuditLogEntry>[] = [];
