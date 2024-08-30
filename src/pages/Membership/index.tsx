import { Button } from '@/components/ui/button'
import { openInNewTab } from '@/lib/utils'
import PolkassemblyInduction from './polkassembly-inductions.png'
import SubsquareInduction from './subsquareInduction.png'
import Evidence1 from './evidence1.png'
import Evidence2 from './evidence2.png'
import Rank from './rank.png'
import { ThemedLink } from '@/components/ThemedComponents'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const Membership = () => {
  return (
    <main>
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Membership
      </h1>
      <div className="">
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="w-full"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <h2 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
                Management
              </h2>
            </AccordionTrigger>
            <AccordionContent>
              <p className="my-4">
                The Polkadot technical Fellowship was initally{' '}
                <ThemedLink
                  to="https://github.com/polkadot-fellows/seeding"
                  target="_blank"
                >
                  seeded
                </ThemedLink>{' '}
                with its members and their corresponding ranks in November 2022
                and then{' '}
                <ThemedLink
                  to="https://polkadot.polkassembly.io/motion/403"
                  target="_blank"
                >
                  added on to Polkadot's Collectives
                </ThemedLink>{' '}
                system chain.
              </p>
              <p>
                Membership is now entirely managed on-chain through the
                procedures outlined below.
              </p>
              <p>
                Members of the Polkadot Fellowship are expected to faithfully
                uphold the following tenets:
                <ol className="list-decimal ml-4">
                  <li>
                    Sincerely uphold the interests of Polkadot and avoid actions
                    which clearly work against it.
                  </li>
                  <li>Respect the philosophy and principles of Polkadot.</li>
                  <li>
                    Respect the operational procedures, norms and voting
                    conventions of the Fellowship.
                  </li>
                  <li>Respect fellow Members and the wider community.</li>
                </ol>
              </p>
              <p className="my-4">
                Members of the Polkadot Fellowship are expected to provide
                periodic evidence to retain their current rank or get promoted
                to a higher rank.
              </p>
              <Button
                className="my-4"
                variant="default"
                onClick={() =>
                  openInNewTab(
                    'https://github.com/polkadot-fellows/Evaluations',
                  )
                }
              >
                Find out more in the Evidences repo
              </Button>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
                Application
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <p>
                Prospective candidates can{' '}
                <ThemedLink
                  to="https://collectives.polkassembly.io/join-fellowship?network=collectives"
                  target="_blank"
                >
                  join the Polkadot Technical Fellowship
                </ThemedLink>{' '}
                by submitting their application on a public forum, as shown
                below (Polkassembly UI).
              </p>

              <img className="py-10 w-[45rem]" src={PolkassemblyInduction} />

              <p className="my-4">
                As a minimum, applicants need to provide the following
                information in their application:
                <ul className="list-disc ml-4">
                  <li>Background information of the applicant</li>
                  <li>
                    Motivation(s) for applying to the Polkadot Technical
                    Fellowship
                  </li>
                  <li>
                    Area(s) of interest in relation to the Polkadot ecosystem.
                  </li>
                  <li>Contribution(s) to Polkadot SDK (if any)</li>
                  <li>Link to the GitHub profile of the applicant</li>
                  <li>Polkadot address with a verified on-chain identity</li>
                </ul>
                Once an application is pre-approved, the applicant becomes
                eligible for induction to the Fellowship as a candidate.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
                Induction
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <p className="my-4">
                  The Polkadot Technical Fellowship Manifesto states that any
                  account may register to become a candidate for a basic
                  deposit, but that feature has not been added to the
                  Collectives runtime yet. To be added as a candidate, a
                  pre-existing member with rank greater than or equal to 1 can
                  initiate this process by submitting the signed `induct` call,
                  as shown below (Core Fellowship UI).
                </p>

                <img className="py-10 w-[45rem]" src={SubsquareInduction} />

                <p>
                  Upon successful execution of the extrinsic, the candidate's
                  account will be displayed with Rank 0 on the{' '}
                  <ThemedLink
                    to="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/fellowship"
                    target="_blank"
                  >
                    Fellowship Overview
                  </ThemedLink>{' '}
                  (Polkadot-JS UI).
                </p>

                <Button
                  className="my-4"
                  variant="default"
                  onClick={() =>
                    openInNewTab(
                      'https://spiced-longship-f1a.notion.site/e16a241b7b924addaf6d761932a44584?v=c33adcf51bc5424ab6afb29d1f101048&pvs=4',
                    )
                  }
                >
                  Discover individual members in the Fellowship profiles
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
                Retention
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <p className="my-4">
                  To retain their current rank, members of the Polkadot
                  Technical Fellowship must submit evidence of the work they
                  have undertaken in recent months. As a minimum, members need
                  to provide the following information in their{' '}
                  <ThemedLink
                    to="https://github.com/polkadot-fellows/Evidences?tab=readme-ov-file#process"
                    target="_blank"
                  >
                    evidence report:
                  </ThemedLink>
                  <ul className="list-disc ml-4">
                    <li>General membership details</li>
                    <li>
                      Motivation(s) for applying to the Polkadot Technical
                      Fellowship
                    </li>
                    <li>
                      Area(s) of interest/expertise in relation to the Polkadot
                      SDK
                    </li>
                    <li>
                      Summary and rationale for contribution(s) to the Polkadot
                      SDK
                    </li>
                    <li>Links to relevant commits/repos on GitHub</li>
                    <li>
                      Links to relevant posts/articles/videos on social media
                      (if applicable)
                    </li>
                  </ul>
                </p>
                <p className="mt-4">
                  Evidences need to be submitted on-chain{' '}
                  <ThemedLink
                    to="https://github.com/polkadot-fellows/Evidences?tab=readme-ov-file#timelines"
                    target="_blank"
                  >
                    before expiry of the demotion period
                  </ThemedLink>
                  , as shown below (Core Fellowship UI)
                </p>
                <img className="pt-10 w-[45rem]" src={Evidence1} />
                <img className="pb-10 w-[45rem]" src={Evidence2} />
                <p>
                  Upon successful execution of the extrinsic, the retention
                  evidence will be displayed on the{' '}
                  <ThemedLink
                    to="https://collectives.subsquare.io/fellowship/core"
                    target="_blank"
                  >
                    Core Fellowship page UI.
                  </ThemedLink>
                  Afterwards, a proposal will be submitted to approve this
                  evidence on-chain.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
                Promotion
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <p>
                  Provided they have submitted sufficient{' '}
                  <ThemedLink
                    to="https://github.com/polkadot-fellows/Evidences"
                    target="_blank"
                  >
                    evidence
                  </ThemedLink>{' '}
                  to sustain their request, any member of the Polkadot Technical
                  Fellowship of Rank 1-4 can be promoted to the next rank by
                  approval voting of members who are 2 ranks higher. For
                  instance, a proposal to promote a member from rank 1 to rank 2
                  can only be approved by members of ranks greater than or equal
                  to 4, as shown below (Polkassembly UI).
                </p>

                <p>
                  Promoting members of Rank 5-8 can only be done through an
                  OpenGov referendum.
                </p>
                <p className="pt-4">
                  Check out{' '}
                  <ThemedLink
                    target="_blank"
                    to="https://polkadot.subsquare.io/referenda/887"
                  >
                    Referendum 887
                  </ThemedLink>{' '}
                  which requested the Promotion to "VII Dan: Free Master" for
                  Gavin Wood.
                </p>

                <img className="py-10 w-[45rem]" src={Rank} />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
                Demotion
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                <p>
                  Demotion occurs after a given period has elapsed and the
                  member is unable to defend their position to their peers. Any
                  Polkadot account can initiate this process by submitting the
                  signed `bump` call.
                </p>
                <p className="font-bold p-4 border-2 my-4 rounded-lg">
                  Monitor your membership status directly from your Google
                  account with:{' '}
                  <span className="text-primary">
                    webcal://fellowship-calendar.kchr.de/?account=YOUR_ACCOUNT_ID.
                  </span>
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger>
              <h1 className="py-2 font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight sm:grow-0">
                Suspension
              </h1>
            </AccordionTrigger>
            <AccordionContent>
              <div>
                Suspension can happen only through a Polkadot OpenGov
                referendum, This ensures that members' bias alone does not
                directly lead to an expulsion from the Polkadot Technical
                Fellowship.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  )
}
