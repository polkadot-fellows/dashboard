/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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

import { toast } from 'sonner'

import { useLocalStorage, useMediaQuery } from 'usehooks-ts'
import { ellipsisFn } from '@polkadot-ui/utils'
import { Polkicon } from '@polkadot-ui/react'

import copy from 'copy-to-clipboard'
import { ArrowUpDown, Copy, ScanEye } from 'lucide-react'

import type { PeopleQueries } from '@polkadot-api/descriptors'
import type { Binary } from 'polkadot-api'
import { api, people_api } from '@/clients'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { rankInfo } from '@/consts'
import { AccountName } from './AccountName'
import { Skeleton } from '@/components/ui/skeleton'
import { LcStatusType, MemberInfo } from './MemberInfo'

export type AccountInfoIF = {
  address: string
  rank: number
  display?: string
  github?: string
  legal?: string
  matrix?: string
  email?: string
  twitter?: string
  web?: string
}

const dataToString = (value: number | string | Binary | undefined) =>
  typeof value === 'object' ? value.asText() : (value ?? '')

const mapRawIdentity = (
  rawIdentity?: PeopleQueries['Identity']['IdentityOf']['Value'],
) => {
  if (!rawIdentity) return rawIdentity
  const {
    info: { display, email, legal, matrix, twitter, web },
  } = rawIdentity[0]

  const display_id = dataToString(display.value)

  return {
    display: display_id,
    web: dataToString(web.value),
    email: dataToString(email.value),
    legal: dataToString(legal.value),
    matrix: dataToString(matrix.value),
    twitter: dataToString(twitter.value),
  }
}

const fellMembers: AccountInfoIF[] = []

const columns = (
  setInfoOpen: Dispatch<SetStateAction<boolean>>,
  setChosenMember: Dispatch<SetStateAction<AccountInfoIF>>,
): ColumnDef<AccountInfoIF>[] => [
  { accessorKey: 'matrix' },
  { accessorKey: 'display' },
  { accessorKey: 'github' },
  { accessorKey: 'legal' },
  { accessorKey: 'email' },
  { accessorKey: 'twitter' },
  { accessorKey: 'web' },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      return (
        <div className="flex">
          <div className="px-8">
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
      return <Badge style={{ background: color }}>{rank}</Badge>
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex justify-evenly">
          <Copy
            className={`cursor-pointer text-primary`}
            onClick={() => {
              toast.success('Address copied.')
              copy(row.getValue('address'))
            }}
          />
          <ScanEye
            className={`cursor-pointer text-primary`}
            onClick={() => {
              setChosenMember({
                address: row.getValue('address'),
                rank: row.getValue('rank'),
                display: row.getValue('display'),
                github: row.getValue('github'),
                legal: row.getValue('legal'),
                matrix: row.getValue('matrix'),
                email: row.getValue('email'),
                twitter: row.getValue('twitter'),
                web: row.getValue('web'),
              })
              setInfoOpen(true)
            }}
          />
        </div>
      )
    },
  },
]

export const RequestsGrid = ({ lcStatus }: LcStatusType) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    display: false,
    github: false,
    legal: false,
    matrix: false,
    email: false,
    twitter: false,
    web: false,
    title: !isMobile,
    rank: !isMobile,
  })
  const [loading, setLoading] = useState<boolean>(true)
  const [chosenMember, setChosenMember] = useState<AccountInfoIF>(
    {} as AccountInfoIF,
  )
  const [members, setMembers] = useState<AccountInfoIF[]>([])
  const [infoOpen, setInfoOpen] = useState(false)
  const [fellowshipMembers, setFellowshipMembers] = useLocalStorage<any[]>(
    'fellowship-members',
    [],
  )

  useEffect(() => {
    const fetchMembers = async () => {
      const collectiveAddresses: any =
        await api?.query.FellowshipCollective.Members.getEntries().then(
          (mems: any[]) =>
            people_api.query.Identity.IdentityOf.getValues(
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
    members.forEach((m) => {
      fellMembers.push({
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
    columns: columns(setInfoOpen, setChosenMember),
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
        {loading ? (
          <Skeleton className="h-[25rem] w-[100%] rounded-xl" />
        ) : (
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
        )}
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
      <MemberInfo
        lcStatus={lcStatus}
        member={chosenMember}
        open={infoOpen}
        onOpenChange={setInfoOpen}
      />
    </div>
  )
}
