import {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '@/components';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
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
      accessorKey: 'q',
      header: 'Q',
    },
    {
      accessorKey: 'eventType',
      header: 'Event Type',
    },
    {
      accessorKey: 'userID',
      header: 'User ID',
      cell: ({ row }) => {
        const userID = row.original.userID;
        if (!userID) {
          return 'N/A';
        }
        const isEmail = userID.includes('@') && userID.includes('.');
        if (isEmail) {
          return 'N/A';
        }
        return <p>{userID}</p>;
      },
    },
    {
      accessorKey: 'userEmail',
      header: 'User Email',
      cell: ({ row }) => {
        let userEmail = row.original.email;
        if (!userEmail) {
          userEmail = row.original.userID;
        }
        if (!userEmail) {
          return 'N/A';
        }
        const isEmail = userEmail.includes('@') && userEmail.includes('.');
        if (!isEmail) {
          return 'N/A';
        }
        return <p>{userEmail}</p>;
      },
    },
    {
      accessorKey: 'documentID',
      header: 'Document ID',
      cell: ({ row }) => {
        const documentID = row.original.documentID;
        if (!documentID) {
          return 'N/A';
        }
        return (
          <Link
            href={`/audit-log/${documentID}`}
            className="text-blue-600 underline"
          >
            {documentID}
          </Link>
        );
      },
    },
    {
      accessorKey: 'documentName',
      header: 'Document',
      cell: ({ row }) => {
        const documentName = row.original.documentName;
        console.log('documentName', documentName);
        if (!documentName) {
          return 'N/A';
        }
        return <p>{documentName}</p>;
      },
    },
    {
      accessorKey: 'startDate',
      header: 'Start Date',
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
    },
  ];
}

/* istanbul ignore next */
export const filterableColumns: DataTableFilterableColumn<AuditLogEntry>[] = [
  {
    id: 'eventType',
    title: 'Event Type',
    type: 'select',
    options: [
      { value: 'LOGIN', label: 'Login' },
      { value: 'LOGOUT', label: 'Logout' },
      { value: 'UPLOAD_DOCUMENT', label: 'Upload Document' },
      { value: 'TRANSFER_OWNERSHIP', label: 'Transfer' },
      { value: 'CLAIM_DOCUMENT', label: 'Claim' },
      { value: 'REVERSE_OWNERSHIP', label: 'Revert' },
    ],
  },
];

/* istanbul ignore next */
export const searchableColumns: DataTableSearchableColumn<AuditLogEntry>[] = [
  {
    id: 'q',
    title: 'User ID or Details',
  },
  {
    id: 'startDate',
    title: 'Start Date',
    type: 'date_range',
  },
  {
    id: 'endDate',
    title: 'End Date',
    type: 'hidden',
  },
];
