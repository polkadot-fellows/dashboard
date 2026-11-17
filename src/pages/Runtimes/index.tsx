import { A, ButtonLink, DocPage } from '@/components/page'

export const Runtimes = () => (
  <DocPage
    title="Runtimes"
    lead="The runtimes that make up the core subsystems of the networks for which the Polkadot Technical Fellowship is represented."
    sections={[
      {
        id: 'repository',
        title: 'The repository',
        content: (
          <>
            <p>
              The{' '}
              <A href="https://github.com/polkadot-fellows/runtimes">
                Runtimes repository
              </A>{' '}
              contains the various runtimes which make up the core subsystems of
              networks for which the Polkadot Technical Fellowship is
              represented. Its maintenance is overseen by the Fellowship, as
              decreed by the Polkadot and Kusama Governance.
            </p>
            <p>
              The approval rights for PRs are configured in a review-bot that
              uses the on-chain identity to map from a GitHub account to a
              Fellowship member. This requires that Fellowship members add their
              GitHub handle to their on-chain identity.
            </p>
          </>
        ),
      },
      {
        id: 'release-process',
        title: 'Runtime release process',
        content: (
          <>
            <p>
              The release process builds all runtimes and then puts them into a
              release in this GitHub repository.{' '}
              <strong>
                All PRs submitted for the runtime release require a CHANGELOG
                entry.
              </strong>
            </p>
            <p>
              There are guidelines which include recommended steps for managing
              and communicating breaking changes and disruptions.
            </p>
          </>
        ),
      },
      {
        id: 'collaboration',
        title: 'Ecosystem-wide collaboration',
        content: (
          <>
            <p>
              At times, runtime releases will contain breaking changes and/or
              temporary disruptions that have the potential to adversely affect
              the builders and service providers that operate in the Polkadot
              ecosystem at large.
            </p>
            <p>
              To improve the release process and ensure that scheduled upgrades
              with breaking changes and/or temporary disruptions do not
              dramatically impact existing teams, targeted messages are sent to
              Wallets, UIs and Explorers, DEXes, CEXes and Custodians,
              Parachains, Live networks, and various builders.
            </p>
            <p>
              <ButtonLink
                variant="outline"
                href="https://docs.google.com/spreadsheets/d/1OnUzvKGM6Byy5lStVBbK7DXT93YYrkLmFElHMh8obt0/edit?usp=sharing"
              >
                Working list of ecosystem teams
              </ButtonLink>
            </p>
          </>
        ),
      },
    ]}
  />
)
