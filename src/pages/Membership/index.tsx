import { Button } from '@/components/ui/button'
import { openInNewTab } from '@/lib/utils'
import { Link } from 'react-router-dom'
import PolkassemblyInduction from './polkassembly-inductions.png'
import SubsquareInduction from './subsquareInduction.png'
import Evidence1 from './evidence1.png'
import Evidence2 from './evidence2.png'
import Rank from './rank.png'

export const Membership = () => {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[15%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Membership
      </h1>
      <div className="pageTop">
        <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Management
        </h2>

        <p className="my-4">
          The Polkadot technical Fellowship was initally
          <Link
            className="text-primary font-bold"
            to="https://github.com/polkadot-fellows/seeding"
            target="_blank"
          >
            seeded
          </Link>{' '}
          with its members and their corresponding ranks in November 2022 and
          then{' '}
          <Link
            className="text-primary font-bold"
            to="https://polkadot.polkassembly.io/motion/403"
            target="_blank"
          >
            added on to Polkadot's Collectives
          </Link>{' '}
          system chain.
        </p>
        <p>
          Membership is now entirely managed on-chain through the procedures
          outlined below.
        </p>
        <p>
          Members of the Polkadot Fellowship are expected to faithfully uphold
          the following tenets:
          <ol className="list-decimal ml-4">
            <li>
              Sincerely uphold the interests of Polkadot and avoid actions which
              clearly work against it.
            </li>
            <li>Respect the philosophy and principles of Polkadot.</li>
            <li>
              Respect the operational procedures, norms and voting conventions
              of the Fellowship.
            </li>
            <li>Respect fellow Members and the wider community.</li>
          </ol>
        </p>
        <p className="my-4">
          Members of the Polkadot Fellowship are expected to provide periodic
          evidence to retain their current rank or get promoted to a higher
          rank.
        </p>
        <Button
          className="my-4"
          variant="default"
          onClick={() =>
            openInNewTab('https://github.com/polkadot-fellows/Evidences')
          }
        >
          Find out more in the Evidences repo.
        </Button>

        <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Application
        </h1>

        <p>
          Prospective candidates can{' '}
          <Link
            to="https://collectives.polkassembly.io/join-fellowship?network=collectives"
            target="_blank"
          >
            join the Polkadot Technical Fellowship
          </Link>{' '}
          by submitting their application on a public forum, as shown below
          (Polkassembly UI).
        </p>

        <img className="py-10 w-[45rem]" src={PolkassemblyInduction} />

        <p className="my-4">
          As a minimum, applicants need to provide the following information in
          their application:
          <ul className="list-disc ml-4">
            <li>Background information of the applicant</li>
            <li>
              Motivation(s) for applying to the Polkadot Technical Fellowship
            </li>
            <li>Area(s) of interest in relation to the Polkadot ecosystem.</li>
            <li>Contribution(s) to Polkadot SDK (if any)</li>
            <li>Link to the GitHub profile of the applicant</li>
            <li>Polkadot address with a verified on-chain identity</li>
          </ul>
          Once an application is pre-approved, the applicant becomes eligible
          for induction to the Fellowship as a candidate.
        </p>
        <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Induction
        </h1>
        <div>
          <p className="my-4">
            The Polkadot Technical Fellowship Manifesto states that any account
            may register to become a candidate for a basic deposit, but that
            feature has not been added to the Collectives runtime yet. To be
            added as a candidate, a pre-existing member with rank greater than
            or equal to 1 can initiate this process by submitting the signed
            `induct` call, as shown below (Core Fellowship UI).
          </p>

          <img className="py-10 w-[45rem]" src={SubsquareInduction} />

          <p>
            Upon successful execution of the extrinsic, the candidate's account
            will be displayed with Rank 0 on the{' '}
            <Link
              className="text-primary font-bold"
              to="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/fellowship"
              target="_blank"
            >
              Fellowship Overview
            </Link>{' '}
            (Polkadot-JS UI).
          </p>

          <Button
            className="my-4"
            variant="default"
            onClick={() =>
              openInNewTab(
                'https://docs.google.com/spreadsheets/d/1LTA-yAnOn8dJAkRXMnORFU4X1tp-yA13uZQpHEzdwic/edit?usp=sharing',
              )
            }
          >
            Discover individual members in the Fellowship profiles.
          </Button>
        </div>
        <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Retention
        </h1>
        <div>
          <p className="my-4">
            To retain their current rank, members of the Polkadot Technical
            Fellowship must submit evidence of the work they have undertaken in
            recent months. As a minimum, members need to provide the following
            information in their{' '}
            <Link
              className="text-primary font-bold"
              to="https://github.com/polkadot-fellows/Evidences?tab=readme-ov-file#process"
              target="_blank"
            >
              evidence report
            </Link>
            :
            <ul className="list-disc ml-4">
              <li>General membership details</li>
              <li>
                Motivation(s) for applying to the Polkadot Technical Fellowship
              </li>
              <li>
                Area(s) of interest/expertise in relation to the Polkadot SDK
              </li>
              <li>Contribution(s) to Polkadot SDK</li>
              <li>Links to relevant commits/repos on GitHub</li>
              <li>
                Links to relevant posts/articles/videos on social media (if
                applicable)
              </li>
            </ul>
          </p>
          <p className="mt-4">
            Evidences need to be submitted on-chain{' '}
            <Link
              to="https://github.com/polkadot-fellows/Evidences?tab=readme-ov-file#timelines"
              className="text-primary font-bold"
              target="_blank"
            >
              before expiry of the demotion period
            </Link>
            , as shown below (Core Fellowship UI)""
          </p>
          <img className="pt-10 w-[45rem]" src={Evidence1} />
          <img className="pb-10 w-[45rem]" src={Evidence2} />
          <p>
            Upon successful execution of the extrinsic, the retention evidence
            will be displayed on the{' '}
            <Link
              className="text-primary font-bold"
              to="https://collectives.subsquare.io/fellowship/core"
              target="_blank"
            >
              Core Fellowship page UI
            </Link>
            . Afterwards, a proposal will be submitted to approve this evidence
            on-chain.
          </p>
        </div>

        <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Promotion
        </h1>
        <div>
          <p>
            Provided they have submitted sufficient{' '}
            <Link
              to="https://github.com/polkadot-fellows/Evidences"
              target="_blank"
              className="text-primary font-bold"
            >
              evidence
            </Link>{' '}
            to sustain their request, any member of the Polkadot Technical
            Fellowship of Rank 1-4 can be promoted to the next rank by approval
            voting of members who are 2 ranks higher. For instance, a proposal
            to promote a member from rank 1 to rank 2 can only be approved by
            members of ranks greater than or equal to 4, as shown below
            (Polkassembly UI).
          </p>

          <p>
            Promoting members of Rank 5-8 can only be done through an OpenGov
            referendum.
          </p>
          <p className="pt-4">
            Check out{' '}
            <Link
              className="text-primary font-bold"
              target="_blank"
              to="https://polkadot.subsquare.io/referenda/887"
            >
              Referendum 887
            </Link>{' '}
            which requested the Promotion to "VII Dan: Free Master" for Gavin
            Wood.
          </p>

          <img className="py-10 w-[45rem]" src={Rank} />
        </div>

        <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Demotion
        </h1>
        <div>
          <p>
            Demotion occurs after a given period has elapsed and the member is
            unable to defend their position to their peers. Any Polkadot account
            can initiate this process by submitting the signed `bump` call.
          </p>
          <p className="text-black font-bold p-4 border-2 my-4 rounded-lg">
            Monitor your membership status directly from your Google account
            with:{' '}
            <span className="text-primary">
              webcal://fellowship-calendar.kchr.de/?account=YOUR_ACCOUNT_ID.
            </span>
          </p>
        </div>

        <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
          Suspension
        </h1>
        <div>
          Suspension can happen only through a Polkadot OpenGov referendum, This
          ensures that members' bias alone does not directly lead to an
          expulsion from the Polkadot Technical Fellowship.
        </div>
      </div>
    </main>
  )
}
