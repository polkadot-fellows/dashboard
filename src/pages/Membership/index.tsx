import { A, ButtonLink, Callout, DocPage, Figure } from '@/components/page'
import Evidence1 from './evidence1.png'
import Evidence2 from './evidence2.png'
import Rank from './rank.png'
import SubsquareApplication from './subsquare-application.png'
import SubsquareInduction from './subsquareInduction.png'

export const Membership = () => (
  <DocPage
    title="Membership"
    lead="How the Fellowship is managed on-chain: from applying and being inducted, to retaining a rank, being promoted or demoted."
    sections={[
      {
        id: 'management',
        title: 'Management',
        content: (
          <>
            <p>
              The Polkadot Technical Fellowship was initially{' '}
              <A href="https://github.com/polkadot-fellows/seeding">seeded</A>{' '}
              with its members and their corresponding ranks in November 2022
              and then{' '}
              <A href="https://polkadot-old.polkassembly.io/motion/403">
                added on to Polkadot's Collectives
              </A>{' '}
              system chain. Membership is now entirely managed on-chain through
              the procedures outlined below.
            </p>
            <p>
              Members of the Polkadot Fellowship are expected to faithfully
              uphold the following tenets:
            </p>
            <ol>
              <li>
                Sincerely uphold the interests of Polkadot and avoid actions
                which clearly work against it.
              </li>
              <li>Respect the philosophy and principles of Polkadot.</li>
              <li>
                Respect the operational procedures, norms and voting conventions
                of the Fellowship.
              </li>
              <li>Respect fellow Members and the wider community.</li>
            </ol>
            <p>
              Members of the Polkadot Fellowship are expected to provide
              periodic arguments to retain their current rank or get promoted to
              a higher rank.
            </p>
            <p>
              <ButtonLink href="https://github.com/polkadot-fellows/Evaluations">
                Find out more in the Evaluations repo
              </ButtonLink>
            </p>
          </>
        ),
      },
      {
        id: 'application',
        title: 'Application',
        content: (
          <>
            <p>
              Prospective candidates can{' '}
              <A href="https://collectives.subsquare.io/fellowship/applications">
                join the Polkadot Technical Fellowship
              </A>{' '}
              by submitting their application on a public forum, as shown below.
            </p>
            <Figure
              src={SubsquareApplication}
              alt="Submitting a Fellowship application (Subsquare UI)"
            />
            <p>
              As a minimum, applicants need to provide the following information
              in their application:
            </p>
            <ul>
              <li>Background information of the applicant</li>
              <li>
                Motivation(s) for applying to the Polkadot Technical Fellowship
              </li>
              <li>Area(s) of interest in relation to the Polkadot ecosystem</li>
              <li>Contribution(s) to Polkadot SDK (if any)</li>
              <li>Link to the GitHub profile of the applicant</li>
              <li>
                <A href="https://wiki.polkadot.com/learn/learn-identity/">
                  Polkadot address with a verified on-chain identity
                </A>
              </li>
            </ul>
            <p>
              Once an application is pre-approved, the applicant becomes
              eligible for induction to the Fellowship as a candidate.
            </p>
          </>
        ),
      },
      {
        id: 'induction',
        title: 'Induction',
        content: (
          <>
            <p>
              The Polkadot Technical Fellowship Manifesto states that any
              account may register to become a candidate for a basic deposit,
              but that feature has not been added to the Collectives runtime
              yet. To be added as a candidate, a pre-existing member with rank
              greater than or equal to 1 can initiate this process by submitting
              the signed <code>induct</code> call, as shown below in the{' '}
              <A href="https://collectives.subsquare.io/fellowship/members">
                Core Fellowship page
              </A>
              .
            </p>
            <Figure
              src={SubsquareInduction}
              alt="Inducting a candidate (Subsquare UI)"
            />
            <p>
              Upon successful execution of the extrinsic, the candidate's
              account will be displayed with Rank 0 on the{' '}
              <A href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot-collectives-rpc.polkadot.io#/fellowship">
                Fellowship Overview
              </A>{' '}
              (Polkadot-JS UI).
            </p>
            <p>
              <ButtonLink
                variant="outline"
                href="https://polkadottechnicalfellowship.notion.site/13d96f88d0a780748a8ec307db640fee?v=13d96f88d0a78134816b000c673faeaf"
              >
                Discover individual members in the Fellowship profiles
              </ButtonLink>
            </p>
          </>
        ),
      },
      {
        id: 'retention',
        title: 'Retention',
        content: (
          <>
            <p>
              To retain their current rank, members of the Polkadot Technical
              Fellowship must submit proofs of the work they have undertaken in
              recent months. As a minimum, members need to provide the following
              information in their{' '}
              <A href="https://github.com/polkadot-fellows/Evaluations?tab=readme-ov-file#process">
                argument report
              </A>
              :
            </p>
            <ul>
              <li>General membership details</li>
              <li>
                Motivation(s) for applying to the Polkadot Technical Fellowship
              </li>
              <li>
                Area(s) of interest/expertise in relation to the Polkadot SDK
              </li>
              <li>
                Summary and rationale for contribution(s) to the Polkadot SDK
              </li>
              <li>Links to relevant commits/repos on GitHub</li>
              <li>
                Links to relevant posts/articles/videos on social media (if
                applicable)
              </li>
            </ul>
            <p>
              Arguments need to be submitted on-chain{' '}
              <A href="https://github.com/polkadot-fellows/Evaluations?tab=readme-ov-file#timelines">
                before expiry of the demotion period
              </A>
              , as shown below.
            </p>
            <Figure
              src={Evidence1}
              alt="Submitting evidence, step 1 (Core Fellowship UI)"
            />
            <Figure
              src={Evidence2}
              alt="Submitting evidence, step 2 (Core Fellowship UI)"
            />
            <p>
              Upon successful execution of the extrinsic, the retention evidence
              will be displayed on the{' '}
              <A href="https://collectives.subsquare.io/fellowship/members">
                Core Fellowship page
              </A>
              . Afterwards, a proposal will be submitted to approve this
              evidence on-chain.
            </p>
          </>
        ),
      },
      {
        id: 'promotion',
        title: 'Promotion',
        content: (
          <>
            <p>
              Provided they have submitted sufficient{' '}
              <A href="https://github.com/polkadot-fellows/Evaluations">
                proofs
              </A>{' '}
              to sustain their request, any member of the Polkadot Technical
              Fellowship of Rank 1-4 can be promoted to the next rank by
              approval voting of members who are 2 ranks higher. For instance, a
              proposal to promote a member from rank 1 to rank 2 can only be
              approved by members of ranks greater than or equal to 4, as shown
              below.
            </p>
            <Figure src={Rank} alt="Voting on a promotion proposal" />
            <p>
              Promoting members of Rank 5-8 can only be done through an OpenGov
              referendum. Check out{' '}
              <A href="https://polkadot.subsquare.io/referenda/887">
                Referendum 887
              </A>
              , which requested the promotion to "VII Dan: Free Master" for
              Gavin Wood.
            </p>
          </>
        ),
      },
      {
        id: 'demotion',
        title: 'Demotion',
        content: (
          <>
            <p>
              Demotion occurs after a given period has elapsed and the member is
              unable to defend their position to their peers. Any Polkadot
              account can initiate this process by submitting the signed{' '}
              <code>bump</code> call.
            </p>
            <Callout>
              Monitor your membership status directly from your calendar by
              subscribing to{' '}
              <code>
                webcal://fellowship-calendar.kchr.de/?account=YOUR_ACCOUNT_ID
              </code>
              . The code for this widget can be found{' '}
              <A href="https://github.com/bkchr/fellowship-ical">here</A>.
            </Callout>
          </>
        ),
      },
      {
        id: 'suspension',
        title: 'Suspension',
        content: (
          <p>
            Suspension can happen only through a Polkadot OpenGov referendum.
            This ensures that members' bias alone does not directly lead to an
            expulsion from the Polkadot Technical Fellowship.
          </p>
        ),
      },
    ]}
  />
)
