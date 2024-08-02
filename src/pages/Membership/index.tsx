import { Button } from '@/components/ui/button'
import induct from './fellowship-induct-call.png'
import preimagepromote from './fellowship-promote-member.png'
import proposalpromote from './fellowship-promotion-proposal.png'
import { openInNewTab } from '@/lib/utils'

export const Membership = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[20%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        MEMBERSHIP
      </h1>
      <div className="pageTop">
        <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Management
        </h2>

        <p className="my-4">
          The Polkadot technical Fellowship was initally
          <a
            className="text-[#E6007A] font-bold"
            href="https://github.com/polkadot-fellows/seeding"
            target="_blank"
          >
            seeded
          </a>{' '}
          with its members and their corresponding ranks, and got{' '}
          <a
            className="text-[#E6007A] font-bold"
            href="https://polkadot.polkassembly.io/motion/403"
            target="_blank"
          >
            added on to Polkadot's Collectives
          </a>{' '}
          system chain. All new membership requests will go through the
          fellowship governance and the procedure is outlined in the section
          below.
        </p>

        <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Becoming a Member
        </h2>

        <p className="my-4">
          As a member of the Polkadot Fellowship, you are expected to faithfully
          uphold the below tenets:
        </p>

        <ul>
          <li>
            - Sincerely uphold the interests of Polkadot and avoid actions which
            clearly work against it.
          </li>
          <li>- Respect the philosophy and principles of Polkadot.</li>
          <li>
            - Respect the operational procedures, norms and voting conventions
            of the Fellowship.
          </li>
          <li>- Respect fellow Members and the wider community.</li>
        </ul>

        <div className="note">
          <p className="my-4">
            For new fellowship inductions, Polkassembly has created an interface
            (still in beta) to
            <a
              className="text-[#E6007A] font-bold"
              href="https://collectives.polkassembly.io/join-fellowship?network=collectives"
              target="_blank"
            >
              apply for the Polkadot Fellowship
            </a>
            . This initiative is funded by Polkadot treasury through
            <a
              className="text-[#E6007A] font-bold"
              href="https://polkadot.polkassembly.io/treasury/574"
              target="_blank"
            >
              OpenGov referendum 373
            </a>
            .
          </p>
        </div>

        <p className="my-4">
          The fellowship manifesto states that any account may register to
          become a candidate for a basic deposit, but that feature has not been
          added to the collectives runtime yet. To be added as a candidate of
          the Polkadot Fellowship, a pre-existing member with rank greater than
          or equal to 1 can initiate the process. The fellowship membership
          management is administered through the{' '}
          <a
            className="text-[#E6007A] font-bold"
            href="https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/core-fellowship/src/lib.rs"
            target="_blank"
          >
            core fellowship
          </a>
          pallet.
        </p>

        <p className="my-4">
          An existing Technical Fellowship member with rank greater than or
          equal to 1 can submit the signed `induct` call, as shown below. It is
          recommended that the candidate account has a verified identity. Upon
          successfuly execution of the extrinsic, the candidate's account will
          be displayed on the{' '}
          <a
            className="text-[#E6007A] font-bold"
            href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/fellowship"
            target="_blank"
          >
            Fellowship Overview
          </a>
          tab on Polkadot-JS UI.
        </p>

        <img className={'adj-img'} src={induct} alt="induct" />

        <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Rank Updates
        </h2>

        <p className="my-4">
          The Polkadot Fellowship members are expected to provide a periodic
          evidence to request for retaining their rank or to get promoted to a
          higher rank.
        </p>

        <p className="my-4">
          Read more in the{' '}
          <a
            className="text-[#E6007A] font-bold"
            href="https://github.com/polkadot-fellows/Evidences"
            target="_blank"
          >
            Evidences repo
          </a>
          .
        </p>

        <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Promotion
        </h2>

        <p className="my-4">
          Any fellowship member upto rank 4 can be promoted to the next rank
          through a fellowship referenda that can be voted by the members who
          are 2 ranks higher. For instance, the fellowship{' '}
          <a
            className="text-[#E6007A] font-bold"
            href="https://collectives.subsquare.io/fellowship/referenda/64"
            target="_blank"
          >
            referenda 64
          </a>{' '}
          which promotes a member from rank 1 to rank 2 can only be voted by
          members whose ranks are greater than or equal to 3. Promotion of the
          Polkadot Fellowship members from rank 5 needs to be done through an
          OpenGov referendum.
        </p>
        <p className="my-4">
          This preimage example should include the call to `promote` an account
          to a specific rank, as shown below. This preimage can be added by any
          account on the collectives system chain.
        </p>
        <img className={'adj-img'} src={preimagepromote} alt="preimage" />

        <p className="my-4">
          In the snapshot below, the submission track is chosen as `21/Promote
          to I Dan`, origin as `FellowshipOrigins` and fellowship origins as
          `PromoteTo1Dan`. This selection should work for promoting a candidate
          with rank 0 to a member with rank 1.
        </p>

        <img className={'adj-img'} src={proposalpromote} alt="proposal" />

        <p className="my-4">
          For promoting a member from Rank 1 to Rank 2, the submission track can
          be chosen as `22/Promote to II Dan`, origin as `FellowshipOrigins` and
          fellowship origins as `PromoteTo2Dan`. Only the members with Rank{' '}
          {'>'}= 3 can vote on this proposal.
        </p>

        <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Retain Rank
        </h2>

        <p className="my-4">
          To retain a rank, the Polkadot Fellowship members are expected to
          submit evidence of work in an on-going basis.
        </p>

        <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Demotion and Suspension
        </h2>

        <p className="my-4">
          <span className="font-bold">Demotion</span> occurs automatically after
          a given period has elapsed, and the member is unable to defend their
          position to their peers.
        </p>
        <p className="my-4">
          <span className="font-bold">Suspension</span> can happen only through
          a Polkadot OpenGov referendum, which ensures that the Fellowship's
          bias alone does not necessarily result in expulsion.
        </p>
        <Button
          className="mt-6"
          onClick={() =>
            openInNewTab(
              'https://github.com/polkadot-fellows/manifesto/blob/0c3df46d76625980b8b48742cb86f4d8fa6dda8d/manifesto.pdf',
            )
          }
        >
          For more information see the Fellowship Manifesto
        </Button>
      </div>
    </main>
  )
}
