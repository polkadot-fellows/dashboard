import { Link } from 'react-router-dom'
import CoreSubmitEvidence from './fellowshipCore.submitEvidence.png'
import PreimageCoreApprove from './preimage.fellowshipCore.approve.png'
import ProposalApprove from './proposal.fellowshipCore.approve.png'
import SalaryInduct from './fellowshipSalary.induct.png'
import SalaryBump from './fellowshipSalary.bump.png'
import CoreRegister from './fellowshipSalary.register.png'
import SalaryPayout from './fellowshipSalary.payout.png'
import SalaryPayoutOther from './fellowshipSalary.payoutOther.png'
import SalaryCheckPayment from './fellowshipSalary.checkPayment.png'
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
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[15%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Salary
      </h1>
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Salary and Ranking
      </h1>

      <p>
        The Fellowship{' '}
        <Link
          className="text-primary font-bold"
          to={'https://github.com/polkadot-fellows/manifesto'}
          target="_blank"
        >
          manifesto
        </Link>{' '}
        outlines the requirements and expectations for individuals to attain and
        retain any given rank, ranging between 0 to 9. By default, an active
        account on the collectives system chain has no assigned rank and can be
        inducted into the Polkadot Fellowship starting with rank 0. The
        Fellowship Manifesto states that members should receive a monthly
        allowance on par with gross income in OECD countries. A{' '}
        <Link
          className="text-primary font-bold"
          to={'https://github.com/polkadot-fellows/RFCs/pull/50'}
          target="_blank"
        >
          fellowship RFC
        </Link>{' '}
        was proposed with concrete amounts for each ranked members.
      </p>
      <div style={{ width: '30rem' }}>
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
        {/* <Table
            dataSource={source}
            columns={columns}
            pagination={false}
            size="small"
          /> */}
      </div>

      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Process Flow
      </h1>

      <p>
        Below is a comprehensive depiction, following a member's journey from
        induction, showcasing the various stages they undergo within the
        fellowship.
      </p>

      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Becoming a Polkadot Fellowship Member
      </h1>

      <p>
        Please refer to the{' '}
        <Link className="text-primary font-bold" to="/about">
          About page
        </Link>
        .
      </p>

      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Salary Cycle Initialization, Induction & Continuance
      </h1>

      <p>
        The salary pallet has been{' '}
        <Link
          className="text-primary font-bold"
          to="https://collectives.statescan.io/#/extrinsics/2983655-2"
        >
          initiated
        </Link>
        , members can now `induct` themselves into the payroll cycle(i.e. 30DAY
        periods).
      </p>

      <img className="my-6" src={SalaryInduct} alt="preimage" />

      <p>
        After an elapsed cycle, any account may call `bump` to move to the next
        cycle, this is required before calls to `register` for payment of the
        elasped cycle and subsequently calls to claim `payout` is possible.
      </p>

      <img className="my-6" src={SalaryBump} alt="preimage" />

      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Approval
      </h1>

      <p>
        Members of ranks I through VI are required to re-approve their ranks
        before their respective demotion periods elapses, as configured in the
        runtime{' '}
        <Link
          className="text-primary font-bold"
          to="https://github.com/polkadot-fellows/runtimes/issues/111#issuecomment-1872941849"
        >
          here
        </Link>
        .
      </p>

      <p>
        An evidence detailing a members involvement in the fellowship is
        submitted at a time before calling `approve`, subsequently the evidence
        should be sumbitted in the referandum description.
      </p>

      <img className="my-6" src={CoreSubmitEvidence} alt="preimage" />

      <p>
        Any account on the collectives system chain can submit a preimage of the
        call `approve` for ranked members of the fellowship in the appropriate
        track.
      </p>

      <img className="my-6" src={PreimageCoreApprove} alt="preimage" />

      <p>
        The preimage needs to be submitted to the 11 / Retain At I Dan for
        approval of the member's rank retention. This process will update the
        last_proof with the block number at which the call is executed.
      </p>

      <img className="my-6" src={ProposalApprove} alt="preimage" />

      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Payment Registration
      </h1>

      <p>
        After every payroll cycle(i.e. 30DAYS) and within the
        `RegistrationPeriod`(i.e. 15DAYS after the current payroll cycle),
        members should make a call to `register` for salary payout.
      </p>

      <img className="my-6" src={CoreRegister} alt="preimage" />

      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Claim Salary
      </h1>

      <p>
        After a combination of the payroll cycle and `RegistrationPeriod` have
        elapsed(i.e. 30DAYS + 15DAYS) members can begin claiming salary within
        the `PayoutPeriod`(i.e. within 15DAYS), with a call to `payout`.
      </p>

      <img className="my-6" src={SalaryPayout} alt="preimage" />

      <p>
        Alternatively members can claim payout to any account on the collectives
        system chain(i.e. `payout_other`).
      </p>

      <img className="my-6" src={SalaryPayoutOther} alt="preimage" />

      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0 my-6">
        Retriying Failed Payments
      </h1>

      <p>
        In the event of failed payments members can call `check_payment` to
        retry within the same cycle.
      </p>

      <img className="my-6" src={SalaryCheckPayment} alt="preimage" />
    </main>
  )
}
