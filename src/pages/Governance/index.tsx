import { A, ButtonLink, DocPage, Figure } from '@/components/page'
import fellowshipArchitects from './fellowship-architects.png'
import fellowshipReferenda from './fellowship-referenda.png'
import whitelist from './fellowship-whitelist-xcm.png'
import rfc from './RFC.png'
import rfp from './RFP.png'
import spendingIndex from './spending-index.png'
import treasurySpend from './treasury-spend.png'

export const Governance = () => (
  <DocPage
    title="Governance"
    lead="The Fellowship has adopted a governance model where votes are weighted based on the rank of individual members."
    sections={[
      {
        id: 'referenda',
        title: 'Referenda',
        content: (
          <>
            <p>
              The Polkadot Technical Fellowship has adopted a governance model
              where the votes are weighted based on the rank of individual
              members. Referenda are managed by different origins and tracks,
              each with its own approval and support parameters.
            </p>
            <p>
              It is important to note that members of the Fellowship can only
              vote on Fellowship proposals that are available for their given
              rank.
            </p>
            <Figure src={fellowshipReferenda} alt="Fellowship referenda" />
          </>
        ),
      },
      {
        id: 'whitelisting',
        title: 'Whitelisting proposals',
        content: (
          <>
            <p>
              Polkadot OpenGov allows the Fellowship to authorize an origin
              known as "Whitelisted-Caller" to execute calls approved by the
              Fellowship with Root-level privileges. Only Rank 3+ members can
              vote on Whitelisting proposals, as shown below.
            </p>
            <Figure
              src={whitelist}
              alt="Voting on a whitelisting proposal (Polkadot-JS UI)"
            />
            <p>
              The process for submitting a proposal as an OpenGov referendum is
              facilitated and documented by{' '}
              <A href="https://github.com/joepetrowski/opengov-cli">
                OpenGov-cli
              </A>
              .
            </p>
            <p>
              <ButtonLink href="https://collectives.polkassembly.io/referenda/166">
                Whitelisting in action: Proposal 166
              </ButtonLink>
            </p>
          </>
        ),
      },
      {
        id: 'sub-treasury',
        title: 'Sub-treasury spending',
        content: (
          <>
            <p>
              The Fellowship operates a{' '}
              <A href="https://polkadot.polkassembly.io/referenda/832">
                sub-treasury
              </A>{' '}
              that relies on the <code>Fellows</code> and{' '}
              <code>Architects</code> tracks to fund proposals.
            </p>
            <p>
              As per Section 8, 9, and 10 of the Manifesto, the Fellowship
              sub-treasury is primarily used for:
            </p>
            <ul>
              <li>Allowances (i.e. members’ salaries)</li>
              <li>Prizes (i.e. honourable prizes from Masters)</li>
              <li>
                Events and Gatherings (i.e. Fellowship meetings, members’
                in-person interviews)
              </li>
            </ul>
            <p>However, the Fellowship sub-treasury may also be used to:</p>
            <ul>
              <li>Incentivise development-focused initiatives through RFPs</li>
              <li>
                Reward contributors for resolving small technical issues through
                bounties
              </li>
            </ul>

            <h3>Overview</h3>
            <p>
              Sub-treasury spends can be requested in DOT and other assets owned
              by the Sub-treasury account on AssetHub. Spends are executed by
              the Fellowship Treasury pallet which has no burning mechanism, no
              spend periods, and no Payout periods.
            </p>
            <p>
              Spends can be submitted on the{' '}
              <A href="https://collectives.subsquare.io/fellowship/tracks/3">
                <code>Fellows</code>
              </A>{' '}
              track for amounts up to 10,000 DOT and on the{' '}
              <A href="https://collectives.subsquare.io/fellowship/tracks/4">
                <code>Architects</code>
              </A>{' '}
              track for any amounts of DOT. For each of these tracks, no more
              than 10 general proposals (including whitelisting and treasury
              proposals) can be simultaneously voted on, as shown below.
            </p>
            <Figure
              src={fellowshipArchitects}
              alt="The Architects track (Subsquare UI)"
            />
            <p>
              Spends can be disbursed into any account on{' '}
              <A href="https://assethub-polkadot.subscan.io/">AssetHub</A>.
              Proposers need to ensure that they have at least 6 DOT available
              on their account to complete all on-chain submission procedures.
            </p>
            <p>
              Approved spends need to be claimed by the beneficiary account, as
              shown below (
              <A href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fsys.ibp.network%2Fcollectives-polkadot#/extrinsics/decode/0x410600000000">
                Polkadot-JS UI
              </A>
              ).
            </p>
            <Figure src={spendingIndex} alt="Claiming an approved spend" />
            <p>
              More detailed instructions for locating relevant spend data
              on-chain and claiming payouts can be found in the{' '}
              <A href="https://wiki.polkadot.com/learn/learn-guides-treasury/#manually-claiming-payouts">
                Polkadot Wiki
              </A>
              .
            </p>

            <h3>Walkthrough</h3>
            <p>
              Spends will be executed by the Fellowship Treasury pallet and paid
              from the Sub-Treasury{' '}
              <A href="https://assethub-polkadot.subscan.io/account/16VcQSRcMFy6ZHVjBvosKmo7FKqTb8ZATChDYo8ibutzLnos">
                account on AssetHub
              </A>
              .
            </p>
            <p>
              Preimages can be <strong>created</strong> using the{' '}
              <A href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fcollectives.api.onfinality.io%2Fpublic-ws#/preimages">
                Polkadot-JS UI
              </A>
              . There is a minimum bond/deposit of 0.41 DOT for the on-chain
              submission of each preimage.
            </p>
            <Figure
              className="max-w-md"
              src={treasurySpend}
              alt="Creating the preimage of a treasury spend"
            />
            <p>
              Proposals can only be{' '}
              <strong>submitted by Fellows or Architects</strong>. There is no
              submission deposit, but there is a decision deposit of 5 DOT for
              the on-chain submission of each proposal.
            </p>
            <p>
              <ButtonLink href="https://collectives.subsquare.io/fellowship/referenda/186">
                Sub-treasury spending in action: Proposal 186
              </ButtonLink>
            </p>
          </>
        ),
      },
      {
        id: 'rfc-proposals',
        title: 'RFC proposals',
        content: (
          <>
            <p>
              <A href="https://github.com/polkadot-fellows/RFCs">RFCs</A> are
              proposed changes to the technical implementation of the Polkadot
              network administered by the Fellowship via an on-chain voting
              mechanism. Members of Rank 3+ decide when to approve and merge
              RFCs via an on-chain remark as shown below.
            </p>
            <Figure
              src={rfc}
              alt="Approving an RFC with an on-chain remark (Polkadot-JS UI)"
            />
          </>
        ),
      },
      {
        id: 'rfp-proposals',
        title: 'RFP proposals',
        content: (
          <>
            <p>
              <A href="https://github.com/polkadot-fellows/RFCs">RFPs</A> are
              specific tasks or projects overseen by the Fellowship. They are
              administered by the Fellowship via an on-chain voting mechanism
              similar to that of RFCs. However, unlike RFCs, all members can
              vote on when to approve or merge RFPs.
            </p>
            <Figure src={rfp} alt="Voting on an RFP" />
          </>
        ),
      },
    ]}
  />
)
