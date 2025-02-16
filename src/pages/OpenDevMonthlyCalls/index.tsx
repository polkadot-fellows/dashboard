import {
  VisibilityState,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { monthlyCalls2024, nextMonthlyCall } from '@/monthlyCalls'
import { useMediaQuery } from 'usehooks-ts'
import { reusableH1 } from '@/consts'

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
    <>
      <h1 className={reusableH1 + ' py-2'}>Monthly calls</h1>
      <p>
        The Polkadot Fellowship runs a call (“OpenDev”) on a monthly basis to
        share current and future developments of the Polkadot roadmap.
      </p>
      <h2 className="my-4 flex-1 shrink-0 whitespace-nowrap font-unbounded text-lg font-semibold tracking-tight text-primary sm:grow-0">
        Agenda
      </h2>
      <p>
        All new and existing members are invited to join this live call to
        introduce themselves, present their contributions to the codebase,
        participate in discussions about RFCs, propose ideas for the growth of
        the Fellowship, and answer questions from the general public.
      </p>
      <h2 className="my-4 flex-1 shrink-0 whitespace-nowrap font-unbounded text-lg font-semibold tracking-tight text-primary sm:grow-0">
        Upcoming calls
      </h2>

      <iframe width="800"
              height="600"
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&showPrint=0&src=N2FiNDZiY2RhNmQyM2U3YjQxMzA2MjUxZDQ1M2UzMTQ3MWE5YTNjYmVkYWIzNWRhNjliZWU3MzBkNmU2MGE5M0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23E67C73"
              title="Fellowship live calendar" >
      </iframe>
    </>
  )
}
