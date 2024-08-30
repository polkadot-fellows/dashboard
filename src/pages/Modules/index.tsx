export const Modules = () => {
  return (
    <main>
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
        Modules
      </h1>
      <p>
        The Polkadot Technical Fellowship is split across several on-chain
        modules (pallets).
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
        `pallet_ranked_collective`
      </h1>
      <p>
        This manages the members and candidates of the Fellowship body together
        with their rank. A changeable set of values/settings determine the
        temporal parameters:{' '}
      </p>
      <p>
        <span className="text-primary font-bold">1. Demotion Period:</span> The
        elapsed amount of blocks from `last_proof, which a member ought to have
        defended their rank prior to this time or risk automatic demotion
        through the ranks. For Dan I & II the demotion period is set at 657,450
        blocks (3 months), while for Dan III through VI, it extends to 1,314,900
        blocks (6 months). Ranks higher than VI are excluded from automatic
        demotion.
      </p>
      <p>
        <span className="text-primary font-bold">2. Min Promotion Period:</span>{' '}
        The minimum period which a member can submit a desire to move up the
        ranks, this is set to 2,629,800 (1 year) for ranks between II and VII,
        13,149,000 (5 years) for Dan VIII and 21,038,400 (8 years) for Dan IX.
      </p>
      <p>
        <span className="text-primary font-bold">3. Offboard Timeout:</span> The
        alloted time for candidates to become a member, which is 1 year(i.e.
        2,629,800 blocks) from the moment the candidate was inducted into this
        pallet.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
        `pallet_referenda`
      </h1>
      <p>
        This gives an on-chain "voice" (specifically, several Frame Origins) to
        the Fellowship body through proposals and voting by members, with
        eligibility and weighting of those votes according to a member's rank.
        Voting on induction of candidates, and promotion and retention of
        members are conducted by this module.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
        `pallet_core_fellowship`
      </h1>
      <p>
        This controls the overall process of induction, promotion and demotion
        according to the Fellowship rules and timelines, and handles the
        retention of "evidence" which members and candidates submit for these
        processes.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
        `pallet_salary`
      </h1>
      <p>
        This controls the payments which eligible members are afforded. A
        changeable set of values/settings determine the salary amounts:{' '}
      </p>
      <p>
        <span className="text-primary font-bold">1. Active:</span> Otherwise
        known as standard allowance.
      </p>
      <p>
        <span className="text-primary font-bold">2. Passive:</span> A claimable
        allowance set at 50% of the active salary for members that believe they
        are unlikely to contribute substantially within any given month.
      </p>
      <p>
        Activity/passivity is toggled with a call to the `is_active extrinsic`.
        However, passivity does not exclude a member from challenges or grading
        periods.
      </p>
      <h1 className="my-4 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
        `pallet_treasury`
      </h1>
      <p>
        This is the Treasury-management logic allowing people to request funding
        directly from the Fellowship.
      </p>
    </main>
  )
}
