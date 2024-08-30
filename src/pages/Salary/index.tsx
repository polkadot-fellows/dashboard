import SalaryInduct from './fellowshipSalary.induct.png'
import SubsquareRegister from './fellowshipSalary.register.subsquare.png'
import SubsquarePayout from './fellowshipSalary.payout.subsquare.png'
import SalaryPayoutOther from './fellowshipSalary.payoutOther.png'
import SalaryCheckPayment from './fellowshipSalary.checkPayment.png'
import ImportMe from './import_me.png'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ThemedLink } from '@/components/ThemedComponents'

const source = [
  {
    key: '1',
    dan: 'I',
    title: 'Member',
    salary: '$10,000',
  },
  {
    key: '2',
    dan: 'II',
    title: 'Proficient',
    salary: '$20,000',
  },
  {
    key: '3',
    dan: 'III',
    title: 'Fellow',
    salary: '$80,000',
  },
  {
    key: '4',
    dan: 'IV',
    title: 'Architect',
    salary: '$120,000',
  },
  {
    key: '5',
    dan: 'V',
    title: 'Architect Adept',
    salary: '$160,000',
  },
  {
    key: '6',
    dan: 'VI',
    title: 'Grand Architect',
    salary: '$200,000',
  },
  {
    key: '7',
    dan: 'VII',
    title: 'Free Master',
    salary: '$200,000',
  },
  {
    key: '8',
    dan: 'VIII',
    title: 'Master Constant',
    salary: '$200,000',
  },
  {
    key: '9',
    dan: 'IX',
    title: 'Grand Master',
    salary: '$200,000',
  },
]

const columns = [
  {
    header: 'Dan',
    accessorKey: 'dan',
  },
  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Salary',
    accessorKey: 'salary',
  },
]

export const Salary = () => {
  const table = useReactTable({
    data: source,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <main>
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Salary
      </h1>
      <div className="pageTop">
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-3">
          Salary and Ranking
        </h1>
        <p>
          The Polkadot Technical{' '}
          <ThemedLink
            to={'https://github.com/polkadot-fellows/manifesto'}
            target="_blank"
          >
            manifesto
          </ThemedLink>{' '}
          states that members should receive a monthly allowance on par with
          gross income in OECD countries. An{' '}
          <ThemedLink
            to={'https://github.com/polkadot-fellows/RFCs/pull/50'}
            target="_blank"
          >
            RFC
          </ThemedLink>{' '}
          proposed concrete compensation figures for each rank.
        </p>
        <Table className="max-w-[80vw]">
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
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
          Induction
        </h1>
        <p>
          Members can induct themselves into the Salary cycle (i.e. 30-day
          period) through the salary pallet, as shown below (Salary UI).
        </p>
        <img className="my-6" src={ImportMe} alt="import me in salary" />
        <p>
          After the current Salary cycle has elapsed, members can submit the
          signed `bump` call to move to the next Salary cycle, as shown below
          (Polkadot-JS UI). This is required before registration and payouts can
          be processed.
        </p>
        <img className="my-6" src={SalaryInduct} alt="salary induct" />
      </div>
      <div className="">
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
          Registration
        </h1>
        <p>
          To become eligible for a payout during a given salary cycle, members
          need to register their account within the Registration period of 15
          days, as shown below (Salary UI).
        </p>
        <img
          className="my-6"
          src={SubsquareRegister}
          alt="Subsquare register"
        />
        <p>
          Once registered into the current cycle, their names will be displayed
          in the list of claimants.
        </p>
        <ThemedLink
          to={'https://collectives.subsquare.io/fellowship/salary/feeds'}
          target="_blank"
        >
          Check out the feed for the current Salary cycle on Subsquare
        </ThemedLink>
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
          Payouts
        </h1>
        <p>
          Members can start claiming salary payouts as soon as the Payout period
          has begun. They will have 15 days to submit their claim on-chain, as
          shown below (Salary UI).
        </p>
        <img className="my-6" src={SubsquarePayout} alt="Subsquare payout" />
        <p>
          Members also have the option to claim a payout and send it into any
          account on the Collectives system chain by submitting the signed
          `payout_other` call, as shown below (Polkadot-JS UI).
        </p>
        <img
          className="my-6"
          src={SalaryPayoutOther}
          alt="Salary Payout Other"
        />
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
          Failed payments
        </h1>
        <p>
          If a payment fails, members can submit the signed `check_payment` call
          to reset the payout status, and then attempt to claim the payout again
          within the same Salary cycle, as shown below (Polkadot-JS UI).
        </p>
        <img className="my-6" src={SalaryCheckPayment} alt="check Payment" />
      </div>
    </main>
  )
}
