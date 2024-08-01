/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { useLocalStorage } from 'usehooks-ts'
import { ellipsisFn } from '@polkadot-ui/utils'
import { Polkicon } from '@polkadot-ui/react'

import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

import type { DotQueries } from '@polkadot-api/descriptors'
import type { Binary } from 'polkadot-api'

import { Button } from '@/components/ui/button'
import { api, papi } from '@/clients'

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { rankInfo } from '@/consts'
import { AccountName } from './AccountName'

export type AccountInfoIF = {
  key?: number
  address: string
  rank: number
  display?: string
  github?: string
  legal?: string
  riot?: string
  email?: string
  twitter?: string
  web?: string
}

const dataToString = (value: number | string | Binary | undefined) =>
  typeof value === 'object' ? value.asText() : (value ?? '')

const mapRawIdentity = (
  rawIdentity?: DotQueries['Identity']['IdentityOf']['Value'],
) => {
  if (!rawIdentity) return rawIdentity
  const {
    info: { additional, display, email, legal, riot, twitter, web },
  } = rawIdentity[0]

  console.log('info', additional, display, email, legal, riot, twitter, web)
  const display_id = dataToString(display.value)
  const additionalInfo = Object.fromEntries(
    additional.map(([key, { value }]) => [
      dataToString(key.value!),
      dataToString(value),
    ]),
  )

  return {
    ...additionalInfo,
    display: display_id,
    web: dataToString(web.value),
    email: dataToString(email.value),
    legal: dataToString(legal.value),
    riot: dataToString(riot.value),
    twitter: dataToString(twitter.value),
  }
}

const fellMembers: AccountInfoIF[] = []

export const columns: ColumnDef<AccountInfoIF>[] = [
  {
    accessorKey: 'display',
    header: 'display',
  },
  {
    accessorKey: 'address',
    header: 'Name',
    cell: ({ row }) => {
      console.log('displ', row.getValue('legal'), row.getValue('display'))
      return (
        <div style={{ display: 'flex' }}>
          <div style={{ padding: '0 2rem' }}>
            <Polkicon copy address={row.getValue('address')} size={32} />
          </div>
          <AccountName
            display={row.getValue('display')}
            address={row.getValue('address')}
          />
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      const r = parseInt(row.getValue('rank'), 0)
      const { name } = rankInfo[r]
      return <div>{name}</div>
    },
  },
  {
    accessorKey: 'rank',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rank
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const r = parseInt(row.getValue('rank'), 0)
      const { rank, color } = rankInfo[r]
      const col = '"' + color + '"'
      console.log(col)
      return <Badge style={{ background: col }}>{rank}</Badge>
    },
  },
  // {
  //   id: 'actions',
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]

export const RequestsGrid = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [members, setMembers] = useState<AccountInfoIF[]>([])
  const [fellowshipMembers, setFellowshipMembers] = useLocalStorage<any[]>(
    'fellowship-members',
    [],
  )

  useEffect(() => {
    const fetchMembers = async () => {
      const collectiveAddresses: any =
        await api?.query.FellowshipCollective.Members.getEntries().then(
          (mems: any[]) =>
            papi.query.Identity?.IdentityOf?.getValues(
              mems.map((m) => m.keyArgs),
            ).then((identities: any[]) =>
              identities.map((identity, idx) => ({
                address: mems[idx].keyArgs[0],
                rank: mems[idx].value,
                ...mapRawIdentity(identity),
              })),
            ),
        )

      setMembers([
        ...collectiveAddresses.sort(
          (a: { rank: number }, b: { rank: number }) =>
            a.rank > b.rank ? -1 : 1,
        ),
      ])
    }

    if (fellowshipMembers.length) {
      setMembers(fellowshipMembers)
    }
    fetchMembers()
  }, [])

  useEffect(() => {
    let i = 0
    members.forEach((m) => {
      fellMembers.push({
        key: i++,
        display: m.legal || m.display || ellipsisFn(m.address, 6),
        rank: m.rank,
        address: m.address,
      })
    })
    setFellowshipMembers(members)
    if (members.length) setLoading(false)
  }, [members])

  const table = useReactTable({
    data: fellowshipMembers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
