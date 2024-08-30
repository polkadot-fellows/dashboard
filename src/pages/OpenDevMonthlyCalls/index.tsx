import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { monthlyCalls2024, nextMonthlyCall } from '@/monthlyCalls'
import { useMediaQuery } from 'usehooks-ts'

const dataSource2024 = Object.entries(monthlyCalls2024)
  .map((v) => ({
    key: v[0],
    sessions: v[1][0],
    videos: v[1][1],
    minutes: v[1][2],
  }))
  .sort((a, b) => parseInt(b.key) - parseInt(a.key))

const dataSource2023 = [
  {
    key: '3',
    sessions: '19th December 2023',
    videos:
      'https://www.youtube.com/watch?v=VjHjRicXtl0&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=4&pp=iAQB',
    minutes:
      'https://forum.polkadot.network/t/technical-fellowship-opendev-call-2023-12-19-notes/5356',
  },
  {
    key: '2',
    sessions: '17th October 2023',
    videos:
      'https://www.youtube.com/watch?v=WJ2NUPUgWF0&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=5&pp=iAQB',
    minutes: 'N/A',
  },
  {
    key: '1',
    sessions: '17th October 2023',
    videos:
      'https://www.youtube.com/watch?v=5P6Axm4JrmQ&list=PLtyd7v_I7PGlDJCCCLGLjJ0yv33JAEE_-&index=6&pp=iAQB',
    minutes: 'N/A',
  },
]

const columns = [
  {
    header: 'Key',
    accessorKey: 'key',
  },
  {
    header: 'Sessions',
    accessorKey: 'sessions',
  },
  {
    header: 'Videos',
    accessorKey: 'videos',
  },
  {
    header: 'Meeting Minutes',
    accessorKey: 'minutes',
  },
]

export const OpenDevMonthlyCalls = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    key: false,
  })

  const table_2023 = useReactTable({
    data: dataSource2023,
    columns,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: { columnVisibility },
  })

  const table_2024 = useReactTable({
    data: dataSource2024,
    columns,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    state: { columnVisibility },
  })
  return (
    <main>
      <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Monthly calls
      </h1>
      <p>
        The Polkadot Fellowship runs a call (“OpenDev”) on a monthly basis to
        share current and future developments of the Polkadot roadmap.
      </p>
      <h2 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
        Agenda
      </h2>
      <p>
        All new and existing members are invited to join this live call to
        introduce themselves, present their contributions to the codebase,
        participate in discussions about RFCs, propose ideas for the growth of
        the Fellowship, and answer questions from the general public.
      </p>
      <h2 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
        Upcoming call
      </h2>
      <div className="my-4 font-unbounded flex-1 shrink-0 whitespace-nowrap text-md font-semibold tracking-tight sm:grow-0">
        The next monthly call is scheduled for the{' '}
        {isMobile ? (
          <div className="font-extrabold text-primary text-xl">
            {nextMonthlyCall}
          </div>
        ) : (
          <span className="font-extrabold text-primary text-xl">
            {nextMonthlyCall}
          </span>
        )}
      </div>
      <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
        Past calls
      </h2>
      <h2 className="pt-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        2024
      </h2>
      <Table className={isMobile ? 'w-[60vw]' : ''}>
        <TableHeader>
          {table_2024.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-bolder text-lg">
                    {flexRender(
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
          {table_2024.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === 'sessions') {
                  return (
                    <TableCell key={cell.id}>
                      {row.getValue('sessions')}
                    </TableCell>
                  )
                } else if (cell.column.id === 'minutes') {
                  return (
                    <TableCell key={cell.id}>
                      {row.getValue('minutes') === 'N/A' ? (
                        '-'
                      ) : (
                        <Link
                          to={row.getValue('minutes')}
                          className="text-[blue]"
                          target="_blank"
                        >
                          {!isMobile && 'Meeting Minutes '}#
                          {row.getValue('key')}
                        </Link>
                      )}
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell key={cell.id}>
                      <Link
                        to={row.getValue('videos')}
                        className="text-[blue]"
                        target="_blank"
                      >
                        {!isMobile && 'OpenDev '}#{row.getValue('key')}
                      </Link>
                    </TableCell>
                  )
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        2023
      </h2>
      <Table className={isMobile ? 'w-[60vw]' : ''}>
        <TableHeader>
          {table_2024.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-bolder text-lg">
                    {flexRender(
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
          {table_2023.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
            >
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id === 'sessions') {
                  return (
                    <TableCell key={cell.id}>
                      {row.getValue('sessions')}
                    </TableCell>
                  )
                } else if (cell.column.id === 'minutes') {
                  return (
                    <TableCell key={cell.id}>
                      {row.getValue('minutes') === 'N/A' ? (
                        '-'
                      ) : (
                        <Link
                          to={row.getValue('minutes')}
                          className="text-[blue]"
                          target="_blank"
                        >
                          {!isMobile && 'Meeting Minutes '}#
                          {row.getValue('key')}
                        </Link>
                      )}
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell key={cell.id}>
                      <Link
                        to={row.getValue('videos')}
                        className="text-[blue]"
                        target="_blank"
                      >
                        {!isMobile && 'OpenDev '}#{row.getValue('key')}
                      </Link>
                    </TableCell>
                  )
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
