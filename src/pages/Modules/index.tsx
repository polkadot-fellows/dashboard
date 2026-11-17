import { DocPage } from '@/components/page'

export const Modules = () => (
  <DocPage
    title="Modules"
    lead="The Polkadot Technical Fellowship is split across several on-chain modules (pallets)."
    sections={[
      {
        id: 'ranked-collective',
        title: 'pallet_ranked_collective',
        content: (
          <>
            <p>
              This manages the members and candidates of the Fellowship body
              together with their rank. A changeable set of values/settings
              determine the temporal parameters:
            </p>
            <ol>
              <li>
                <strong>Demotion period:</strong> the elapsed amount of blocks
                from <code>last_proof</code>, which a member ought to have
                defended their rank prior to this time or risk automatic
                demotion through the ranks. For Dan I &amp; II the demotion
                period is set at 657,450 blocks (3 months), while for Dan III
                through VI, it extends to 1,314,900 blocks (6 months). Ranks
                higher than VI are excluded from automatic demotion.
              </li>
              <li>
                <strong>Min promotion period:</strong> the minimum period which
                a member can submit a desire to move up the ranks, this is set
                to 2,629,800 (1 year) for ranks between II and VII, 13,149,000
                (5 years) for Dan VIII and 21,038,400 (8 years) for Dan IX.
              </li>
              <li>
                <strong>Offboard timeout:</strong> the allotted time for
                candidates to become a member, which is 1 year (i.e. 2,629,800
                blocks) from the moment the candidate was inducted into this
                pallet.
              </li>
            </ol>
          </>
        ),
      },
      {
        id: 'referenda',
        title: 'pallet_referenda',
        content: (
          <p>
            This gives an on-chain "voice" (specifically, several Frame Origins)
            to the Fellowship body through proposals and voting by members, with
            eligibility and weighting of those votes according to a member's
            rank. Voting on induction of candidates, and promotion and retention
            of members are conducted by this module.
          </p>
        ),
      },
      {
        id: 'core-fellowship',
        title: 'pallet_core_fellowship',
        content: (
          <p>
            This controls the overall process of induction, promotion and
            demotion according to the Fellowship rules and timelines, and
            handles the retention of "evidence" which members and candidates
            submit for these processes.
          </p>
        ),
      },
      {
        id: 'salary',
        title: 'pallet_salary',
        content: (
          <>
            <p>
              This controls the payments which eligible members are afforded. A
              changeable set of values/settings determine the salary amounts:
            </p>
            <ol>
              <li>
                <strong>Active:</strong> otherwise known as standard allowance.
              </li>
              <li>
                <strong>Passive:</strong> a claimable allowance set at 50% of
                the active salary for members that believe they are unlikely to
                contribute substantially within any given month.
              </li>
            </ol>
            <p>
              Activity/passivity is toggled with a call to the{' '}
              <code>is_active</code> extrinsic. However, passivity does not
              exclude a member from challenges or grading periods.
            </p>
          </>
        ),
      },
      {
        id: 'treasury',
        title: 'pallet_treasury',
        content: (
          <p>
            This is the Treasury-management logic allowing people to request
            funding directly from the Fellowship.
          </p>
        ),
      },
    ]}
  />
)
