'use client';

import { Cross2Icon, PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import type { Table } from '@tanstack/react-table';
import Link from 'next/link';
import * as React from 'react';
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from '../../types/data-table';

import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { HiOutlineCalendar } from 'react-icons/hi2';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  searchableColumns?: DataTableSearchableColumn<TData>[];
  newRowLink?: string;
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>;
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  newRowLink,
  deleteRowsAction,
}: Readonly<DataTableToolbarProps<TData>>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isDeletePending, startDeleteTransition] = React.useTransition();

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1 pr-12 pb-2">
      <div className="flex max-md:flex-col max-md:w-full max-md:gap-2 flex-1 md:items-center items-start justify-start">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <>
                  {column.type === 'hidden' ? (
                    <></>
                  ) : column.type === 'date_range' ? (
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="default"
                          className={cn(
                            'w-full h-12 justify-start text-left font-normal md:mr-4',
                            !table.getColumn('date_start')?.getFilterValue() &&
                              'text-muted-foreground'
                          )}
                        >
                          <HiOutlineCalendar className="mr-2 h-6 w-6" />
                          {table.getColumn('date_start')?.getFilterValue() ? (
                            <>
                              {format(
                                new Date(
                                  String(
                                    table
                                      .getColumn('date_start')
                                      ?.getFilterValue()
                                  )
                                ),
                                'MMM dd, yyyy'
                              )}{' '}
                              -{' '}
                              {format(
                                new Date(
                                  String(
                                    table
                                      .getColumn('date_end')
                                      ?.getFilterValue() ||
                                      table
                                        .getColumn('date_start')
                                        ?.getFilterValue()
                                  )
                                ),
                                'MMM dd, yyyy'
                              )}
                            </>
                          ) : (
                            <span>Search by {column.title}...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          selected={{
                            from: table
                              .getColumn('date_start')
                              ?.getFilterValue()
                              ? new Date(
                                  String(
                                    table
                                      .getColumn('date_start')
                                      ?.getFilterValue()
                                  )
                                )
                              : undefined,
                            to: table.getColumn('date_end')?.getFilterValue()
                              ? new Date(
                                  String(
                                    table
                                      .getColumn('date_end')
                                      ?.getFilterValue()
                                  )
                                )
                              : undefined,
                          }}
                          onSelect={(range) => {
                            if (range?.from && !range?.to) {
                              range.to = range.from;
                            }
                            if (range?.to && !range?.from) {
                              range.from = range.to;
                            }
                            table
                              .getColumn('date_start')
                              ?.setFilterValue(
                                `${format(range?.from || new Date(), 'yyyy-MM-dd')}`
                              );
                            table
                              .getColumn('date_end')
                              ?.setFilterValue(
                                `${format(range?.to || new Date(), 'yyyy-MM-dd')}`
                              );
                          }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Input
                      key={String(column.id)}
                      placeholder={`Search by ${column.title}...`}
                      value={
                        (table
                          .getColumn(String(column.id))
                          ?.getFilterValue() as string) ?? ''
                      }
                      onChange={(event) =>
                        table
                          .getColumn(String(column.id))
                          ?.setFilterValue(event.target.value)
                      }
                      className="h-8 grow lg:w-[250px] md:mr-4 bg-neutral-50"
                    />
                  )}
                </>
              )
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : '') && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : '')}
                  title={column.title}
                  options={column.options}
                />
              )
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            aria-label="Delete selected rows"
            size="sm"
            className="h-8"
            onClick={(event) => {
              startDeleteTransition(() => {
                table.toggleAllPageRowsSelected(false);
                deleteRowsAction(event);
              });
            }}
            disabled={isDeletePending}
          >
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete
          </Button>
        ) : newRowLink ? (
          <Link aria-label="Create new row" href={newRowLink}>
            <div
              className={cn(
                buttonVariants({
                  size: 'sm',
                  className: 'h-8',
                })
              )}
            >
              <PlusCircledIcon className="mr-2 size-4" aria-hidden="true" />
              New
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
