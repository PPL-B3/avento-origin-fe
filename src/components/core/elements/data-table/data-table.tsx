import {
  flexRender,
  type ColumnDef,
  type Table as TanstackTable,
} from '@tanstack/react-table';
import * as React from 'react';
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '../../types/data-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Image from 'next/image';
import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
  /**
   * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
   * @type TanstackTable<TData>
   */
  table: TanstackTable<TData>;

  /**
   * The columns of the table
   * @default []
   * @type ColumnDef<TData, TValue>[]
   */
  columns: ColumnDef<TData, TValue>[];

  /**
   * The searchable columns of the table
   * @default []
   * @type {id: keyof TData, title: string}[]
   * @example searchableColumns={[{ id: "title", title: "titles" }]}
   */
  searchableColumns?: DataTableSearchableColumn<TData>[];

  /**
   * The filterable columns of the table. When provided, renders dynamic faceted filters, and the advancedFilter prop is ignored.
   * @default []
   * @type {id: keyof TData, title: string, options: { label: string, value: string, icon?: React.ComponentType<{ className?: string }> }[]}[]
   * @example filterableColumns={[{ id: "status", title: "Status", options: ["todo", "in-progress", "done", "canceled"]}]}
   */
  filterableColumns?: DataTableFilterableColumn<TData>[];

  /**
   * Show notion like filters when enabled
   * @default false
   * @type boolean
   */
  advancedFilter?: boolean;

  /**
   * The content to render in the floating bar on row selection, at the bottom of the table. When null, the floating bar is not rendered.
   * The datTable instance is passed as a prop to the floating bar content.
   * @default null
   * @type React.ReactNode | null
   * @example floatingBarContent={TasksTableFloatingBarContent(dataTable)}
   */
  floatingBarContent?: React.ReactNode | null;

  /**
   * The action to delete rows
   * @default undefined
   * @type React.MouseEventHandler<HTMLButtonElement> | undefined
   * @example deleteRowsAction={(event) => deleteSelectedRows(dataTable, event)}
   */
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;

  isFetching: boolean;
}

export function DataTable<TData, TValue>({
  table,
  columns,
  searchableColumns = [],
  filterableColumns = [],
  deleteRowsAction,
  isFetching,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="w-full space-y-2.5 overflow-auto">
      <DataTableToolbar
        table={table}
        filterableColumns={filterableColumns}
        searchableColumns={searchableColumns}
        deleteRowsAction={deleteRowsAction}
      />
      <div className="rounded-xl border overflow-clip">
        {isFetching ? (
          <div className="w-full h-full py-5 items-center justify-center flex">
            <Image
              src="/images/logo-black.svg"
              alt="Yacht Logo"
              width={150}
              height={150}
              className="animate-pulse"
            />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-[#E6EEF4]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (
                      header.id === 'date_start' ||
                      header.id === 'date_end' ||
                      header.id === 'q'
                    ) {
                      return null;
                    }
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="bg-neutral-50 text-neutral-950">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => {
                  const allRows = row
                    .getVisibleCells()
                    .filter(
                      (cell) =>
                        !cell.id.includes('date_start') &&
                        !cell.id.includes('date_end') &&
                        !cell.id.includes('q')
                    );
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {allRows.map((cell) => {
                        return (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {/* <div className="space-y-2.5 md:pr-12">
        <DataTablePagination table={table} />
      </div> */}
    </div>
  );
}
