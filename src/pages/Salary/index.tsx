import { A, ButtonLink, DocPage, Figure } from '@/components/page'
import { RankBadge } from '@/components/RankBadge'
import { rankInfo } from '@/consts'
import { usd } from '@/lib/utils'
import SalaryBump from './fellowshipSalary.bump.png'
import SalaryCheckPayment from './fellowshipSalary.checkPayment.png'
import SubsquarePayout from './fellowshipSalary.payout.subsquare.png'
import SalaryPayoutOther from './fellowshipSalary.payoutOther.png'
import SubsquareRegister from './fellowshipSalary.register.subsquare.png'
import ImportMe from './import_me.png'

const SalaryTable = () => (
  <div className="not-prose overflow-hidden rounded-lg border">
    <table className="w-full text-left text-sm">
      <thead className="text-muted-foreground bg-muted/50 border-b text-xs">
        <tr>
          <th className="px-4 py-3 font-medium">Dan</th>
          <th className="px-4 py-3 font-medium">Title</th>
          <th className="px-4 py-3 text-right font-medium">Yearly</th>
          <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">
            Monthly
          </th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {rankInfo
          .filter(({ rank }) => rank > 0)
          .map(({ rank, name, salary }) => (
            <tr key={rank}>
              <td className="px-4 py-2.5">
                <RankBadge rank={rank} />
              </td>
              <td className="px-4 py-2.5 font-medium">{name}</td>
              <td className="px-4 py-2.5 text-right tabular-nums">
                {usd(salary)}
              </td>
              <td className="text-muted-foreground hidden px-4 py-2.5 text-right tabular-nums sm:table-cell">
                {usd(salary / 12)}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
)

export const Salary = () => (
  <DocPage
    title="Salary"
    lead="Members of the Fellowship receive a monthly allowance according to their rank, claimed on-chain through the salary pallet."
    sections={[
      {
        id: 'ranking',
        title: 'Salary and ranking',
        content: (
          <>
            <p>
              The Polkadot Technical{' '}
              <A href="https://github.com/polkadot-fellows/manifesto">
                manifesto
              </A>{' '}
              states that members should receive a monthly allowance on par with
              gross income in OECD countries. An{' '}
              <A href="https://github.com/polkadot-fellows/RFCs/pull/50">RFC</A>{' '}
              proposed concrete compensation figures for each rank.
            </p>
            <SalaryTable />
          </>
        ),
      },
      {
        id: 'induction',
        title: 'Induction',
        content: (
          <>
            <p>
              Members can induct themselves into the Salary cycle (i.e. 30-day
              period) through the salary pallet, as shown below.
            </p>
            <Figure
              src={ImportMe}
              alt="Inducting yourself into the salary cycle (Salary UI)"
            />
            <p>
              After the current Salary cycle has elapsed, members can submit the
              signed <code>bump</code> call to move to the next Salary cycle, as
              shown below. This is required before registration and payouts can
              be processed.
            </p>
            <Figure
              src={SalaryBump}
              alt="Bumping the salary cycle (Polkadot-JS UI)"
            />
          </>
        ),
      },
      {
        id: 'registration',
        title: 'Registration',
        content: (
          <>
            <p>
              To become eligible for a payout during a given salary cycle,
              members need to register their account within the Registration
              period of 15 days, as shown below.
            </p>
            <Figure
              src={SubsquareRegister}
              alt="Registering for the current salary cycle (Salary UI)"
            />
            <p>
              Once registered into the current cycle, their names will be
              displayed in the list of claimants.
            </p>
            <p>
              <ButtonLink
                variant="outline"
                href="https://collectives.subsquare.io/fellowship/salary/feeds"
              >
                Feed of the current Salary cycle on Subsquare
              </ButtonLink>
            </p>
          </>
        ),
      },
      {
        id: 'payouts',
        title: 'Payouts',
        content: (
          <>
            <p>
              Members can start claiming salary payouts as soon as the Payout
              period has begun. They will have 15 days to submit their claim
              on-chain, as shown below.
            </p>
            <Figure
              src={SubsquarePayout}
              alt="Claiming a salary payout (Salary UI)"
            />
            <p>
              Members also have the option to claim a payout and send it into
              any account on the Collectives system chain by submitting the
              signed <code>payout_other</code> call, as shown below.
            </p>
            <Figure
              src={SalaryPayoutOther}
              alt="Claiming a payout into another account (Polkadot-JS UI)"
            />
          </>
        ),
      },
      {
        id: 'failed-payments',
        title: 'Failed payments',
        content: (
          <>
            <p>
              If a payment fails, members can submit the signed{' '}
              <code>check_payment</code> call to reset the payout status, and
              then attempt to claim the payout again within the same Salary
              cycle, as shown below.
            </p>
            <Figure
              src={SalaryCheckPayment}
              alt="Checking a failed payment (Polkadot-JS UI)"
            />
          </>
        ),
      },
    ]}
  />
)
