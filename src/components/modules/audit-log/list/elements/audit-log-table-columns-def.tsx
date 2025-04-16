import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import { AuditLogEntry } from '../types';

/* istanbul ignore next */
export function fetchAuditLogTableColumnDefs(): ColumnDef<
  AuditLogEntry,
  unknown
>[] {
  /* istanbul ignore next */
  return [
    {
      id: 'timestamp',
      header: 'Timestamp',
      cell: ({ row }) => {
        const date = new Date(row.original.timestamp);
        const options: Intl.DateTimeFormatOptions = {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        };
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
      accessorKey: 'logID',
      header: 'Log ID',
    },
    {
      accessorKey: 'eventType',
      header: 'Event Type',
    },
    {
      accessorKey: 'userID',
      header: 'User ID',
    },
    {
      accessorKey: 'documentID',
      header: 'Document ID',
      cell: ({ row }) => {
        const documentID = row.original.documentID;
        return documentID || 'N/A';
      },
    },
  ];
}

/* istanbul ignore next */
export const filterableColumns: DataTableFilterableColumn<AuditLogEntry>[] = [];

/* istanbul ignore next */
export const searchableColumns: DataTableSearchableColumn<AuditLogEntry>[] = [];
