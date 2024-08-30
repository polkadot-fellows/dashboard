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
import { Dispatch, SetStateAction, useState } from 'react'

import { toast } from 'sonner'

import { Polkicon } from '@polkadot-ui/react'
import { useMediaQuery } from 'usehooks-ts'

import copy from 'copy-to-clipboard'
import { ArrowUpDown, Copy, ScanEye } from 'lucide-react'

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

import { Skeleton } from '@/components/ui/skeleton'
import { rankInfo } from '@/consts'
import {
  FellowshipMember,
  useFellowshipMembers,
} from '@/queries/useFellowshipMembers'
import { AccountName } from './AccountName'
import { LcStatusType, MemberInfo } from './MemberInfo'

const columns = (
  setInfoOpen: Dispatch<SetStateAction<boolean>>,
  setChosenMember: Dispatch<SetStateAction<FellowshipMember>>,
): ColumnDef<FellowshipMember>[] => [
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

  const [chosenMember, setChosenMember] = useState<FellowshipMember>(
    {} as FellowshipMember,
  )

  const { data: fellowshipMembers, isLoading: isLoading } =
    useFellowshipMembers(lcStatus)
  const [infoOpen, setInfoOpen] = useState(false)

  const table = useReactTable({
    data: fellowshipMembers || [],
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
        {isLoading ? (
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
