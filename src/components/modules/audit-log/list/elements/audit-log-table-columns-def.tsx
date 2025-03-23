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
      id: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => {
        const date = new Date(row.original.timestamp);
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('id-ID', options);
        const formattedTime = date.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      accessorKey: 'activity',
      header: 'Aktivitas',
    },
    {
      accessorKey: 'detail',
      header: 'Detail Perubahan',
    },
    {
      accessorKey: 'previous_user',
      header: 'Pemilik Lama',
    },
    {
      accessorKey: 'new_user',
      header: 'Pemilik Baru',
    },
  ];
}

export const filterableColumns: DataTableFilterableColumn<AuditLogEntry>[] = [];

export const searchableColumns: DataTableSearchableColumn<AuditLogEntry>[] = [];
