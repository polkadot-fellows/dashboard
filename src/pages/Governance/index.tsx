import { Button } from '@/components/ui/button'
import whitelist from './fellowship-whitelist-xcm.png'
import fellowshipReferenda from './fellowship-referenda.png'
import fellowshipArchitects from './fellowship-architects.png'
import spendingIndex from './spending-index.png'
import treasurySpend from './treasury-spend.png'
import rfp from './RFP.png'
import rfc from './RFC.png'

import { openInNewTab } from '@/lib/utils'
import { ThemedLink } from '@/components/ThemedComponents'

export const Governance = () => {
  return (
    <main>
      <div className="header">
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0">
          Governance
        </h1>
      </div>
      <div className="pageTop">
        <p>
          The Polkadot Technical Fellowship has adopted a governance model where
          the votes are weighted based on the rank of individual members.
          Referenda are managed by different origins and tracks, each with its
          own approval and support parameters.
        </p>
        <p>
          It is important to note that members of the Fellowship can only vote
          on Fellowship proposals that are available for their given rank.
        </p>
        <img
          className="my-6"
          src={fellowshipReferenda}
          alt="Fellowship referenda"
        />
        <div className="my-4">
          <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
            Whitelisting proposals
          </h2>
          <p>
            Polkadot OpenGov allows the Fellowship to authorize an origin known
            as "Whitelisted-Caller" to execute calls approved by the Fellowship
            with Root-level privileges. Only Rank 3+ members can vote on
            Whitelisting proposals, as shown below (Polkadot-JS UI).
          </p>
          <img className="my-6" src={whitelist} alt="whitelist" />
          <p>
            The process for submitting a proposal as an OpenGov referendum is
            facilitated and documented by{' '}
            <ThemedLink
              to="https://github.com/joepetrowski/opengov-cli"
              target="_blank"
            >
              OpenGov-cli
            </ThemedLink>
            .
          </p>
          <Button
            className="my-5"
            onClick={() =>
              openInNewTab('https://collectives.polkassembly.io/referenda/166')
            }
          >
            Whitelisting in action: Proposal 166
          </Button>
        </div>
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          Sub-Treasury spending proposals
        </h1>
        <p>
          The Fellowship operates a{' '}
          <ThemedLink to={'https://polkadot.polkassembly.io/referenda/832'}>
            sub-treasury
          </ThemedLink>{' '}
          that relies on the `Fellows` and `Architects` tracks to fund
          proposals.
        </p>
        <p>
          As per Section 8, 9, and 10 of the Manifesto, the Fellowship
          sub-treasury is primarily used for:
        </p>
        <ul className="list-disc m-5">
          <li>Allowances (i.e members’ salaries)</li>
          <li>Prizes (i.e honourable prizes from Masters)</li>
          <li>
            Events and Gatherings (i.e Fellowship meetings, members’ in-person
            interviews)
          </li>
        </ul>
        <p>However, the Fellowship sub-treasury may also be used to:</p>
        <ul className="list-disc m-5">
          <li>Incentivise development-focused initiatives through RFPs</li>
          <li>
            Reward contributors for resolving small technical issues through
            bounties
          </li>
        </ul>
        <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Overview
        </h2>
        <p>
          Sub-treasury spends can be requested in DOT and other assets owned by
          the Sub-treasury account on AssetHub. Spends are executed by the
          Fellowship Treasury pallet which has no burning mechanism, no spend
          periods, and no Payout periods.
        </p>
        <p>
          Spends can be submitted on the{' '}
          <ThemedLink
            to={'https://collectives.subsquare.io/fellowship/tracks/3'}
          >
            `Fellows`
          </ThemedLink>{' '}
          track for amounts up to 10,000 DOT and on the{' '}
          <ThemedLink
            to={'https://collectives.subsquare.io/fellowship/tracks/4'}
          >
            `Architects`
          </ThemedLink>{' '}
          track for any amounts of DOT. For each of these tracks, no more than
          10 general proposals (including whitelisting and treasury proposals)
          can be simultaneously voted on, as shown below (Subsquare UI).
        </p>
        <img
          className="my-6"
          src={fellowshipArchitects}
          alt="Fellowship architects"
        />
        <p>
          Spends can be disbursed into any account on{' '}
          <ThemedLink to="https://assethub-polkadot.subscan.io/">
            AssetHub
          </ThemedLink>
          .
        </p>
        <p>
          Proposers need to ensure that they have at least 6 DOT available on
          their account to complete all on-chain submission procedures.
        </p>
        <p>
          Approved spends need to be claimed by the beneficiary account, as
          shown below (
          <ThemedLink to="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fsys.ibp.network%2Fcollectives-polkadot#/extrinsics/decode/0x410600000000">
            Polkadot-JS UI
          </ThemedLink>
          ).
        </p>
        <img className="my-6" src={spendingIndex} alt="spending index" />
        <p>
          More detailed instructions for locating relevant spend data on-chain
          and claiming payouts can be found in the{' '}
          <ThemedLink to="https://wiki.polkadot.network/docs/learn-guides-treasury#manually-claiming-payouts">
            Polkadot Wiki
          </ThemedLink>
          .
        </p>
        <h2 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Walkthrough
        </h2>
        <p>
          Spends will be executed by the Fellowship Treasury pallet and paid
          from the Sub-Treasury{' '}
          <ThemedLink to="https://assethub-polkadot.subscan.io/account/16VcQSRcMFy6ZHVjBvosKmo7FKqTb8ZATChDYo8ibutzLnos">
            account on AssetHub
          </ThemedLink>
          .
        </p>
        <p>
          Preimages can be{' '}
          <span className="text-primary font-bold">created</span> using the{' '}
          <ThemedLink to="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fcollectives.api.onfinality.io%2Fpublic-ws#/preimages">
            Polkadot-JS UI
          </ThemedLink>
          . There is a minimum bond/deposit of 0.41 DOT for the on-chain
          submission of each preimage.
        </p>
        <img
          className="my-6 max-w-[30rem]"
          src={treasurySpend}
          alt="treasury spend"
        />
        <p>
          Proposals can only be{' '}
          <span className="text-primary font-bold">
            submitted by Fellows or Architects
          </span>
          . There is no submission deposit, but there is a decision deposit of 5
          DOT for the on-chain submission of each proposal.
        </p>
        <Button
          className="my-6"
          onClick={() =>
            openInNewTab(
              'https://collectives.subsquare.io/fellowship/referenda/186',
            )
          }
        >
          Sub-treasury spending in action: Proposal 186
        </Button>

        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0 my-6">
          RFC proposals
        </h1>
        <p>
          <ThemedLink to="https://github.com/polkadot-fellows/RFCs">
            RFCs
          </ThemedLink>{' '}
          are proposed changes to the technical implementation of the Polkadot
          network administered by the Fellowship via an on-chain voting
          mechanism. Members of Rank 3+ decide when to approve and merge RFCs
          via an on-chain remark as shown below (Polkadot-JS UI).
        </p>
        <img className="my-6" src={rfc} alt="RFC" />
        <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-2xl font-semibold tracking-tight sm:grow-0 my-6">
          RFP proposals
        </h1>
        <p>
          <ThemedLink to="https://github.com/polkadot-fellows/RFCs">
            RFPs
          </ThemedLink>{' '}
          are specific tasks or projects overseen by the Fellowship. They are
          administered by the Fellowship via an on-chain voting mechanism
          similar to that of RFCs. However, unlike RFCs, all members can vote on
          when to approve or merge RFPs.
        </p>
        <img className="my-6" src={rfp} alt="RFP" />
      </div>
    </main>
  )
}
