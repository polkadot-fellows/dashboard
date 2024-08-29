import { ThemedLink } from '@/components/ThemedComponents'

export const Modules = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[15%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Modules
      </h1>
      <h1 className="mb-8 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        On-chain Modules
      </h1>
      <p>
        The Polkadot Fellowship is split across several on-chain modules
        (pallets):
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Core Fellowship
      </h1>
      <p>
        This pallet(i.e. `palet_core_fellowship`) enforces cordination of a
        ranked membership collective(i.e The Polkadot Fellowship), sets salary
        amount, registers activity / passivity, handles promotion and demotion
        e.t.c.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Parameters
      </h1>
      <p>
        A changable set of values / settings which determine the salary amounts
        and Temporal parameters for the pallet instance.
      </p>
      <div className="text-bold">Salary</div>
      <ul>
        <li>
          Active: Otherwise known as standard allowance, is kept between the
          80th-90th percentile of gross income in the OECD group of countries,
          which is equivalent to $80,000 at present for fellows (i.e. Dan III).
          The salary allocations for ranked members are intricately calibrated
          by <ThemedLink to="/membership">rank</ThemedLink>.
        </li>
        <li>
          Passive: A claimable allowance set at 50% of the active salary for
          members that believe they are unlikely to contribute substantially
          within any given month. Activity / passivity is toggled with a call to
          the `is_active` extrinsic. However, passivity does not exclude a
          member from challenge or grading periods.
        </li>
      </ul>
      <div className="text-bold">Temporal Parameters</div>
      <ul>
        <li>
          Demotion Period: The elapsed amount of blocks from `last_proof`, which
          a member ought to have defended their rank prior to this time or risk
          automatic demotion through the ranks. For Dan I & II the demotion
          period is set at 657,450 blocks (3 months), while for Dan III through
          VI, it extends to 1,314,900 blocks (6 months). Ranks higher than VI
          are excluded from automatic demotion.{' '}
        </li>
        <li>
          Min Promotion Period: The minimum period which a member can submit a
          desire to move up the ranks, this is set to 2,629,800 (1 year) for
          ranks between II and VII, 13,149,000 (5 years) for Dan VIII and
          21,038,400 (8 years) for Dan IX. 3.{' '}
        </li>
        <li>
          Offboard Timeout: The alloted time for candidates to become a member,
          which is 1 year(i.e. 2,629,800 blocks) from the moment the candidate
          was inducted into this pallet.
        </li>
      </ul>
      <div className="note">
        <h3>Extrinsics, Origins and Process Flow</h3>
        <p>
          Please visit the [salary
          page](https://polkadot-fellows.github.io/dashboard/salary) to learn
          more about the dispatchable calls, allowed origins and the technical
          fellowship's current usage of `pallet_core_fellowship`.
        </p>
      </div>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Salary
      </h1>
      <p>
        This pallet(i.e. `pallet_salary`) handles the disbursment of allowances,
        claimable by ranked members of the collective within cycles.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Cycle
      </h1>
      <p>
        Succictly known as a "payroll cycle", is the amount of blocks (i.e. the
        equivalent of 30 calender days) that must pass before a ranked member
        becomes eligible to register a claim for a payout. Following this
        `RegistrationPeriod` (i.e. the equivalent of 15 calender days), the
        member can then claim the payout during the designated `PayoutPeriod`
        (i.e. equivalent of 15 calender days) else wait until the next cycle.
      </p>
      <div className="note">
        <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Extrinsics, Origins and Process Flow
        </h1>
        <p>
          Please visit the [salary
          page](https://polkadot-fellows.github.io/dashboard/salary) to learn
          more about the dispatchable calls, allowed origins and the technical
          fellowship's current usage of `pallet_salary`.
        </p>
      </div>
    </main>
  )
}
